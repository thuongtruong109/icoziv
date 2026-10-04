import type { GitHubStack, GitHubTechnology } from '../../types/github';
import type { IconGroup } from '../../types/icon';
import { normalizeTechnology } from './detection';

const ICON_ALIASES: Record<string, string[]> = {
  react: ['reactjs', 'react'],
  vue: ['vuejs', 'vue'],
  nuxt: ['nuxtjs', 'nuxt'],
  express: ['expressjs', 'express'],
  nextjs: ['nextjs', 'next'],
  go: ['golang', 'go'],
  cplusplus: ['cpp', 'cplusplus'],
  csharp: ['csharp'],
  fsharp: ['fsharp'],
  shell: ['bash', 'shell'],
  jupyternotebook: ['jupyter', 'jupyternotebook'],
  objectivec: ['objectivec'],
  tailwindcss: ['tailwindcss', 'tailwind'],
  net: ['dotnet'],
  reactnative: ['reactnative'],
  springboot: ['springboot'],
};

export interface MatchedGitHubStack {
  matches: Array<GitHubTechnology & { icon: IconGroup }>;
  unmatched: string[];
}

export function matchGitHubStack(
  stack: GitHubStack,
  icons: IconGroup[],
): MatchedGitHubStack {
  const catalog = new Map(
    icons.map(icon => [normalizeTechnology(icon.key), icon]),
  );
  const matches: MatchedGitHubStack['matches'] = [];
  const unmatched: string[] = [];
  const seen = new Set<string>();

  for (const technology of stack.technologies) {
    const normalized = normalizeTechnology(technology.name);
    const candidates = ICON_ALIASES[normalized] ?? [normalized];
    const icon = candidates.map(key => catalog.get(key)).find(Boolean);
    if (!icon) {
      unmatched.push(technology.name);
    } else if (!seen.has(icon.key)) {
      seen.add(icon.key);
      matches.push({ ...technology, icon });
    }
  }
  return { matches, unmatched };
}
