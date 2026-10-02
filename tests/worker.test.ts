import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../utils/encrypt.js', () => ({
  decrypt: async () =>
    JSON.stringify({
      javascript: '<path id="js"/>',
      typescript: '<path id="ts"/>',
    }),
}));

import worker from '../index.js';

const mockEnv = {
  ICONS_KV: {
    get: vi.fn(async () => 'FAKE_ENCRYPTED_DATA'),
  },
} as unknown as Env;

const waitUntil = vi.fn((_promise: Promise<unknown>) => undefined);

async function request(
  path: string,
  headers?: Record<string, string>,
): Promise<Response> {
  return worker.fetch(
    new Request(`https://example.com${path}`, { headers }),
    mockEnv,
    { waitUntil },
  );
}

describe('worker customization', () => {
  beforeAll(() => {
    vi.stubGlobal('caches', {
      default: { put: vi.fn(async () => undefined) },
    });
  });

  beforeEach(() => {
    waitUntil.mockClear();
  });

  it('renders a normalized background and pixel padding', async () => {
    const response = await request('/icons?i=javascript&bg=%23ABC&padding=10');
    const svg = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('image/svg+xml');
    expect(response.headers.get('ETag')).toMatch(/^"sha256-[a-f0-9]{64}"$/);
    expect(svg).toContain('width="68" height="68"');
    expect(svg).toContain('fill="#abc"');
  });

  it('renders semantic icon gap levels with sm as the default', async () => {
    const defaultResponse = await request('/icons?i=javascript,typescript');
    const defaultSvg = await defaultResponse.text();
    const largeResponse = await request(
      '/icons?i=javascript,typescript&gap=xl',
    );
    const largeSvg = await largeResponse.text();

    expect(defaultSvg).toContain('width="104.25"');
    expect(defaultSvg).toContain('translate(300,0)');
    expect(largeSvg).toContain('width="120.75"');
    expect(largeSvg).toContain('translate(388,0)');
  });

  it.each([
    ['/icons?i=javascript&gap=wide', 'Gap must be'],
    ['/icons?i=javascript&padding=1.5', 'Padding must be'],
    ['/icons?i=javascript&padding=201', 'Padding must be'],
    [
      '/icons?i=javascript&bg=http%3A%2F%2Fexample.com%2Fbg.png',
      'Background must be',
    ],
    [
      '/icons?i=javascript&bg=data%3Aimage%2Fpng%3Bbase64%2Cabc',
      'Background must be',
    ],
  ])('rejects invalid customization: %s', async (path, error) => {
    const response = await request(path);
    expect(response.status).toBe(400);
    expect(await response.text()).toContain(error);
  });

  it('uses a representation-specific ETag', async () => {
    const light = await request('/icons?i=javascript&bg=fff');
    const lightEtag = light.headers.get('ETag');
    expect(lightEtag).toBeTruthy();

    const dark = await request('/icons?i=javascript&bg=000', {
      'If-None-Match': lightEtag!,
    });
    expect(dark.status).toBe(200);
    expect(dark.headers.get('ETag')).not.toBe(lightEtag);

    const unchanged = await request('/icons?i=javascript&bg=fff', {
      'If-None-Match': lightEtag!,
    });
    expect(unchanged.status).toBe(304);
    expect(await unchanged.text()).toBe('');
  });

  it('creates different ETags for the JSON endpoints', async () => {
    const names = await request('/api/icons');
    const svgs = await request('/api/svgs');

    expect(names.headers.get('ETag')).toBeTruthy();
    expect(svgs.headers.get('ETag')).toBeTruthy();
    expect(names.headers.get('ETag')).not.toBe(svgs.headers.get('ETag'));
  });
});
