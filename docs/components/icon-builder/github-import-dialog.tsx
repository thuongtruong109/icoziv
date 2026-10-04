'use client';

import { Check, GitBranch, LoaderCircle } from 'lucide-react';
import { useCallback, useId, useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { useGitHubStack } from '@/hooks/use-github-stack';
import { matchGitHubStack } from '@/lib/github-stack/catalog';
import type { IconGroup } from '@/types/icon';

import styles from './github-import.module.css';

interface GitHubImportDialogProps {
  open: boolean;
  onClose: () => void;
  icons: IconGroup[];
  disabled: boolean;
  selectedKeys: string[];
  onImport: (keys: string[]) => void;
  onToggle: (icon: IconGroup) => void;
}

export function GitHubImportDialog({
  open,
  onClose,
  icons,
  disabled,
  selectedKeys,
  onImport,
  onToggle,
}: GitHubImportDialogProps) {
  const { username, changeUsername, isLoading, error, result, load, cancel } =
    useGitHubStack();
  const inputId = useId();
  const hintId = useId();
  const statusId = useId();
  const detected = useMemo(
    () => (result ? matchGitHubStack(result, icons) : null),
    [icons, result],
  );
  const close = useCallback(() => {
    cancel();
    onClose();
  }, [cancel, onClose]);

  return (
    <Dialog
      description="Select the languages and declared frameworks in your public repositories."
      onClose={close}
      open={open}
      title="Build from GitHub"
    >
      <form
        className={styles.form}
        onSubmit={async event => {
          event.preventDefault();
          if (disabled || isLoading) return;
          const stack = await load();
          if (!stack) return;
          const { matches } = matchGitHubStack(stack, icons);
          if (matches.length) onImport(matches.map(match => match.icon.key));
        }}
      >
        <label className={styles.input} htmlFor={inputId}>
          <span aria-hidden="true">@</span>
          <span className="sr-only">GitHub username</span>
          <input
            aria-describedby={`${hintId} ${statusId}`}
            aria-invalid={Boolean(error)}
            autoCapitalize="none"
            autoComplete="off"
            disabled={disabled}
            id={inputId}
            maxLength={39}
            onChange={event => changeUsername(event.target.value)}
            placeholder="GitHub username"
            spellCheck={false}
            type="text"
            value={username}
          />
        </label>
        <Button
          disabled={disabled || isLoading || !username.trim()}
          type="submit"
          variant="primary"
        >
          {isLoading ? (
            <LoaderCircle aria-hidden="true" className="spin" size={16} />
          ) : (
            <GitBranch aria-hidden="true" size={16} />
          )}
          {isLoading ? 'Scanning repositories…' : 'Fetch & select'}
        </Button>
        {isLoading ? (
          <Button onClick={cancel} variant="ghost">
            Cancel
          </Button>
        ) : null}
      </form>
      <p className={styles.hint} id={hintId}>
        Public, owned repositories only. A successful import replaces your
        selected icons.
      </p>
      <div
        aria-live="polite"
        className={styles.status}
        id={statusId}
        role="status"
      >
        {error ? <p className={styles.error}>{error}</p> : null}
        {isLoading ? (
          <p>Looking for your stack. You can cancel at any time.</p>
        ) : null}
        {result && detected ? (
          <>
            <p>
              {detected.matches.length
                ? `Found ${detected.matches.length} matching icons for @${result.username}.`
                : `No matching icons found for @${result.username}. Your selection was kept.`}{' '}
              {result.repositoryCount} public repositories checked;{' '}
              {result.detailedCount} inspected for additional languages and
              dependencies.
            </p>
            {detected.matches.length ? (
              <div
                aria-label="Detected GitHub stack"
                className={styles.matches}
              >
                {detected.matches.map(({ icon, name, repositories }) => (
                  <button
                    aria-pressed={selectedKeys.includes(icon.key)}
                    key={icon.key}
                    onClick={() => onToggle(icon)}
                    title={`Detected in ${repositories} ${repositories === 1 ? 'repository' : 'repositories'}`}
                    type="button"
                  >
                    {selectedKeys.includes(icon.key) ? (
                      <Check aria-hidden="true" size={13} />
                    ) : (
                      <span className={styles.unchecked} />
                    )}
                    {name}
                  </button>
                ))}
              </div>
            ) : null}
            {result.notices.map(notice => (
              <p className={styles.notice} key={notice}>
                {notice}
              </p>
            ))}
            {detected.unmatched.length ? (
              <p className={styles.hint}>
                No catalog match: {detected.unmatched.join(', ')}.
              </p>
            ) : null}
          </>
        ) : null}
      </div>
    </Dialog>
  );
}
