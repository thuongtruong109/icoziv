/* global AbortSignal, console, fetch */
import assert from 'node:assert/strict';

const origin = 'http://127.0.0.1:8787';

async function request(path, options) {
  return fetch(`${origin}${path}`, {
    signal: AbortSignal.timeout(15000),
    ...options,
  });
}

const catalog = await request('/api/icons');
assert.equal(catalog.status, 200, 'Local KV must be ready');
const names = await catalog.json();
assert.ok(
  Array.isArray(names) && names.length > 0,
  'Local KV must contain icons',
);
assert.ok(names.includes('docker'), 'Bundled Docker icon must be available');

const badgePath = '/icons?i=react,ts,docker&padding=8&gap=md&border=thin';
const badge = await request(badgePath);
assert.equal(badge.status, 200);
assert.match(badge.headers.get('content-type'), /image\/svg\+xml/);
assert.match(await badge.text(), /<svg/);
assert.equal(badge.headers.get('access-control-allow-origin'), '*');
const etag = badge.headers.get('etag');
assert.ok(etag, 'Generated badge must have an ETag');

const cachedBadge = await request(badgePath, {
  headers: { 'If-None-Match': etag },
});
assert.equal(cachedBadge.status, 304);

const preflight = await request('/icons', { method: 'OPTIONS' });
assert.equal(preflight.status, 200);
assert.match(preflight.headers.get('access-control-allow-methods'), /GET/);

console.log(
  `PASS Worker API: local KV (${names.length} icons), SVG generation, ETag/304, and CORS`,
);
