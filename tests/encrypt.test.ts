import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  encrypt,
  decrypt,
  compressText,
  decompressText,
} from '../utils/encrypt.js';

type GlobalWithCompression = {
  CompressionStream?: new (format: 'gzip') => unknown;
  DecompressionStream?: new (format: 'gzip') => unknown;
};

function getTestGlobal(): GlobalWithCompression {
  return globalThis as GlobalWithCompression;
}

const originalBlob = globalThis.Blob;
const originalResponse = globalThis.Response;

class MockBlob {
  constructor(private readonly _data: unknown[]) {}

  stream(): ReadableStream {
    return new ReadableStream();
  }

  async arrayBuffer(): Promise<ArrayBuffer> {
    return new TextEncoder().encode('mock').buffer;
  }

  async text(): Promise<string> {
    return 'mock';
  }
}

class MockResponse {
  constructor(_: unknown) {}

  async blob(): Promise<Blob> {
    return new MockBlob([]) as unknown as Blob;
  }
}

function mockCompressionStream(): void {
  const g = getTestGlobal();

  g.CompressionStream = class {
    readable = new ReadableStream();
    writable = new WritableStream();

    constructor(_: 'gzip') {}
  };

  g.DecompressionStream = class {
    readable = new ReadableStream();
    writable = new WritableStream();

    constructor(_: 'gzip') {}
  };

  (globalThis as unknown as { Blob: typeof Blob }).Blob =
    MockBlob as unknown as typeof Blob;

  (globalThis as unknown as { Response: typeof Response }).Response =
    MockResponse as unknown as typeof Response;
}

function removeCompressionStream(): void {
  const g = getTestGlobal();
  delete g.CompressionStream;
  delete g.DecompressionStream;

  (globalThis as unknown as { Blob: typeof Blob }).Blob = originalBlob;
  (globalThis as unknown as { Response: typeof Response }).Response =
    originalResponse;
}

describe('Crypto Utils', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    removeCompressionStream();
  });

  describe('compressText & decompressText', () => {
    it('should compress and decompress correctly', async () => {
      const text = 'hello world';

      const compressed = await compressText(text);
      const decompressed = await decompressText(compressed);

      expect(decompressed).toBe(text);
    });

    it('should handle empty string', async () => {
      const text = '';

      const compressed = await compressText(text);
      const decompressed = await decompressText(compressed);

      expect(decompressed).toBe(text);
    });

    it('should handle large text', async () => {
      const text = 'a'.repeat(10000);

      const compressed = await compressText(text);
      const decompressed = await decompressText(compressed);

      expect(decompressed).toBe(text);
    });
  });

  describe('encrypt & decrypt', () => {
    it('should encrypt and decrypt correctly', async () => {
      const text = 'secret message';

      const encrypted = await encrypt(text);
      const decrypted = await decrypt(encrypted);

      expect(decrypted).toBe(text);
    });

    it('should produce different outputs for same input (random IV)', async () => {
      const text = 'same text';

      const e1 = await encrypt(text);
      const e2 = await encrypt(text);

      expect(e1).not.toBe(e2);
    });

    it('should fail decrypt with wrong key', async () => {
      const text = 'secret';

      const encrypted = await encrypt(text);

      const wrongKey =
        'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

      await expect(decrypt(encrypted, wrongKey)).rejects.toThrow();
    });

    it('should throw error for invalid format', async () => {
      await expect(decrypt('invalid-data')).rejects.toThrow(
        '❌ Invalid encrypted data format',
      );
    });

    it('should handle unicode text', async () => {
      const text = 'xin chào 🚀 你好';

      const encrypted = await encrypt(text);
      const decrypted = await decrypt(encrypted);

      expect(decrypted).toBe(text);
    });
  });

  describe('encrypted format', () => {
    it('should return iv:data format', async () => {
      const encrypted = await encrypt('test');

      expect(encrypted).toMatch(/^[^:]+:[^:]+$/);
    });

    it('should have non-empty iv', async () => {
      const encrypted = await encrypt('test');
      const [iv] = encrypted.split(':');

      expect(iv.length).toBeGreaterThan(0);
    });
  });

  describe('key cache', () => {
    it('should reuse imported key', async () => {
      const spy = vi.spyOn(crypto.subtle, 'importKey');
      const key = '1'.repeat(64);

      await encrypt('a', key);
      await encrypt('b', key);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('CompressionStream branch', () => {
    it('should use browser compression when available', async () => {
      mockCompressionStream();

      const compressed = await compressText('abc');
      const result = await decompressText(compressed);

      expect(typeof result).toBe('string');
    });
  });
});
