'use client';

import { AlertTriangle, ArrowUp, LoaderCircle, SearchX } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { CopyDialog } from '@/components/icon-builder/copy-dialog';
import { IconCard } from '@/components/icon-builder/icon-card';
import { LibraryToolbar } from '@/components/icon-builder/library-toolbar';
import { MobileStackBar } from '@/components/icon-builder/mobile-stack-bar';
import { Pagination } from '@/components/icon-builder/pagination';
import { SelectedStack } from '@/components/icon-builder/selected-stack';
import { BadgeSettingsDialog } from '@/components/icon-builder/settings-dialog';
import { Toast } from '@/components/icon-builder/toast';
import { SiteHeader } from '@/components/site-header';
import { SiteSettingsDialog } from '@/components/site-settings-dialog';
import { Button } from '@/components/ui/button';
import { useIconCatalog } from '@/hooks/use-icon-catalog';
import { useTheme } from '@/hooks/use-theme';
import {
  buildBadgeSnippets,
  buildBadgeUrl,
  DEFAULT_BADGE_SETTINGS,
  normalizeBadgeSettings,
  resolveIconFilename,
  selectedIconNames,
} from '@/lib/badge';
import {
  DEMO_ICONS,
  ICON_ASSET_BASE_URL,
  REPOSITORY_URL,
} from '@/lib/constants';
import type {
  BadgeSettings,
  DisplayNameMode,
  IconCategory,
  IconGroup,
  ViewMode,
} from '@/types/icon';

const PAGE_SIZE = 72;
const INFINITE_CHUNK = 96;
const STORAGE_KEY = 'icoziv-next-builder-state';

interface StoredBuilderState {
  badgeSettings?: BadgeSettings;
  displayMode?: DisplayNameMode;
  selectedKeys?: string[];
  viewMode?: ViewMode;
}

export function IconBuilder() {
  const { icons, isLoading, error } = useIconCatalog();
  const { preference, resolvedTheme, setPreference } = useTheme();
  const [selectedKeys, setSelectedKeys] = useState<string[]>(DEMO_ICONS);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<IconCategory | 'all'>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('pagination');
  const [displayMode, setDisplayMode] = useState<DisplayNameMode>('tooltip');
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(INFINITE_CHUNK);
  const [badgeSettings, setBadgeSettings] = useState<BadgeSettings>(
    DEFAULT_BADGE_SETTINGS,
  );
  const [badgeSettingsOpen, setBadgeSettingsOpen] = useState(false);
  const [siteSettingsOpen, setSiteSettingsOpen] = useState(false);
  const [copyOpen, setCopyOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const infiniteSentinel = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const stored = JSON.parse(raw) as StoredBuilderState;
          if (Array.isArray(stored.selectedKeys))
            setSelectedKeys(stored.selectedKeys);
          if (
            stored.viewMode === 'pagination' ||
            stored.viewMode === 'infinite'
          ) {
            setViewMode(stored.viewMode);
          }
          if (
            stored.displayMode === 'tooltip' ||
            stored.displayMode === 'inside'
          ) {
            setDisplayMode(stored.displayMode);
          }
          if (stored.badgeSettings) {
            setBadgeSettings(normalizeBadgeSettings(stored.badgeSettings));
          }
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      } finally {
        setHydrated(true);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ selectedKeys, viewMode, displayMode, badgeSettings }),
    );
  }, [badgeSettings, displayMode, hydrated, selectedKeys, viewMode]);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        document
          .querySelector<HTMLInputElement>('.search-field input')
          ?.focus();
      }
    }
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  const iconByKey = useMemo(
    () => new Map(icons.map(icon => [icon.key, icon])),
    [icons],
  );

  const selectedIcons = useMemo(
    () =>
      selectedKeys
        .map(key => iconByKey.get(key))
        .filter((icon): icon is IconGroup => Boolean(icon)),
    [iconByKey, selectedKeys],
  );

  const filteredIcons = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return icons.filter(icon => {
      const matchesCategory = category === 'all' || icon.category === category;
      const matchesQuery =
        !normalizedQuery ||
        icon.displayName.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, icons, query]);

  useEffect(() => {
    if (viewMode !== 'infinite' || !infiniteSentinel.current) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount(count =>
            Math.min(count + INFINITE_CHUNK, filteredIcons.length),
          );
        }
      },
      { rootMargin: '500px 0px' },
    );
    observer.observe(infiniteSentinel.current);
    return () => observer.disconnect();
  }, [filteredIcons.length, viewMode]);

  const displayedIcons = useMemo(() => {
    if (viewMode === 'infinite') return filteredIcons.slice(0, visibleCount);
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredIcons.slice(start, start + PAGE_SIZE);
  }, [currentPage, filteredIcons, viewMode, visibleCount]);

  const selectedNames = selectedIconNames(selectedIcons);
  const badgeUrl = buildBadgeUrl(selectedNames, badgeSettings);
  const snippets = buildBadgeSnippets(badgeUrl);

  const selectedIconsWithUrls = selectedIcons.map(icon => ({
    ...icon,
    imageUrl: getIconUrl(icon, resolvedTheme),
  }));

  const closeBadgeSettings = useCallback(() => setBadgeSettingsOpen(false), []);
  const closeSiteSettings = useCallback(() => setSiteSettingsOpen(false), []);
  const closeCopy = useCallback(() => setCopyOpen(false), []);

  function toggleIcon(icon: IconGroup) {
    setSelectedKeys(current =>
      current.includes(icon.key)
        ? current.filter(key => key !== icon.key)
        : [...current, icon.key],
    );
  }

  function showToast(message: string) {
    window.clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = window.setTimeout(() => setToast(''), 2200);
  }

  async function copyText(value: string, label: string) {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    showToast(`${label} copied to clipboard`);
  }

  function changePage(page: number) {
    setCurrentPage(page);
    document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' });
  }

  function changeQuery(nextQuery: string) {
    setQuery(nextQuery);
    setCurrentPage(1);
    setVisibleCount(INFINITE_CHUNK);
  }

  function changeCategory(nextCategory: IconCategory | 'all') {
    setCategory(nextCategory);
    setCurrentPage(1);
    setVisibleCount(INFINITE_CHUNK);
  }

  function changeViewMode(nextViewMode: ViewMode) {
    setViewMode(nextViewMode);
    setCurrentPage(1);
    setVisibleCount(INFINITE_CHUNK);
  }

  return (
    <div className="site-shell">
      <div className="ambient ambient--one" />
      <div className="ambient ambient--two" />
      <div className="page-container">
        <SiteHeader
          iconCount={icons.length}
          onOpenSettings={() => setSiteSettingsOpen(true)}
          preference={preference}
          resolvedTheme={resolvedTheme}
          setPreference={setPreference}
        />

        <main>
          <section className="builder-section" id="library">
            <LibraryToolbar
              category={category}
              onCategoryChange={changeCategory}
              onQueryChange={changeQuery}
              onViewModeChange={changeViewMode}
              query={query}
              resultCount={filteredIcons.length}
              viewMode={viewMode}
            />

            <div className="builder-layout">
              <div className="library-panel" aria-busy={isLoading}>
                {isLoading ? (
                  <div
                    className="skeleton-grid"
                    aria-label="Loading icon library"
                  >
                    {Array.from({ length: 42 }, (_, index) => (
                      <span key={index}>
                        <i />
                      </span>
                    ))}
                  </div>
                ) : error ? (
                  <div className="state-panel state-panel--error">
                    <AlertTriangle size={28} />
                    <h3>The icon library did not load</h3>
                    <p>{error}</p>
                    <Button onClick={() => window.location.reload()}>
                      Try again
                    </Button>
                  </div>
                ) : displayedIcons.length ? (
                  <>
                    <div className="icon-grid">
                      {displayedIcons.map(icon => (
                        <IconCard
                          displayMode={displayMode}
                          icon={icon}
                          imageUrl={getIconUrl(icon, resolvedTheme)}
                          isSelected={selectedKeys.includes(icon.key)}
                          key={icon.key}
                          onToggle={toggleIcon}
                        />
                      ))}
                    </div>
                    {viewMode === 'infinite' ? (
                      <div className="infinite-sentinel" ref={infiniteSentinel}>
                        {visibleCount < filteredIcons.length ? (
                          <>
                            <LoaderCircle className="spin" size={17} /> Loading
                            more icons
                          </>
                        ) : (
                          `All ${filteredIcons.length.toLocaleString()} icons loaded`
                        )}
                      </div>
                    ) : (
                      <Pagination
                        currentPage={currentPage}
                        onPageChange={changePage}
                        pageSize={PAGE_SIZE}
                        totalItems={filteredIcons.length}
                      />
                    )}
                  </>
                ) : (
                  <div className="state-panel">
                    <SearchX size={30} />
                    <h3>No matching icons</h3>
                    <p>Try a shorter keyword or choose another category.</p>
                    <Button
                      onClick={() => {
                        setQuery('');
                        setCategory('all');
                      }}
                    >
                      Reset filters
                    </Button>
                  </div>
                )}
              </div>

              <SelectedStack
                icons={selectedIconsWithUrls}
                imageUrl={badgeUrl}
                onClear={() => setSelectedKeys([])}
                onCopy={() => setCopyOpen(true)}
                onCustomize={() => setBadgeSettingsOpen(true)}
                onRemove={toggleIcon}
              />
            </div>

            <MobileStackBar
              onOpen={() => setCopyOpen(true)}
              selectedCount={selectedIcons.length}
            />
          </section>
        </main>

        <footer className="site-footer">
          <div>
            <img
              alt=""
              height="24"
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/logo.png`}
              width="24"
            />
            <span>Built for developers who care about the details.</span>
          </div>
          <div>
            <a
              href={`${REPOSITORY_URL}/issues`}
              rel="noreferrer"
              target="_blank"
            >
              Request an icon
            </a>
            <a href={REPOSITORY_URL} rel="noreferrer" target="_blank">
              GitHub
            </a>
            <a href="#library">Open playground</a>
          </div>
        </footer>
      </div>

      <Button
        aria-label="Back to top"
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        size="icon"
      >
        <ArrowUp size={17} />
      </Button>

      <SiteSettingsDialog
        displayMode={displayMode}
        onClose={closeSiteSettings}
        onDisplayModeChange={setDisplayMode}
        onThemeChange={setPreference}
        open={siteSettingsOpen}
        themePreference={preference}
      />
      <BadgeSettingsDialog
        badgeSettings={badgeSettings}
        onBadgeSettingsChange={setBadgeSettings}
        onClose={closeBadgeSettings}
        onReset={() => setBadgeSettings(DEFAULT_BADGE_SETTINGS)}
        open={badgeSettingsOpen}
        previewUrl={badgeUrl}
        selectedCount={selectedIcons.length}
      />
      <CopyDialog
        onClose={closeCopy}
        onCopy={copyText}
        open={copyOpen}
        previewUrl={badgeUrl}
        snippets={snippets}
      />
      <Toast message={toast} />
    </div>
  );
}

function getIconUrl(icon: IconGroup, theme: 'light' | 'dark'): string {
  const filename = resolveIconFilename(icon, theme);
  return `${ICON_ASSET_BASE_URL}/${encodeURIComponent(filename)}`;
}
