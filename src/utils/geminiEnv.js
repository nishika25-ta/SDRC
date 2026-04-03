/**
 * Vite injects only env vars from `.env`, `.env.local`, etc. — not from `.env.example`.
 * Key must be named VITE_GEMINI_API_KEY (restart `npm run dev` after changes).
 */
export function getGeminiApiKey() {
  const raw = import.meta.env?.VITE_GEMINI_API_KEY;
  if (raw == null) return "";
  let s = String(raw).trim();
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1).trim();
  }
  return s;
}
