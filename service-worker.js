const CACHE_NAME = "ong-esperanca-shell-v7";
const APP_FILES = [
  "index.html",
  "cadastro.html",
  "projetos.html",
  "css/style.css",
  "js/app.js",
  "js/templates/projects.js",
  "js/templates/volunteer.js",
  "js/modules/storage.js",
  "js/modules/validation.js",
  "js/modules/volunteer-form.js",
  "imagens/Img1.webp",
  "imagens/Img1-400.webp",
  "imagens/Img1-768.webp",
  "imagens/Img2.webp",
  "imagens/Img2-400.webp",
  "imagens/Img3.webp",
  "imagens/Img3-400.webp",
  "imagens/Img3-768.webp",
  "imagens/Img4.webp",
  "imagens/Img4-400.webp",
];

const appUrl = (file) => new URL(file, self.registration.scope).href;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_FILES.map(appUrl)))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith("ong-esperanca-") && cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

  if (event.request.method !== "GET" || requestUrl.origin !== self.location.origin) {
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(event.request);
          if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(appUrl("index.html"), response.clone());
          }
          return response;
        } catch (error) {
          const cache = await caches.open(CACHE_NAME);
          const cachedPage = await cache.match(appUrl("index.html"));
          if (cachedPage) {
            return cachedPage;
          }
          throw error;
        }
      })()
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME)
      .then((cache) => cache.match(event.request))
      .then((cachedResponse) => cachedResponse || fetch(event.request))
  );
});
