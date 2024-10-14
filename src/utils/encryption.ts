import { AES, enc } from 'crypto-js';

const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY ?? '';

export function encrypt(message: string): string {
  return AES.encrypt(message, key).toString();
}

export function decrypt(ciphertext: string): string {
  return AES.decrypt(ciphertext, key).toString(enc.Utf8);
}
