// IndexNow notifier for Alpha Surge. Run after each deploy:  node scripts/indexnow.mjs
// Submits only sitemap URLs whose HTML changed since the last successful run.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
const HOST = 'en-alphasurge.vercel.app';
const ORIGIN = `https://${HOST}`;
const KEY = readFileSync(new URL('../key.txt', import.meta.url), 'utf8').trim();
const STATE = new URL('../.indexnow-state.json', import.meta.url);
const sitemap = readFileSync(new URL('../sitemap.xml', import.meta.url), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]).filter(u => u.startsWith(ORIGIN));
const state = existsSync(STATE) ? JSON.parse(readFileSync(STATE, 'utf8')) : {};
const fileFor = u => { const p = u.slice(ORIGIN.length); return new URL('..' + (p === '/' ? '/index.html' : p), import.meta.url); };
const next = {}; const changed = [];
for (const u of urls) {
  const h = createHash('sha256').update(readFileSync(fileFor(u))).digest('hex');
  next[u] = h; if (state[u] !== h) changed.push(u);
}
const removed = Object.keys(state).filter(u => !next[u]); // deleted pages are also notified
const list = [...changed, ...removed];
if (!list.length) { console.log('IndexNow: nothing changed.'); process.exit(0); }
const body = { host: HOST, key: KEY, keyLocation: `${ORIGIN}/key.txt`, urlList: list };
for (let attempt = 1; attempt <= 3; attempt++) {
  try {
    const r = await fetch('https://api.indexnow.org/indexnow', { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(body) });
    console.log(`IndexNow HTTP ${r.status} for ${list.length} URL(s)`);
    if (r.status === 200 || r.status === 202) { writeFileSync(STATE, JSON.stringify(next, null, 1)); process.exit(0); }
    if (r.status === 400 || r.status === 403 || r.status === 422) { console.error('IndexNow rejected the request; check key.txt is live.'); process.exit(1); }
  } catch (e) { console.error('IndexNow attempt', attempt, 'failed:', e.message); }
  await new Promise(r => setTimeout(r, 2000 * attempt));
}
process.exit(1);
