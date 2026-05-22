const CACHE_NAME = "radio-cache-v5";

const urlsToCache = [

    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json",
    "./icon.png",
    "./portada.png",
    "./intro.jpeg"
];

/* =========================
   FORCE UPDATE
========================= */

self.addEventListener("install", () => {

    self.skipWaiting();
});

self.addEventListener("activate", (event) => {

    event.waitUntil(clients.claim());
});

/* =========================
   CACHE FILES
========================= */

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(urlsToCache);
            })
    );
});

/* =========================
   FETCH
========================= */

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(response => {

                return response || fetch(event.request);
            })
    );
});
