import { CheckCircle2 } from 'lucide-react';

export function Toast({ message }: { message: string }) {
  if (!message) return null;

  return (
    <div aria-live="polite" className="toast" role="status">
      <CheckCircle2 aria-hidden="true" size={17} />
      {message}
    </div>
  );
}
