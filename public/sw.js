self.addEventListener("install", function (evt) {
  console.log("The service worker is being installed.");
  evt.waitUntil(
    caches.open("mysite-dynamic").then(function (cache) {
      cache.addAll(["/"]);
    })
  );
});
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.open("mysite-dynamic").then(function (cache) {
      return cache.match(event.request).then(function (response) {
        var fetchPromise = fetch(event.request).then(function (
          networkResponse
        ) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return response || fetchPromise;
      });
    })
  );
});
{
}
