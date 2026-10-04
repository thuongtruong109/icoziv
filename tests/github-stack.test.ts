import { describe, expect, it, vi } from 'vitest';

import { matchGitHubStack } from '../docs/lib/github-stack/catalog';
import {
  fetchGitHubStack,
  validateGitHubUsername,
} from '../docs/lib/github-stack/client';
import {
  detectManifest,
  detectTopic,
} from '../docs/lib/github-stack/detection';
import type { GitHubStack } from '../docs/types/github';
import type { IconGroup } from '../docs/types/icon';

const signal = () => new AbortController().signal;
const repo = (name: string, extra = {}) => ({
  name,
  owner: { login: 'octocat' },
  fork: false,
  private: false,
  size: 100,
  language: 'TypeScript',
  topics: [],
  ...extra,
});
const json = (value: unknown, headers?: HeadersInit) =>
  new Response(JSON.stringify(value), { headers });
const entry = (name: string, type = 'file', size = 100) => ({
  name,
  type,
  size,
});

describe('GitHub stack detection', () => {
  it.each(['octocat', 'a', 'some-user', 'a'.repeat(39)])(
    'accepts GitHub username %s',
    username => {
      expect(validateGitHubUsername(` ${username} `)).toBe(username);
    },
  );

  it.each([
    '',
    '-user',
    'user-',
    'a--b',
    'user_name',
    'a'.repeat(40),
    'https://github.com/octocat',
    '../user',
  ])('rejects unsuitable username %s', username => {
    expect(() => validateGitHubUsername(username)).toThrow(
      'valid GitHub username',
    );
  });

  it('detects declared packages without guessing from names or descriptions', () => {
    expect(
      detectManifest(
        'package.json',
        JSON.stringify({
          name: 'react',
          description: 'Uses next and vue',
          dependencies: {
            'not-react': '1',
            '@nestjs/core': '1',
            react: '19',
            next: '16',
          },
          devDependencies: { tailwindcss: '4' },
        }),
      ),
    ).toEqual(['NestJS', 'React', 'Next.js', 'Tailwind CSS']);
    expect(detectManifest('package.json', '{"name":"react"}')).toEqual([]);
    expect(detectTopic('next.js')).toBe('Next.js');
    expect(detectTopic('react-tutorial')).toBeUndefined();
  });

  it.each([
    ['composer.json', '{"require":{"laravel/framework":"^12"}}', ['Laravel']],
    [
      'requirements.txt',
      '# django\nfastapi[standard]>=1\nFlask==3\nnot-django==1',
      ['FastAPI', 'Flask'],
    ],
    [
      'pyproject.toml',
      '[project]\nname="django"\ndependencies=["django>=5", "fastapi"]',
      ['Django', 'FastAPI'],
    ],
    [
      'pyproject.toml',
      '[tool.poetry.dependencies]\npython="^3.12"\ndjango="^5"\n[tool.other]\nflask="ignored"',
      ['Django'],
    ],
    ['Gemfile', '# gem "django"\ngem "rails", "~> 8"', ['Rails']],
    [
      'pubspec.yaml',
      'name: flutter\ndependencies:\n  flutter:\n    sdk: flutter\n  other: 1\ndescription: ignored',
      ['Flutter'],
    ],
    [
      'pom.xml',
      '<artifactId>spring-boot-starter-web</artifactId>',
      ['Spring Boot'],
    ],
    [
      'pom.xml',
      '<!-- <artifactId>spring-boot-starter-web</artifactId> -->',
      [],
    ],
    [
      'build.gradle',
      'implementation "org.springframework.boot:spring-boot-starter-web:3"',
      ['Spring Boot'],
    ],
    ['project.csproj', '<Project Sdk="Microsoft.NET.Sdk.Web"/>', ['.NET']],
  ])('detects frameworks in %s', (name, text, expected) => {
    expect(detectManifest(name, text)).toEqual(expected);
  });

  it('matches aliases, preserves C/C++/C# distinctions and skips unavailable icons', () => {
    const names = [
      'reactjs',
      'nextjs',
      'expressjs',
      'golang',
      'cpp',
      'csharp',
      'c',
      'dotnet',
    ];
    const icons = names.map(key => ({
      key,
      displayName: key,
      category: 'languages',
      variants: {},
    })) as IconGroup[];
    const stack = {
      username: 'octocat',
      repositoryCount: 2,
      detailedCount: 2,
      notices: [],
      technologies: [
        'React',
        'ReactJS',
        'Next.js',
        'Express',
        'Go',
        'C++',
        'C#',
        'C',
        '.NET',
        'Unknown',
      ].map(name => ({ name, repositories: 1 })),
    } satisfies GitHubStack;
    const result = matchGitHubStack(stack, icons);

    expect(result.matches.map(match => match.icon.key)).toEqual(names);
    expect(result.unmatched).toEqual(['Unknown']);
  });
});

describe('GitHub public repository scan', () => {
  it('paginates owned repositories, excludes forks, and combines language and dependency evidence once per repo', async () => {
    const fetcher = vi.fn<typeof fetch>(async input => {
      const url = new URL(String(input));
      if (url.pathname === '/users/octocat/repos') {
        return url.searchParams.get('page') === '1'
          ? json(
              [
                repo('app', { topics: ['react', 'react-tutorial'] }),
                repo('fork', { fork: true, language: 'Ruby' }),
                repo('private', { private: true }),
              ],
              {
                link: '<https://api.github.com/users/octocat/repos?page=2>; rel="next"',
              },
            )
          : json([
              repo('other', { size: 0, language: 'Go' }),
              repo('foreign', { owner: { login: 'someone-else' } }),
            ]);
      }
      if (url.pathname.endsWith('/languages'))
        return json({ TypeScript: 100, CSS: 20, Ruby: 0 });
      if (url.pathname.endsWith('/contents'))
        return json([entry('package.json'), entry('docs', 'dir')]);
      if (url.pathname.endsWith('/contents/docs'))
        return json([entry('package.json')]);
      if (url.pathname.endsWith('/contents/docs/package.json'))
        return new Response('{"dependencies":{"next":"16","react":"19"}}');
      if (url.pathname.endsWith('/contents/package.json'))
        return new Response('{"dependencies":{"react":"19"}}');
      throw new Error(`Unexpected URL: ${url}`);
    });
    const result = await fetchGitHubStack('octocat', signal(), fetcher);

    expect(result.repositoryCount).toBe(2);
    expect(result.detailedCount).toBe(1);
    expect(result.notices).toEqual([]);
    expect(result.technologies).toEqual(
      expect.arrayContaining([
        { name: 'React', repositories: 1 },
        { name: 'Next.js', repositories: 1 },
        { name: 'CSS', repositories: 1 },
        { name: 'Go', repositories: 1 },
      ]),
    );
    expect(
      result.technologies.some(technology => technology.name === 'Ruby'),
    ).toBe(false);
    expect(
      fetcher.mock.calls.every(([input]) =>
        String(input).startsWith('https://api.github.com/'),
      ),
    ).toBe(true);
  });

  it('returns an empty result for an account without owned public repos', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(json([]));
    const result = await fetchGitHubStack('octocat', signal(), fetcher);
    expect(result.repositoryCount).toBe(0);
    expect(result.technologies).toEqual([]);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('reports missing accounts and rate limits', async () => {
    await expect(
      fetchGitHubStack(
        'octocat',
        signal(),
        vi
          .fn<typeof fetch>()
          .mockResolvedValue(new Response(null, { status: 404 })),
      ),
    ).rejects.toThrow('was not found');
    await expect(
      fetchGitHubStack(
        'octocat',
        signal(),
        vi.fn<typeof fetch>().mockResolvedValue(
          new Response(null, {
            status: 403,
            headers: { 'x-ratelimit-remaining': '0' },
          }),
        ),
      ),
    ).rejects.toThrow('GitHub limited');
  });

  it('keeps already detected languages when a detailed scan is rate limited', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(json([repo('app')]))
      .mockResolvedValueOnce(new Response(null, { status: 429 }));
    const result = await fetchGitHubStack('octocat', signal(), fetcher);
    expect(result.technologies).toEqual([
      { name: 'TypeScript', repositories: 1 },
    ]);
    expect(result.notices.join(' ')).toContain('GitHub limited');
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it('stops immediately when GitHub reports an exhausted quota', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(
        json([repo('app')], { 'x-ratelimit-remaining': '0' }),
      );
    const result = await fetchGitHubStack('octocat', signal(), fetcher);
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(result.technologies).toEqual([
      { name: 'TypeScript', repositories: 1 },
    ]);
    expect(result.notices.join(' ')).toContain('scan limit');
  });

  it('keeps dependency JSON strict instead of accepting commented files', () => {
    expect(() =>
      detectManifest(
        'package.json',
        '{/* comment */"dependencies":{"react":"19"}}',
      ),
    ).toThrow();
  });

  it('does not let a malformed manifest discard other reliable detections', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(json([repo('app')]))
      .mockResolvedValueOnce(json({ TypeScript: 100 }))
      .mockResolvedValueOnce(json([entry('package.json')]))
      .mockResolvedValueOnce(new Response('not-json'));
    const result = await fetchGitHubStack('octocat', signal(), fetcher);
    expect(result.technologies).toEqual([
      { name: 'TypeScript', repositories: 1 },
    ]);
    expect(result.notices.join(' ')).toContain('dependency files');
  });

  it('caps deep scans and request volume even for large accounts', async () => {
    const fetcher = vi.fn<typeof fetch>(async input => {
      const url = new URL(String(input));
      if (url.pathname.endsWith('/repos')) {
        return json(
          Array.from({ length: 100 }, (_, index) =>
            repo(`app-${url.searchParams.get('page')}-${index}`),
          ),
          {
            link: '<https://api.github.com/users/octocat/repos?page=4>; rel="next"',
          },
        );
      }
      if (url.pathname.endsWith('/languages')) return json({ TypeScript: 100 });
      if (
        url.pathname.endsWith('/contents') ||
        url.pathname.endsWith('/contents/web')
      )
        return json([
          entry('package.json'),
          entry('composer.json'),
          entry('web', 'dir'),
        ]);
      if (url.pathname.endsWith('/composer.json'))
        return new Response('{"require":{"laravel/framework":"12"}}');
      return new Response('{"dependencies":{"react":"19"}}');
    });
    const result = await fetchGitHubStack('octocat', signal(), fetcher);
    expect(fetcher.mock.calls.length).toBeLessThanOrEqual(48);
    expect(result.repositoryCount).toBe(300);
    expect(result.detailedCount).toBeLessThanOrEqual(12);
    expect(result.notices.join(' ')).toContain('300 most recently');
    expect(result.notices.join(' ')).toContain('scan limit');
  });

  it('does not make requests for invalid or cancelled scans', async () => {
    const fetcher = vi.fn<typeof fetch>();
    await expect(
      fetchGitHubStack('../bad', signal(), fetcher),
    ).rejects.toThrow();
    const controller = new AbortController();
    controller.abort();
    await expect(
      fetchGitHubStack('octocat', controller.signal, fetcher),
    ).rejects.toMatchObject({ name: 'AbortError' });
    expect(fetcher).not.toHaveBeenCalled();
  });
});
