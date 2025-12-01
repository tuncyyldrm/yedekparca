self.addEventListener('install', event => {
    console.log('Katalog Service Worker: Kurulum tamamlandı.');
    event.waitUntil(
        caches.open('katalog-cache').then(cache => {
            return cache.addAll([
                '/index.html',
                '/style1.css',
                '/script.js',
                '/icons/katalogicon-192x192.png',
                '/icons/katalogicon-512x512.png'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    // Eğer istek /siparis/ ile başlıyorsa, Service Worker hiç karışmasın
    if (event.request.url.includes('/siparis/')) {
        return; // Sipariş dizinine gelen istekleri katalog SW hiç ele almasın
    }

    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
