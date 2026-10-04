'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import {
  fetchGitHubStack,
  validateGitHubUsername,
} from '@/lib/github-stack/client';
import type { GitHubStack } from '@/types/github';

const CACHE_TTL = 5 * 60 * 1000;
const cache = new Map<string, { timestamp: number; stack: GitHubStack }>();

export function useGitHubStack() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<GitHubStack | null>(null);
  const request = useRef<AbortController | null>(null);

  useEffect(() => () => request.current?.abort(), []);

  const cancel = useCallback(() => {
    request.current?.abort();
    request.current = null;
    setIsLoading(false);
  }, []);

  function changeUsername(value: string) {
    cancel();
    setUsername(value);
    setError('');
    setResult(null);
  }

  async function load(): Promise<GitHubStack | undefined> {
    cancel();
    setError('');
    setResult(null);
    let normalized: string;
    try {
      normalized = validateGitHubUsername(username);
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : 'Enter a GitHub username.',
      );
      return;
    }

    const cached = cache.get(normalized.toLowerCase());
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      setResult(cached.stack);
      return cached.stack;
    }

    const controller = new AbortController();
    request.current = controller;
    setIsLoading(true);
    try {
      const stack = await fetchGitHubStack(
        normalized,
        AbortSignal.any([controller.signal, AbortSignal.timeout(60000)]),
      );
      if (controller.signal.aborted || request.current !== controller) return;
      setResult(stack);
      if (!stack.notices.length) {
        if (cache.size >= 10) cache.delete(cache.keys().next().value!);
        cache.set(normalized.toLowerCase(), { timestamp: Date.now(), stack });
      }
      return stack;
    } catch (reason) {
      if (controller.signal.aborted || request.current !== controller) return;
      setError(
        reason instanceof Error && reason.name === 'TimeoutError'
          ? 'The GitHub scan timed out. Please try again.'
          : reason instanceof TypeError
            ? 'Could not connect to GitHub. Check your connection and try again.'
            : reason instanceof Error
              ? reason.message
              : 'Unable to fetch this GitHub stack.',
      );
    } finally {
      if (request.current === controller) {
        request.current = null;
        setIsLoading(false);
      }
    }
  }

  return { username, changeUsername, isLoading, error, result, load, cancel };
}
