const staticCasheName = "s-app-v1";
const dynamicCacheName = "d-app-v1";

const assetsUrls = [
  "index.html",
  "offline.html",
  "./../src/index.js",
  "./../src/index.css",
  "./../src/App.css",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(staticCasheName).then((cache) => cache.addAll(assetsUrls))
  );
});
self.addEventListener("activate", async (event) => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames
      .filter((name) => name !== staticCasheName)
      .filter((name) => name !== dynamicCacheName)
      .map((name) => caches.delete(name))
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (url.origin === location.origin) {
    event.respondWith(casheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});
async function casheFirst(request) {
  const cached = await caches.match(request);
  return cached ?? (await fetch(request));
}
async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName);
  try {
    const responce = await fetch(request);
    cache.put(request, responce.clone());
  } catch (e) {
    const cached = await cache.match(request);
    return cached ?? (await caches.match("./offline.html"));
  }
}
