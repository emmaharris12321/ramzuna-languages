// Serves saved German lessons when offline. Media is cache-first (with Range support for audio/video);
// pages and other files are network-first with a cache fallback.
const CACHE = 'german-offline-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

async function fromCache(req) {
  const cache = await caches.open(CACHE);
  const u = new URL(req.url);
  let hit = await cache.match(u.pathname + u.search);
  if (!hit && req.mode === 'navigate') {
    const alt = u.pathname.endsWith('/') ? u.pathname.slice(0, -1) : u.pathname + '/';
    hit = await cache.match(alt);
  }
  return hit;
}
async function rangeResponse(req, hit) {
  const buf = await hit.arrayBuffer();
  const m = /bytes=(\d*)-(\d*)/.exec(req.headers.get('range'));
  const start = m[1] ? parseInt(m[1], 10) : 0;
  const end = m[2] ? Math.min(parseInt(m[2], 10), buf.byteLength - 1) : buf.byteLength - 1;
  return new Response(buf.slice(start, end + 1), {
    status: 206,
    headers: {
      'Content-Type': hit.headers.get('Content-Type') || 'application/octet-stream',
      'Content-Range': `bytes ${start}-${end}/${buf.byteLength}`,
      'Content-Length': String(end - start + 1),
    },
  });
}
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  const isMedia = /\.(m4a|mp3|mp4|webm)$/i.test(new URL(req.url).pathname);
  e.respondWith((async () => {
    if (isMedia) {
      const hit = await fromCache(req);
      if (hit) return req.headers.has('range') ? rangeResponse(req, hit) : hit;
      return fetch(req);
    }
    try { return await fetch(req); }
    catch (err) { const hit = await fromCache(req); if (hit) return hit; throw err; }
  })());
});
