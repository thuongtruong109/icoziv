const IV_LENGTH = 16;
const AUTO_SECRET_KEY =
  'a8b3c9d1e4f60712a8b3c9d1e4f60712a8b3c9d1e4f60712a8b3c9d1e4f60712';
const ALGORITHM_WEB = { name: 'AES-GCM', length: 256 }; // AES-CBC
const KEY_USAGE_ENCRYPT: KeyUsage[] = ['encrypt'];
const KEY_USAGE_DECRYPT: KeyUsage[] = ['decrypt'];

const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
};

const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes.buffer;
};

const hexToArrayBuffer = (hex: string): ArrayBuffer =>
  new Uint8Array(hex.match(/.{1,2}/g)?.map(b => parseInt(b, 16)) ?? []).buffer;

async function getKey(keyHex: string, usage: KeyUsage[]): Promise<CryptoKey> {
  const keyBuffer = hexToArrayBuffer(keyHex);
  return crypto.subtle.importKey('raw', keyBuffer, ALGORITHM_WEB, false, usage);
}

function hasCompressionStream(): boolean {
  return (
    typeof globalThis !== 'undefined' &&
    typeof (globalThis as Record<string, unknown>).CompressionStream ===
      'function' &&
    typeof (globalThis as Record<string, unknown>).DecompressionStream ===
      'function'
  );
}

function toArrayBuffer(data: ArrayBuffer | SharedArrayBuffer): ArrayBuffer {
  if (data instanceof ArrayBuffer) return data;
  return new Uint8Array(data).slice().buffer;
}

export async function compressText(text: string): Promise<ArrayBuffer> {
  const encoded = new TextEncoder().encode(text);

  if (hasCompressionStream()) {
    const cs = new CompressionStream('gzip');
    const stream = new Blob([encoded]).stream().pipeThrough(cs);
    const blob = await new Response(stream).blob();
    const ab = await blob.arrayBuffer();
    return toArrayBuffer(ab);
  }

  const { gzipSync } = await import('node:zlib');
  const buf = gzipSync(encoded);
  return (buf.buffer as ArrayBuffer).slice(
    buf.byteOffset,
    buf.byteOffset + buf.byteLength,
  );
}

export async function decompressText(buffer: ArrayBuffer): Promise<string> {
  if (hasCompressionStream()) {
    const ds = new DecompressionStream('gzip');
    const stream = new Blob([buffer]).stream().pipeThrough(ds);
    const blob = await new Response(stream).blob();
    return blob.text();
  }

  const { gunzipSync } = await import('node:zlib');
  const out = gunzipSync(Buffer.from(buffer));
  return out.toString('utf-8');
}

export async function encrypt(
  text: string,
  key: string = AUTO_SECRET_KEY,
): Promise<string> {
  const keyObject = await getKey(key, KEY_USAGE_ENCRYPT);
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const compressed = await compressText(text);

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: ALGORITHM_WEB.name, iv },
    keyObject,
    compressed,
  );

  return `${arrayBufferToBase64(iv.buffer)}:${arrayBufferToBase64(encryptedBuffer)}`;
}

export async function decrypt(
  encryptedCombined: string,
  key: string = AUTO_SECRET_KEY,
): Promise<string> {
  const [ivB64, dataB64] = encryptedCombined.split(':');
  if (!ivB64 || !dataB64) throw new Error('❌ Invalid encrypted data format');

  const iv = base64ToArrayBuffer(ivB64);
  const encrypted = base64ToArrayBuffer(dataB64);
  const keyObject = await getKey(key, KEY_USAGE_DECRYPT);

  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: ALGORITHM_WEB.name, iv },
    keyObject,
    encrypted,
  );

  return decompressText(decryptedBuffer);
}
