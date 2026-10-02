import { GitFork, Heart, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

import { ContributorsGrid } from '@/components/contributors-grid';
import { PageHeader } from '@/components/page-header';
import { REPOSITORY_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contributors',
  description: 'Meet the people who help Icoziv grow.',
};

export default function ContributorsPage() {
  return (
    <div className="content-page">
      <div className="ambient ambient--two" />
      <div className="page-container page-container--narrow">
        <PageHeader />
        <main>
          <section className="content-hero content-hero--compact">
            <div className="announcement">
              <Sparkles size={14} /> Powered by people
            </div>
            <h1>
              The humans behind <span>every improvement.</span>
            </h1>
            <p>
              Thank you to everyone who has added icons, refined the code,
              reported issues and shared Icoziv.
            </p>
          </section>
          <ContributorsGrid />
          <section className="contribute-cta">
            <span>
              <Heart size={22} />
            </span>
            <div>
              <p className="eyebrow">Join the project</p>
              <h2>Your contribution belongs here too.</h2>
              <p>
                Fix a bug, add a missing icon or improve the documentation—every
                contribution matters.
              </p>
            </div>
            <a
              className="button button--primary button--md"
              href={REPOSITORY_URL}
              rel="noreferrer"
              target="_blank"
            >
              <GitFork size={16} /> Contribute on GitHub
            </a>
          </section>
        </main>
        <footer className="simple-footer">
          <Heart size={14} /> Built openly with care.
        </footer>
      </div>
    </div>
  );
}
