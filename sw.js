const CACHE = "crypto-v2";

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      c.addAll([
        "./",
        "./index.html",
        "./manifest.json",
        "./bg.webp",
        "./app_icon.png",
        "./qr_code.png",
        "./icon-32.png",
        "./icon-192.png",
        "./icon-512.png"
      ])
    )
  );
});

self.addEventListener("fetch", e => {
  if (!e.request.url.startsWith(self.location.origin)) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
