import Link from 'next/link';
import { ArrowLeft, SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="not-found">
      <span>
        <SearchX size={34} />
      </span>
      <p className="eyebrow">404 · Not found</p>
      <h1>This icon wandered off the grid.</h1>
      <p>The page you were looking for does not exist or may have moved.</p>
      <Link className="button button--primary button--md" href="/">
        <ArrowLeft size={16} /> Back to builder
      </Link>
    </main>
  );
}
