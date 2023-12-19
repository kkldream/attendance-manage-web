import SHA256 from 'crypto-js/sha256';

export function sha256(text: string) {
  return SHA256(text).toString();
}
