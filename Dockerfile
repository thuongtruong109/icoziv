# syntax=docker/dockerfile:1

FROM oven/bun:1.3.14 AS assets
WORKDIR /app
COPY cmd ./cmd
COPY utils ./utils
COPY icons ./icons
RUN bun run cmd/build.ts

FROM oven/bun:1.3.14 AS worker-dependencies
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM node:24-bookworm-slim AS worker
WORKDIR /app
ENV CI=true \
    WRANGLER_SEND_METRICS=false
RUN apt-get update \
    && apt-get install -y --no-install-recommends libatomic1 \
    && rm -rf /var/lib/apt/lists/*
COPY --chown=node:node --from=worker-dependencies /app/node_modules ./node_modules
COPY --chown=node:node package.json tsconfig.json global.d.ts index.ts ./
COPY --chown=node:node shared ./shared
COPY --chown=node:node types ./types
COPY --chown=node:node utils ./utils
COPY --chown=node:node --from=assets /app/dist ./dist
COPY --chown=node:node docker/wrangler.toml docker/worker-entrypoint.sh ./docker/
RUN mkdir -p /app/.wrangler/state \
    && chown node:node /app /app/.wrangler /app/.wrangler/state
USER node
EXPOSE 8787
ENTRYPOINT ["sh", "/app/docker/worker-entrypoint.sh"]

FROM node:24-bookworm-slim AS web-build
WORKDIR /app/docs
ENV NEXT_TELEMETRY_DISABLED=1 \
    GITHUB_ACTIONS=false
COPY docs/package.json docs/package-lock.json ./
RUN npm ci
COPY docs ./
COPY --from=assets /app/public/icoziv.json ./public/icoziv.json
ARG NEXT_PUBLIC_BADGE_BASE_URL=http://localhost:8080/badge-api
ENV NEXT_PUBLIC_BADGE_BASE_URL=$NEXT_PUBLIC_BADGE_BASE_URL \
    NEXT_PUBLIC_ICON_ASSET_BASE_URL=/icon-assets
RUN npm run build

FROM nginxinc/nginx-unprivileged:stable-alpine AS web
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=web-build /app/docs/out /usr/share/nginx/html
COPY --from=assets /app/icons /usr/share/nginx/html/icon-assets
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]
