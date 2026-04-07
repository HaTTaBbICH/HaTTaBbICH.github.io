const CACHE = "crypto-v2";

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      c.addAll([
        "./",
        "./index.html"
      ])
    )
  );
});

self.addEventListener("fetch", e => {
  // ❗ НЕ трогаем внешние запросы (google, api и т.д.)
  if (!e.request.url.startsWith(self.location.origin)) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
