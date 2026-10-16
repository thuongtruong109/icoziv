#!/bin/sh
set -eu

wrangler=/app/node_modules/wrangler/bin/wrangler.js
config=/app/docker/wrangler.toml
state=/app/.wrangler/state

echo "Loading bundled icons into local KV..."
node "$wrangler" kv key put icons \
  --binding ICONS_KV \
  --path /app/dist/icons.bin \
  --config "$config" \
  --persist-to "$state" \
  --local

exec node "$wrangler" dev \
  --config "$config" \
  --persist-to "$state" \
  --ip 0.0.0.0 \
  --port 8787 \
  --show-interactive-dev-session=false \
  --local
