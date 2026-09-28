const CACHE_NAME = "physics-applets-v5";
const APP_SHELL = [
  "index.html",
  "manifest.json",
  "assets/css/base.css",
  "assets/js/course-back.js",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "fys232-structure-of-matter/index.html",
  "fys240-optics/index.html",
  "fys240-optics/anaglyph-3d-viewer.html",
  "fys310-solid-state-physics/index.html",
  "fys310-solid-state-physics/FYS310_lattice_viewer.html",
  "fys310-solid-state-physics/van-hove-dos-explorer.html",
  "fys310-solid-state-physics/band-structure-explorer.html",
  "fys501-laser-physics/index.html",
  "finnmath-app/index.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const sameOrigin = new URL(event.request.url).origin === self.location.origin;
  const request = sameOrigin ? new Request(event.request, { cache: "no-cache" }) : event.request;
  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
