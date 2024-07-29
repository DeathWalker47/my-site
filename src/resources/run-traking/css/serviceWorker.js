// importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js");

// workbox.setConfig({ debug: true });

// const {
//     routing: { registerRoute, setCatchHandler },
//     strategies: { CacheFirst, NetworkFirst, StaleWhileRevalidate },
//     cacheableResponse: { CacheableResponse, CacheableResponsePlugin },
//     expiration: { ExpirationPlugin, CacheExpiration },
//     precaching: { matchPrecache, precacheAndRoute },
// } = workbox;

// precacheAndRoute([{ url: "/offline.html", revision: null }]);

// // Cache page navigations (html) with a Network First strategy
// registerRoute(
//     ({ request }) => request.mode === "navigate",
//     new NetworkFirst({
//         cacheName: "pages",
//         plugins: [
//             new CacheableResponsePlugin({
//                 statuses: [200],
//             }),
//         ],
//     })
// );

// // Cache Google Fonts
// registerRoute(
//     ({ url }) =>
//         url.origin === "https://fonts.googleapis.com" ||
//         url.origin === "https://fonts.gstatic.com",
//     new StaleWhileRevalidate({
//         cacheName: "pwa-google-fonts",
//         plugins: [new ExpirationPlugin({ maxEntries: 20 })],
//     })
// );

// // Cache Images
// registerRoute(
//     ({ request }) => request.destination === "image",
//     new CacheFirst({
//         cacheName: "pwa-images",
//         plugins: [
//             new CacheableResponsePlugin({
//                 statuses: [0, 200],
//             }),
//             new ExpirationPlugin({
//                 maxEntries: 60,
//                 maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//             }),
//         ],
//     })
// );

// // Cache CSS, JS, Manifest, and Web Worker
// registerRoute(
//     ({ request }) =>
//         request.destination === "script" ||
//         request.destination === "style" ||
//         request.destination === "manifest" ||
//         request.destination === "worker",
//     new StaleWhileRevalidate({
//         cacheName: "pwa-static-assets",
//         plugins: [
//             new CacheableResponsePlugin({
//                 statuses: [0, 200],
//             }),
//             new ExpirationPlugin({
//                 maxEntries: 32,
//                 maxAgeSeconds: 24 * 60 * 60, // 24 hours
//             }),
//         ],
//     })
// );

// // Catch routing errors, like if the user is offline
// setCatchHandler(async ({ event }) => {
//     // Return the precached offline page if a document is being requested
//     if (event.request.destination === "document") {
//         return matchPrecache("/offline.html");
//     }

//     return Response.error();
// });

// Service Worker для PWA

// Сжатие ответа
const compression = require('compression');
const bodyParser = require('body-parser');

// Оптимизация кэширования
const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/map.js'
];

// Обработка push-уведомлений
self.addEventListener('push', function(event) {
  const payload = event.data.text();
  const title = 'Новое уведомление';
  const options = {
    body: payload,
    icon: '/icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Фоновые запросы
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

// Обработка ошибок запросов
self.addEventListener('error', function(event) {
  console.error('Ошибка запроса:', event);
});

// Обработка аудио и видео
self.addEventListener('message', function(event) {
  if (event.data.type === 'audio' || event.data.type === 'video') {
    const audio = new Audio(event.data.src);
    audio.play();
  }
});

// Обработка установки Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// Обработка активации Service Worker
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('my-pwa-cache-') &&
                 cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
