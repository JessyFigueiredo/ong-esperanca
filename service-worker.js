const CACHE_NAME = "ong-esperanca-shell-v3";
const APP_FILES = [
  "index.html",
  "cadastro.html",
  "projetos.html",
  "css/style.css",
  "js/app.js",
  "js/templates.js",
  "js/modules/storage.js",
  "js/modules/validation.js",
  "js/modules/volunteer-form.js",
  "imagens/Img1.jpg",
  "imagens/Img2.jpg",
  "imagens/Img3.jpg",
  "imagens/Img4.jpg",
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
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const responseCopy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(appUrl("index.html"), responseCopy));
          }
          return response;
        })
        .catch(async () => {
          const cachedPage = await caches.match(appUrl("index.html"));
          if (cachedPage) {
            return cachedPage;
          }
          throw new Error("A página ainda não foi armazenada para uso offline.");
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => cachedResponse || fetch(event.request))
  );
});
