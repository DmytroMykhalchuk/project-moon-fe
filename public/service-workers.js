const staticCasheName = "s-app-v2";
const dynamicCacheName = "d-app-v2";

const assetsUrls = [
  "index.html",
  "offline.html",
  "./../src/index.js",
  "./../src/index.css",
  "./../src/App.css",
];

self.addEventListener("install", async (event) => {
  const cache = await caches.open(staticCasheName);
  await cache.addAll(assetsUrls);
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
  // if (!(event.request.url.indexOf('chr') === 0))
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  return cached ?? (await fetch(request));
}

async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());
    return response;
  } catch (e) {
    const cached = await cache.match(request);
    //  return cached ?? await caches.match('/offline.html')
    return cached ?? null;
  }
}
