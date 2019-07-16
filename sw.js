const staticCacheName = 'site-static-v2';
const assets = [
    '/Pages/index.html',
    '/css/styles.css',
    '/img/resort1.jpg',
    '/img/resort2.jpg',
    '/img/resort3.jpg',
    '/img/icons/app-icon-96.png',
    '/js/app.js',
    '/Pages/fallback.html',
    'https://source.unsplash.com/1600x900/?beach',
    'https://source.unsplash.com/1600x900/?nature',
    'https://source.unsplash.com/1600x900/?beach,tavel',
    'https://source.unsplash.com/1600x900/?water',
    'https://source.unsplash.com/1600x900/?building',
    'https://source.unsplash.com/1600x900/?trees',
    'https://source.unsplash.com/1600x900/?cruise',
    'https://source.unsplash.com/1600x900/?beaches',
    'https://source.unsplash.com/1600x900/?traveling',
    'https://source.unsplash.com/1600x900/?bridge',
    'https://source.unsplash.com/1600x900/?travel,boat',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
    'https://kit.fontawesome.com/2ebefe45bb.js',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js'
];

//install service worker
self.addEventListener('install', evt => {
    //console.log('service worker had been installed');
    evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
        console.log('caching shell assets');
        cache.addAll(assets);
        })
    );
});

//listen for activate event
self.addEventListener('activate', evt => {
    //console.log('service worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            //console.log(keys);
            return Promise.all(keys
             .filter(key => key !== staticCacheName)
             .map(key => caches.delete(key))
            )
        })
    );
});

// fetch event
self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request)
        }).catch(() => caches.match('/Pages/fallback.html'))
    )
});