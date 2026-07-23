/* Offline PWA Service Worker - Network-First with Cache Fallback Caching Strategy */

const CACHE_NAME = 'dbt-companion-v37';
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

// Install Event - Pre-cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // Force active immediately
});

// Activate Event - Clear old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim(); // Immediately control all open client tabs
});

// Fetch Event - Network-First with Cache Fallback
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // If successful network fetch, dynamically update the cache
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // If network request fails (offline), serve from cache
        console.log('[Service Worker] Network failed, serving from cache:', event.request.url);
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // If offline and not in cache, return simple offline fallback if needed
        });
      })
  );
});
