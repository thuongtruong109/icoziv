'use client';

import { ArrowUpRight, GitFork, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

import { REPOSITORY_URL } from '@/lib/constants';

interface Contributor {
  avatar_url: string;
  contributions: number;
  html_url: string;
  id: number;
  login: string;
}

export function ContributorsGrid() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(
      'https://api.github.com/repos/thuongtruong109/icoziv/contributors?per_page=48',
      {
        signal: controller.signal,
      },
    )
      .then(response => {
        if (!response.ok) throw new Error('Contributor request failed');
        return response.json() as Promise<Contributor[]>;
      })
      .then(setContributors)
      .catch(reason => {
        if ((reason as Error).name !== 'AbortError') setError(true);
      });
    return () => controller.abort();
  }, []);

  if (error) {
    return (
      <div className="state-panel contributors-error">
        <GitFork size={28} />
        <h2>GitHub is taking a quick breather</h2>
        <p>You can still see every contributor directly in the repository.</p>
        <a
          className="button button--primary button--md"
          href={`${REPOSITORY_URL}/graphs/contributors`}
          rel="noreferrer"
          target="_blank"
        >
          Open contributor graph <ArrowUpRight size={16} />
        </a>
      </div>
    );
  }

  if (!contributors.length) {
    return (
      <div className="contributors-skeleton" aria-label="Loading contributors">
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index}>
            <i />
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="contributors-grid">
      {contributors.map(contributor => (
        <a
          href={contributor.html_url}
          key={contributor.id}
          rel="noreferrer"
          target="_blank"
        >
          <img
            alt={`${contributor.login}'s avatar`}
            height="56"
            loading="lazy"
            src={contributor.avatar_url}
            width="56"
          />
          <span>
            <strong>{contributor.login}</strong>
            <small>
              <Users size={12} /> {contributor.contributions} contributions
            </small>
          </span>
          <ArrowUpRight aria-hidden="true" size={15} />
        </a>
      ))}
    </div>
  );
}
