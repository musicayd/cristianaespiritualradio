const CACHE_NAME = "radio-cache-v50";

const urlsToCache = [

    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json",

    "./icon.png",
    "./portada.jpg",
    "./intro.jpeg",

    "./yoteseguire.jpeg",
    "./laobramaravillosa.jpeg"
];

/* =========================
   INSTALL
========================= */

self.addEventListener("install", (event) => {

    self.skipWaiting();

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(urlsToCache);
            })
    );
});

/* =========================
   ACTIVATE
========================= */

self.addEventListener("activate", (event) => {

    event.waitUntil(

        caches.keys().then(cacheNames => {

            return Promise.all(

                cacheNames.map(cache => {

                    if(cache !== CACHE_NAME){

                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => clients.claim())
    );
});

/* =========================
   FETCH
========================= */

self.addEventListener("fetch", (event) => {

    event.respondWith(

        fetch(event.request)

           .then(response => {

    const responseClone = response.clone();

    if(response.status === 200){

        caches.open(CACHE_NAME)
            .then(cache => {

                cache.put(event.request, responseClone);
            });
    }

    return response;
})

            .catch(() => {

                return caches.match(event.request);
            })
    );
});
