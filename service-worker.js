self.addEventListener('install', event => {
    console.log('Service Worker kuruldu, cache kullanılmıyor.');
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('Service Worker aktif, cache kullanılmıyor.');
    clients.claim();
});

self.addEventListener('fetch', event => {
    if (event.request.url.includes('/siparis/')) {
        return; // Bu istekleri SW ele almasın
    }
    event.respondWith(fetch(event.request, { cache: 'no-store' }));
});
