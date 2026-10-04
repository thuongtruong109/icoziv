import type { GitHubStack } from '../../types/github';
import {
  detectManifest,
  detectTopic,
  isManifest,
  normalizeTechnology,
} from './detection';

const API_BASE = 'https://api.github.com';
const MAX_PAGES = 3;
const MAX_DETAILS = 12;
const REQUEST_BUDGET = 48;
const MAX_MANIFEST_SIZE = 200_000;
const APP_DIRECTORIES = [
  'frontend',
  'web',
  'client',
  'app',
  'server',
  'backend',
  'docs',
];

interface Repository {
  name: string;
  owner: { login: string };
  fork: boolean;
  private: boolean;
  size: number;
  language: string | null;
  topics: string[];
}

interface ContentEntry {
  name: string;
  type: string;
  size: number;
}

class ScanLimitError extends Error {}

export function validateGitHubUsername(value: string): string {
  const username = value.trim();
  if (
    !/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(username) ||
    username.includes('--')
  ) {
    throw new Error('Enter a valid GitHub username, such as octocat.');
  }
  return username;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readRepositories(value: unknown, username: string): Repository[] {
  if (!Array.isArray(value))
    throw new Error('GitHub returned an unexpected repository list.');
  return value.filter((repo): repo is Repository => {
    return (
      isRecord(repo) &&
      typeof repo.name === 'string' &&
      /^[\w.-]+$/.test(repo.name) &&
      !['.', '..'].includes(repo.name) &&
      isRecord(repo.owner) &&
      typeof repo.owner.login === 'string' &&
      repo.owner.login.toLowerCase() === username.toLowerCase() &&
      repo.fork === false &&
      repo.private === false
    );
  });
}

function readEntries(value: unknown): ContentEntry[] {
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is ContentEntry => {
    return (
      isRecord(entry) &&
      typeof entry.name === 'string' &&
      !entry.name.includes('/') &&
      !['.', '..'].includes(entry.name) &&
      (entry.type === 'file' || entry.type === 'dir') &&
      typeof entry.size === 'number'
    );
  });
}

export async function fetchGitHubStack(
  value: string,
  signal: AbortSignal,
  fetcher: typeof fetch = fetch,
): Promise<GitHubStack> {
  const username = validateGitHubUsername(value);
  const notices = new Set<string>();
  const repositories = new Map<string, Repository>();
  const technologies = new Map<string, { name: string; repos: Set<string> }>();
  let requestCount = 0;
  let remaining = REQUEST_BUDGET;
  let detailedCount = 0;

  function addTechnology(name: string, repo: string) {
    const key = normalizeTechnology(name);
    const existing = technologies.get(key);
    if (existing) existing.repos.add(repo);
    else technologies.set(key, { name, repos: new Set([repo]) });
  }

  async function request(path: string, optional = false, raw = false) {
    signal.throwIfAborted();
    if (requestCount >= REQUEST_BUDGET || remaining <= 0) {
      throw new ScanLimitError(
        'GitHub scan limit reached. Try again later for more results.',
      );
    }
    requestCount += 1;
    const response = await fetcher(`${API_BASE}${path}`, {
      signal: AbortSignal.any([signal, AbortSignal.timeout(12000)]),
      credentials: 'omit',
      headers: {
        Accept: raw
          ? 'application/vnd.github.raw+json'
          : 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2026-03-10',
      },
    });
    const quota = response.headers.get('x-ratelimit-remaining');
    if (quota !== null && /^\d+$/.test(quota)) remaining = Number(quota);
    if (response.status === 403 || response.status === 429) {
      const reset = response.headers.get('x-ratelimit-reset');
      const resetTime =
        reset && /^\d+$/.test(reset)
          ? new Date(Number(reset) * 1000).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })
          : '';
      throw new ScanLimitError(
        `GitHub limited this request. ${resetTime ? `Try again after ${resetTime}.` : 'Please try again later.'}`,
      );
    }
    if (response.status === 404) {
      if (optional) return null;
      throw new Error(`GitHub user "${username}" was not found.`);
    }
    if (!response.ok)
      throw new Error(
        `GitHub request failed (${response.status}). Please try again.`,
      );
    return response;
  }

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    try {
      const response = await request(
        `/users/${encodeURIComponent(username)}/repos?type=owner&sort=pushed&direction=desc&per_page=100&page=${page}`,
      );
      const payload: unknown = await response!.json();
      for (const repo of readRepositories(payload, username)) {
        repositories.set(repo.name, repo);
        if (typeof repo.language === 'string')
          addTechnology(repo.language, repo.name);
        for (const topic of Array.isArray(repo.topics) ? repo.topics : []) {
          if (typeof topic !== 'string') continue;
          const technology = detectTopic(topic);
          if (technology) addTechnology(technology, repo.name);
        }
      }
      const hasMore = /rel="next"/.test(response!.headers.get('link') ?? '');
      if (!hasMore) break;
      if (page === MAX_PAGES)
        notices.add(
          'Only the 300 most recently pushed public repositories were included.',
        );
    } catch (error) {
      signal.throwIfAborted();
      if (!repositories.size) throw error;
      notices.add(
        'Some repositories could not be loaded. Results cover the repositories available so far.',
      );
      break;
    }
  }

  async function scanDirectory(
    repoPath: string,
    repository: string,
    directory = '',
  ) {
    const path = directory ? `/${encodeURIComponent(directory)}` : '';
    const response = await request(`${repoPath}/contents${path}`, true);
    if (!response) return [];
    const entries = readEntries(await response.json());
    const manifests = entries
      .filter(entry => entry.type === 'file' && isManifest(entry.name))
      .slice(0, 2);
    for (const manifest of manifests) {
      if (manifest.size > MAX_MANIFEST_SIZE) {
        notices.add('Some dependency files were too large to inspect.');
        continue;
      }
      try {
        const file = await request(
          `${repoPath}/contents${path}/${encodeURIComponent(manifest.name)}`,
          true,
          true,
        );
        if (!file) continue;
        const text = await file.text();
        if (text.length > MAX_MANIFEST_SIZE) continue;
        for (const technology of detectManifest(manifest.name, text)) {
          addTechnology(technology, repository);
        }
      } catch (error) {
        signal.throwIfAborted();
        if (error instanceof ScanLimitError) throw error;
        notices.add('Some dependency files could not be inspected.');
      }
    }
    return entries;
  }

  for (const repo of [...repositories.values()]
    .filter(repo => repo.size > 0)
    .slice(0, MAX_DETAILS)) {
    const repoPath = `/repos/${encodeURIComponent(repo.owner.login)}/${encodeURIComponent(repo.name)}`;
    try {
      const languages = await request(`${repoPath}/languages`, true);
      if (languages) {
        const payload: unknown = await languages.json();
        if (isRecord(payload)) {
          for (const [language, bytes] of Object.entries(payload)) {
            if (typeof bytes === 'number' && bytes > 0)
              addTechnology(language, repo.name);
          }
        }
      }
      const entries = await scanDirectory(repoPath, repo.name);
      const appDirectory = APP_DIRECTORIES.find(name =>
        entries.some(entry => entry.type === 'dir' && entry.name === name),
      );
      if (appDirectory) await scanDirectory(repoPath, repo.name, appDirectory);
      detailedCount += 1;
    } catch (error) {
      signal.throwIfAborted();
      if (error instanceof ScanLimitError) {
        notices.add(error.message);
        break;
      }
      notices.add('Some repositories could not be fully inspected.');
    }
  }

  return {
    username,
    repositoryCount: repositories.size,
    detailedCount,
    notices: [...notices],
    technologies: [...technologies.values()]
      .map(({ name, repos }) => ({ name, repositories: repos.size }))
      .sort(
        (a, b) =>
          b.repositories - a.repositories || a.name.localeCompare(b.name),
      ),
  };
}
