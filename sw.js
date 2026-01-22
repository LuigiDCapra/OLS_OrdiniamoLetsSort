self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('lcd-store').then((cache) => cache.addAll([
      '/viola_137a/viola.html',
      '/viola_137a/index.js',     
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
