/* global AbortSignal, Buffer, console, fetch, process, URL */
import assert from 'node:assert/strict';
import { createDecipheriv } from 'node:crypto';

const origin = new URL(process.argv[2] || 'http://localhost:8080');
const api = new URL('/badge-api/', origin);

async function request(path, options) {
  const response = await fetch(new URL(path, origin), {
    signal: AbortSignal.timeout(15000),
    ...options,
  });
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  return response;
}

const home = await (await request('/')).text();
assert.match(home, /Icoziv/);
assert.doesNotMatch(home, /\/icoziv\/_next\//);
await request('/about/');
await request('/contributors/');

const redirect = await fetch(new URL('/about', origin), {
  redirect: 'manual',
  signal: AbortSignal.timeout(15000),
});
assert.equal(redirect.status, 301);
assert.equal(
  new URL(redirect.headers.get('location'), origin).href,
  new URL('/about/', origin).href,
);

const catalog = await (await request('/icoziv.json')).json();
const [key, encrypted] = Object.entries(catalog)[0];
const decipher = createDecipheriv(
  'aes-256-cbc',
  Buffer.from(key, 'hex'),
  Buffer.alloc(16),
);
const names = JSON.parse(
  Buffer.concat([
    decipher.update(encrypted, 'base64'),
    decipher.final(),
  ]).toString('utf8'),
);
const catalogNames = new Set(
  names.map(name => name.toLowerCase().replace(/-(light|dark)$/, '')),
);
const apiNames = await (await request('/badge-api/api/icons')).json();
assert.ok(apiNames.length > 0, 'Local KV must contain icons');
assert.deepEqual(
  new Set(apiNames),
  catalogNames,
  'Web catalog and local KV must agree',
);

const icon = await request('/icon-assets/Docker.svg');
assert.match(icon.headers.get('content-type'), /image\/svg\+xml/);
assert.match(await icon.text(), /<svg/);

const badge = await request(
  '/badge-api/icons?i=react,ts,docker&padding=8&gap=md&border=thin',
);
assert.match(badge.headers.get('content-type'), /image\/svg\+xml/);
assert.match(await badge.text(), /<svg/);
assert.ok(badge.headers.get('etag'), 'Generated badge must have an ETag');
const cachedBadge = await fetch(badge.url, {
  headers: { 'If-None-Match': badge.headers.get('etag') },
  signal: AbortSignal.timeout(15000),
});
assert.equal(cachedBadge.status, 304);

const scripts = [...home.matchAll(/<script[^>]*\bsrc="([^"]+)"/g)].map(
  match => match[1],
);
const bundles = await Promise.all(
  scripts.map(async src => (await request(src)).text()),
);
assert.ok(
  bundles.some(bundle => bundle.includes(api.href.replace(/\/$/, ''))),
  'Web must target the Compose API',
);
assert.ok(
  bundles.some(bundle => bundle.includes('/icon-assets')),
  'Web must use bundled icon assets',
);

const missing = await fetch(new URL('/this-route-does-not-exist/', origin), {
  signal: AbortSignal.timeout(15000),
});
assert.equal(missing.status, 404);

console.log(
  `PASS ${origin.origin}: web routes, catalog (${apiNames.length} icons), local SVGs, badge generation, ETag, and API wiring`,
);
