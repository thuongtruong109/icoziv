# Icoziv web

The interactive Icoziv badge builder, built with Next.js App Router and exported as a static site for GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Import a GitHub stack

Choose **Detect from GitHub** before the search field, enter a username in
**Build from GitHub**, and choose **Fetch & select**. Matching
icons replace the current selection and update the badge preview. Use the detected
technology chips or the icon library to adjust the result before copying it.
An error or a result with no matching icons keeps the existing selection.

The importer reads public repositories owned by the account and excludes forks.
It gathers primary languages and recognized framework topics from up to 300
repositories, ordered by most recent push. Up to 12 recent nonempty repositories
are inspected for additional languages and declared dependencies, including one
common app directory such as `web`, `frontend`, or `docs`. Recognized manifests
include npm, Composer, Python, Ruby, Flutter, Spring, and ASP.NET projects.
Topics and dependencies are evidence of a repository's declared stack, not proof
of a developer's proficiency; private repos and contributions to others' repos
are outside this scan.

The result shows the actual scan coverage, unavailable icon matches, and partial
scan notices. Scans are cancellable, bounded to 48 API requests, and reuse clean
results in memory for five minutes. No login or token is required or stored.
GitHub's unauthenticated REST quota is shared by the client's IP address; a
rate-limited scan reports the available results or an actionable error.

See [GitHub's language API](https://docs.github.com/en/rest/repos/repos#list-repository-languages)
and [REST rate limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api).

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

The production build is written to `out/`. On GitHub Actions, Next.js automatically uses `/icoziv` as the Pages base path.

## Structure

- `app/` — routes, metadata and global visual system
- `components/icon-builder/` — builder features and dialogs
- `components/ui/` — reusable UI primitives
- `hooks/` — theme and icon catalog state
- `lib/` — badge URL and catalog utilities
- `types/` — shared domain types
