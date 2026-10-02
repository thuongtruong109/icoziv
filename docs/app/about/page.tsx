import {
  ArrowUpRight,
  Boxes,
  Gauge,
  GitFork,
  Heart,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import type { Metadata } from 'next';

import { PageHeader } from '@/components/page-header';
import { REPOSITORY_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn why Icoziv exists and how it turns a tech stack into one polished badge.',
};

const principles = [
  {
    icon: Gauge,
    title: 'Edge-fast by default',
    text: 'One compact request renders your full stack as a crisp SVG, ready for READMEs and websites.',
  },
  {
    icon: ShieldCheck,
    title: 'Private and simple',
    text: 'The builder works without an account. Your chosen stack stays in your browser.',
  },
  {
    icon: Boxes,
    title: 'A growing library',
    text: 'Frameworks, languages, databases, design tools and more—organized into a searchable catalog.',
  },
];

export default function AboutPage() {
  return (
    <div className="content-page">
      <div className="ambient ambient--one" />
      <div className="page-container page-container--narrow">
        <PageHeader />
        <main>
          <section className="content-hero">
            <div className="announcement">
              <Sparkles size={14} /> The story behind Icoziv
            </div>
            <h1>
              A small tool with an eye for the <span>tiny details.</span>
            </h1>
            <p>
              Icoziv makes it effortless to present the technologies you
              love—without manually aligning icons, maintaining image links or
              compromising on visual quality.
            </p>
            <div className="hero-actions">
              <a className="button button--primary button--md" href="../">
                Start building <ArrowUpRight size={16} />
              </a>
              <a
                className="button button--secondary button--md"
                href={REPOSITORY_URL}
                rel="noreferrer"
                target="_blank"
              >
                <GitFork size={16} /> View source
              </a>
            </div>
          </section>

          <section className="principles-grid">
            {principles.map(principle => {
              const Icon = principle.icon;
              return (
                <article key={principle.title}>
                  <span>
                    <Icon size={20} />
                  </span>
                  <h2>{principle.title}</h2>
                  <p>{principle.text}</p>
                </article>
              );
            })}
          </section>

          <section className="story-panel">
            <div>
              <p className="eyebrow">Open by design</p>
              <h2>Made with the community, for the community.</h2>
            </div>
            <div>
              <p>
                Every icon, improvement and bug report helps Icoziv become more
                useful. The project is open source so anyone can inspect the
                code, request a missing tool or contribute a fix.
              </p>
              <a
                href={`${REPOSITORY_URL}/issues`}
                rel="noreferrer"
                target="_blank"
              >
                Suggest an improvement <ArrowUpRight size={15} />
              </a>
            </div>
          </section>
        </main>
        <footer className="simple-footer">
          <Heart size={14} /> Built openly with care.
        </footer>
      </div>
    </div>
  );
}
