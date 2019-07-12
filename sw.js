const staticCacheName = 'site-static';
const assets = [
    '/',
    '/Pages/index.html',
    '/css/styles.css',
    '/img/resort1.jpg',
    '/img/resort2.jpg',
    '/img/resort3.jpg',
    '/img/icons/app-icon-96.png',
    '/js/app.js',
    'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://kit.fontawesome.com/2ebefe45bb.js',
    'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
    'https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE',
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
});

// fetch event
self.addEventListener('fetch', evt =>{
    //console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    )
});