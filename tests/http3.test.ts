import { describe, expect, it, vi } from 'vitest';
import { checkHttp3 } from '../cmd/lib/http3.js';

const target = 'https://example.com/icons?i=js';
const supportedCurl = 'curl 8.21.0\nFeatures: HTTP2 HTTP3 SSL\n';

describe('HTTP/3 deployment check', () => {
  it.each(['3 200', '3.0 200', '3 204'])(
    'accepts a successful HTTP/3 response: %s',
    output => {
      const run = vi
        .fn()
        .mockReturnValueOnce(supportedCurl)
        .mockReturnValueOnce(output);

      expect(checkHttp3(target, run)).toEqual({
        url: target,
        status: Number(output.split(' ')[1]),
      });
      expect(run.mock.calls[1][0]).toContain('--http3-only');
    },
  );

  it.each(['2 200', '1.1 200', '3 301', '3 404', '3 500', '0 000', ''])(
    'rejects fallback, unsuccessful responses, or missing results: %s',
    output => {
      const run = vi
        .fn()
        .mockReturnValueOnce(supportedCurl)
        .mockReturnValueOnce(output);

      expect(() => checkHttp3(target, run)).toThrow(
        'Expected HTTP/3 with a 2xx response',
      );
    },
  );

  it.each([
    'curl 8.21.0\nFeatures: HTTP2 SSL\n',
    'curl 8.21.0\nProtocols: HTTP3\nFeatures: SSL\n',
  ])('rejects unsupported curl builds before connecting', version => {
    const run = vi.fn().mockReturnValue(version);

    expect(() => checkHttp3(target, run)).toThrow('curl lacks HTTP/3 support');
    expect(run).toHaveBeenCalledTimes(1);
  });

  it.each([
    'http://example.com/icons?i=js',
    'https://user:password@example.com/icons?i=js',
    'not-a-url',
  ])('rejects invalid or unsuitable targets before invoking curl', url => {
    const run = vi.fn();

    expect(() => checkHttp3(url, run)).toThrow();
    expect(run).not.toHaveBeenCalled();
  });

  it('propagates a failed QUIC connection instead of reporting success', () => {
    const run = vi
      .fn()
      .mockReturnValueOnce(supportedCurl)
      .mockImplementationOnce(() => {
        throw new Error('curl failed (exit 28): QUIC connection timed out');
      });

    expect(() => checkHttp3(target, run)).toThrow('QUIC connection timed out');
  });
});
