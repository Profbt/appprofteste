const CACHE_NAME = 'prof-vrijo-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/style.css',
  '/assets/js/app.js',
  '/assets/js/splash.js',
  '/assets/images/logo.png',
  '/assets/images/splash.jpg',
  '/assets/images/icons/icon-192.png',
  '/assets/images/icons/icon-512.png',
  '/ofline.html',
  // Adicione outros arquivos essenciais se necessário
];

// Instalação: cache dos arquivos essenciais
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Ativação: limpeza de caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Estratégia: HTML sempre network first, estáticos cache first
self.addEventListener('fetch', event => {
  const req = event.request;
  const isHtml = req.headers.get('accept')?.includes('text/html');
  if (isHtml) {
    // Network first para HTML
    event.respondWith(
      fetch(req)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          return response;
        })
        .catch(() => caches.match(req).then(r => r || caches.match('/ofline.html')))
    );
  } else {
    // Cache first para estáticos
    event.respondWith(
      caches.match(req).then(response => {
        return response || fetch(req).then(networkResp => {
          // Atualiza cache para imagens e scripts
          if (req.url.match(/\.(js|css|png|jpg|jpeg|webp|svg|ico)$/)) {
            const copy = networkResp.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          }
          return networkResp;
        });
      }).catch(() => caches.match('/ofline.html'))
    );
  }
});