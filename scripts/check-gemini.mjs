/**
 * One-off check: loads VITE_GEMINI_API_KEY from .env or .env.local (same files Vite uses).
 * Falls back to .env.example only so this script can still run if you mistakenly put the key there.
 * The running app does NOT read .env.example — copy your key to .env.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function loadKey() {
  for (const name of ['.env', '.env.local', '.env.example']) {
    const fp = path.join(root, name);
    try {
      const text = fs.readFileSync(fp, 'utf8');
      const line = text.split('\n').find((l) => /^\s*VITE_GEMINI_API_KEY\s*=/.test(l));
      if (!line) continue;
      const v = line.replace(/^\s*VITE_GEMINI_API_KEY\s*=\s*/, '').trim().replace(/^["']|["']$/g, '');
      if (v && !/^your_|^paste_/i.test(v)) return v;
    } catch {
      /* missing */
    }
  }
  return '';
}

const apiKey = loadKey();
if (!apiKey) {
  console.error('No VITE_GEMINI_API_KEY in .env or .env.local. Vite ignores .env.example — copy .env.example to .env and paste your key.');
  process.exit(1);
}

const model = 'gemini-2.5-flash';
const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

const payload = {
  contents: [{ parts: [{ text: 'Reply with exactly: OK' }] }],
  generationConfig: { temperature: 0.2 },
};

const res = await fetch(endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});

const data = await res.json();

if (!res.ok) {
  console.error('HTTP', res.status);
  console.error(JSON.stringify(data, null, 2));
  process.exit(1);
}

const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
if (!text) {
  console.error('Unexpected response:', JSON.stringify(data, null, 2));
  process.exit(1);
}

console.log('Gemini API: OK');
console.log('Model:', model);
console.log('Sample reply:', text.slice(0, 120));
