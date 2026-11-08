const CACHE = 'lorito-v3';
const FILES = [
  './', 'index.html', 'style.css', 'app.js', 'manifest.json',
  'icon-192.png', 'icon-512.png',
  'lorito-hola.webp', 'lorito-feliz.webp', 'lorito-sorprendido.webp',
  'lorito-llorando.webp', 'lorito-escribiendo.webp'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
// Primero red (para ver actualizaciones), y si no hay internet, caché.
// También guarda la tipografía de Google Fonts la primera vez para usarla sin internet.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(r => {
      if (r && (r.ok || r.type === 'opaque')) {
        const copy = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      }
      return r;
    }).catch(() => caches.match(e.request))
  );
});
