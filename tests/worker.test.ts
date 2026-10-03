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

  it('renders border width and color in output pixels', async () => {
    const response = await request(
      '/icons?i=javascript&border=bold&bordercolor=%23ABC',
    );
    const svg = await response.text();

    expect(response.status).toBe(200);
    expect(svg).toContain('width="54" height="54"');
    expect(svg).toContain('transform="translate(16,16)"');
    expect(svg).toContain('stroke="#abc"');
    expect(svg).toContain('stroke-width="16"');
  });

  it('renders dashed and dotted border styles', async () => {
    const dashed = await request(
      '/icons?i=javascript&border=medium&borderstyle=dashed&bordercolor=abc',
    );
    const dotted = await request(
      '/icons?i=javascript&border=medium&borderstyle=dotted&bordercolor=abc',
    );

    expect(await dashed.text()).toContain('stroke-dasharray="42.6667 21.3333"');
    expect(await dotted.text()).toContain(
      'stroke-dasharray="0 26.6667" stroke-linecap="round"',
    );
  });

  it('renders rounded content and border corners', async () => {
    const response = await request(
      '/icons?i=javascript&bg=abc&rounded=lg&border=medium&bordercolor=ef4444',
    );
    const svg = await response.text();

    expect(response.status).toBe(200);
    expect(svg).toContain(
      '<clipPath id="badge-rounded-clip"><rect width="277.3333" height="277.3333" rx="64"/></clipPath>',
    );
    expect(svg).toContain(
      'width="266.6667" height="266.6667" rx="58.6667" fill="none"',
    );
  });

  it('renders shadow on each icon without shadowing the background', async () => {
    const response = await request(
      '/icons?i=javascript,typescript&bg=abc&shadow=lg',
    );
    const svg = await response.text();

    expect(response.status).toBe(200);
    expect(svg).toContain('<filter id="icon-shadow-lg"');
    expect(svg.match(/filter="url\(#icon-shadow-lg\)"/g)).toHaveLength(2);
    expect(svg).toContain(
      '<rect width="556" height="256" fill="#abc"/><g filter=',
    );
  });

  it.each([
    ['/icons?i=javascript&gap=wide', 'Gap must be'],
    ['/icons?i=javascript&border=wide', 'Border must be'],
    ['/icons?i=javascript&borderstyle=double', 'Border style must be'],
    ['/icons?i=javascript&rounded=round', 'Rounded must be'],
    ['/icons?i=javascript&shadow=heavy', 'Shadow must be'],
    ['/icons?i=javascript&bordercolor=red', 'Border color must be'],
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
