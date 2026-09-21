const CACHE_NAME = "radio-cache-v68";

/* =========================
   FIREBASE CLOUD MESSAGING
========================= */

importScripts(
    "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
    "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
    apiKey: "AIzaSyAhQzly1lZemafx1SU1iQKlav6oyDTOqKw",
    authDomain: "radiocristianaespiritual.firebaseapp.com",
    databaseURL: "https://radiocristianaespiritual-default-rtdb.firebaseio.com",
    projectId: "radiocristianaespiritual",
    storageBucket: "radiocristianaespiritual.appspot.com",
    messagingSenderId: "93851149213",
    appId: "1:93851149213:web:5816335e8b9e8d6314c574"
});

const messaging = firebase.messaging();
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

    if(event.request.method !== "GET"){
        return;
    }

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
