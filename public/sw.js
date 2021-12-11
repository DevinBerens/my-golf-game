const expectedCaches = ['mysite-static-v2'];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('mysite-static2').then(function(cache) {
      return cache.addAll([
        '../css/materialize.css',
        '../css/materialize.min.css',
        '../js/materialize.min.js',
        '../js/materialize.js',
        './index.html',
        './home.html',
        './recordStats.html',
        './viewStats.html'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('mysite-dynamic').then(function(cache) {
      return cache.match(event.request).then(function(response) {
        var fetchPromise = fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return response || fetchPromise;
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys.map(key => {
            if (!expectedCaches.includes(key)) {
              return caches.delete(key);
            }
          })
        )
      )
      .then(() => {
        console.log('V2 now ready to handle fetches!');
      })
  );
});
