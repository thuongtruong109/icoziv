# Run Icoziv with Docker Compose

Install Docker Engine with Compose 2.20 or newer, or Docker Desktop with Linux
containers enabled. Run these commands from the repository root:

```bash
docker compose up --build -d --wait
docker compose ps
```

Open [the local playground](http://localhost:8080). Badge generation is available
at [the local API](http://localhost:8080/badge-api/icons?i=react,ts,docker).

## Services

- `web` builds the Next.js static export and serves it with unprivileged Nginx.
  The catalog and SVG icon files are built from this checkout and bundled in the
  image. The only published port is `127.0.0.1:8080`.
- `worker` runs the existing Cloudflare Worker through Wrangler on Node.js.
  Its startup script loads `dist/icons.bin` into local KV before starting the API.
  A named volume retains the local KV state; each startup refreshes the icons
  from the image. No Cloudflare login, token, or production KV access is needed.
- Nginx forwards `/badge-api/` to `worker:8787`. Compose waits for the populated
  Worker API to pass its health check before starting the web server.

Both the catalog and badge preview work locally after the images are built.
GitHub stack detection, contributor data, and user-supplied remote background
images still need Internet access. Installing dependencies and pulling base
images also require Internet access during the initial build.

This is a local Worker development stack. The existing Cloudflare deployment
continues to use `wrangler.toml`; Compose uses `docker/wrangler.toml` instead.
Local badge links only work on this machine. Use a reachable deployment URL for
badges embedded in a public README. The local server uses HTTP; HTTPS and HTTP/3
require a suitable reverse proxy or the existing Cloudflare deployment.

## Change the port

The web app's public API URL is compiled into the static JavaScript. When changing
the host port, set both values and rebuild. For PowerShell:

```powershell
$env:ICOZIV_PORT = '8090'
$env:ICOZIV_PUBLIC_URL = 'http://localhost:8090'
docker compose up --build -d --wait
```

For a POSIX shell:

```bash
ICOZIV_PORT=8090 ICOZIV_PUBLIC_URL=http://localhost:8090 docker compose up --build -d --wait
```

The standard GitHub Pages build keeps using its existing hosted API and icon URLs.
For other static deployments, `NEXT_PUBLIC_BADGE_BASE_URL` and
`NEXT_PUBLIC_ICON_ASSET_BASE_URL` can be set before `npm run build` in `docs/`.

## Build and publish to GHCR

The [container workflow](../.github/workflows/containers.yml) builds and smoke-tests
only the Worker API on pull requests, pushes to `main`, version tags matching
`v*.*.*`, and manual runs. After verification, pushes to `main` and version tags
publish one Linux AMD64 image; manual runs can publish from `main` or a version
tag. Pull requests never log in to GHCR or publish images. The web app remains on
GitHub Pages; its Docker target is available for local Compose testing only.

Published image: `ghcr.io/thuongtruong109/icoziv`.

The image name follows the repository's lowercase owner/name, so forks publish to
their own namespace. Every publish includes `sha-<full commit SHA>`. The `main`
branch also gets `main` and `latest`; `latest` always tracks `main`. A stable tag
such as `v1.2.3` gets `1.2.3` and `1.2`. Prerelease tags do not update stable
version aliases or `latest`.

The workflow uses the automatic `GITHUB_TOKEN` with `packages: write` in the
publish job; no personal access token is needed for publishing. Actions are
pinned to verified commit SHAs. If an existing GHCR package is not connected to
this repository, grant the repository write access in that package's settings.
New GHCR packages can be private; set the package visibility to public if you
want anonymous pulls.

To run only the published API, without the web app:

```bash
docker run -d --name icoziv --init -p 127.0.0.1:8787:8787 -v icoziv-worker-state:/app/.wrangler/state ghcr.io/thuongtruong109/icoziv:latest
```

After startup, the API is available at `http://localhost:8787`, for example
`http://localhost:8787/icons?i=react,ts,docker`.

For optional local web testing with the published Worker, use PowerShell:

```powershell
$env:ICOZIV_WORKER_IMAGE = 'ghcr.io/thuongtruong109/icoziv:latest'
docker compose pull worker
docker compose build web
docker compose up --no-build -d --wait
```

Or use a POSIX shell:

```bash
export ICOZIV_WORKER_IMAGE=ghcr.io/thuongtruong109/icoziv:latest
docker compose pull worker
docker compose build web
docker compose up --no-build -d --wait
```

For a fixed release, replace `latest` with `1.2.3` or `sha-<full commit SHA>`.
For a private package, sign in with `docker login ghcr.io` using an account/token
with permission to read the package. The Worker image runs the same local
Wrangler/KV runtime described above.

## Check and manage the stack

```bash
docker compose config --quiet
node docker/smoke-test.mjs
docker compose logs --tail 100 worker web
docker compose stop
docker compose start --wait
docker compose down
```

The smoke test uses Node.js 22 or newer on the host and accepts an optional URL,
for example `node docker/smoke-test.mjs http://localhost:8090`. It checks routes,
catalog/KV consistency, local SVGs, generated badges, ETags, and frontend API URLs.

`down` removes the stack's containers and network while keeping the KV volume.
To remove that local state as well, use `docker compose down --volumes`.
Source changes require `docker compose up --build -d --wait`; the default stack
serves a production web build and does not mount the checkout for hot reload.

## Layout

- `Dockerfile`: asset generation, Worker dependencies/runtime, web build/runtime
- `compose.yaml`: services, local port, health checks, and KV volume
- `docker/nginx.conf`: static routes, local icon assets, and API proxy
- `docker/wrangler.toml`: isolated local Worker configuration
- `docker/worker-entrypoint.sh`: local KV initialization and API startup
- `docker/smoke-test.mjs`: HTTP checks against the running stack
- `docker/smoke-test-worker.mjs`: API checks run inside the Worker container in CI
