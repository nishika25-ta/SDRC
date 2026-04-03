/**
 * Saint of the Day is keyed by calendar day + half-day (before/after noon local time),
 * so it updates twice per day and persists in localStorage across visits.
 */
const STORAGE_PREFIX = 'sdrc:saint:v1';

export function getSaintHalfDayPeriod(date = new Date()) {
  return date.getHours() < 12 ? 'am' : 'pm';
}

export function getSaintCacheKey(lang, date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const period = getSaintHalfDayPeriod(date);
  return `${STORAGE_PREFIX}:${lang}:${y}-${m}-${d}:${period}`;
}

export function readSaintCache(key) {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.name === 'string' && typeof parsed.bio === 'string') {
      return parsed;
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function writeSaintCache(key, data) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    /* quota or private mode */
  }
}

/** Milliseconds until the next noon or midnight (when the half-day slot changes). */
export function getNextHalfDayChangeMs(from = new Date()) {
  const next = new Date(from);
  if (from.getHours() < 12) {
    next.setHours(12, 0, 0, 0);
  } else {
    next.setDate(next.getDate() + 1);
    next.setHours(0, 0, 0, 0);
  }
  return Math.max(0, next.getTime() - from.getTime());
}
