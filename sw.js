/* Offline PWA Service Worker */

const CACHE_NAME = 'dbt-companion-v5';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './styles/main.css',
  './styles/print.css',
  './js/app.js',
  './js/db.js',
  './js/exports.js',
  './js/modules/modelOfEmotions.js',
  './js/modules/chainAnalysis.js',
  './js/modules/wiseMind.js',
  './js/modules/dearman.js',
  './js/modules/dimeGame.js',
  './js/modules/abcPlease.js',
  './js/modules/distressTolerance.js',
  './js/modules/diaryCard.js',
  './js/modules/references.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
