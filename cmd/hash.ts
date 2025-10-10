import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export function hashPublicData(data: string): void {
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

  const filename = path.join(publicDir, 'icoziv.json');
  if (fs.existsSync(filename)) fs.unlinkSync(filename);

  const algorithm = 'aes-256-cbc';
  const iv = Buffer.alloc(16, 0);

  const key = crypto.randomBytes(32);
  const keyHex = key.toString('hex');

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(data, 'utf8'),
    cipher.final(),
  ]);

  const encryptedBase64 = encrypted.toString('base64');

  const fileContent = JSON.stringify({ [keyHex]: encryptedBase64 });

  fs.writeFileSync(filename, fileContent, 'utf8');
}
