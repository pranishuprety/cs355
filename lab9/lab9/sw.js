const CACHE_NAME = "v1.0";
const OFFLINE_URL = "offline.html";

async function cacheOffline() {
    const cache = await caches.open(CACHE_NAME);
    cache.add(OFFLINE_URL);
}

function deleteOldCache(){
    caches.keys()
    .then(keys=>{
        return Promise.all(
            keys.map(key=>{
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            })
        )
    })
}

async function onlineOrOffline(req){
    try {
        return await fetch(req);
    } catch (error){
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(OFFLINE_URL);
        return cachedResponse;
    }
}

self.addEventListener("install", (event) => {
    event.waitUntil( cacheOffline () );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(deleteOldCache());
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    if (event.request.mode === "navigate"){
        event.respondWith(onlineOrOffline(event.request));
    }
});