// Service Worker Otimizado - Portal do Professor v2.0
// Cache Strategy: Cache First para recursos estáticos, Network First para HTML

const CACHE_NAME = 'prof-vrijo-v2.1.6';
const STATIC_CACHE = 'static-v2.1.6';
const DYNAMIC_CACHE = 'dynamic-v2.1.6';

// Recursos estáticos essenciais (cache imediato)
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/assets/css/style.css',
  '/assets/js/app.js',
  '/assets/images/logo.png',
  '/assets/images/logo.webp',
  '/assets/images/icons/favicon.ico',
  '/assets/images/icons/icon-192.png',
  '/assets/images/icons/icon-512.png',
  '/manifest.json',
  '/ofline.html'
];

// Recursos externos para cache
const EXTERNAL_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;700;900&display=swap',
  'https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;700;900&display=swap'
];

// Instalação otimizada
self.addEventListener('install', event => {
  console.log('🔄 Service Worker: Instalando...');
  
  event.waitUntil(
    Promise.all([
      // Cache de recursos estáticos
      caches.open(STATIC_CACHE).then(cache => {
        console.log('📦 Cacheando recursos estáticos...');
        return cache.addAll(STATIC_ASSETS);
      }),
      
      // Cache de recursos externos
      caches.open(DYNAMIC_CACHE).then(cache => {
        console.log('🌐 Cacheando recursos externos...');
        return cache.addAll(EXTERNAL_ASSETS);
      })
    ]).then(() => {
      console.log('✅ Service Worker: Instalação concluída');
      return self.skipWaiting();
    }).catch(error => {
      console.error('❌ Erro na instalação:', error);
    })
  );
});

// Ativação com limpeza inteligente
self.addEventListener('activate', event => {
  console.log('🚀 Service Worker: Ativando...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Remove caches antigos
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('🗑️ Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker: Ativação concluída');
      return self.clients.claim();
    })
  );
});

// Estratégia de fetch otimizada
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignora requisições não-GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Ignora requisições de analytics, tracking, etc.
  if (url.pathname.includes('analytics') || 
      url.pathname.includes('tracking') ||
      url.pathname.includes('beacon')) {
    return;
  }
  
  // Estratégia para recursos estáticos (CSS, JS, imagens)
  if (isStaticAsset(request)) {
    event.respondWith(cacheFirst(request));
    return;
  }
  
  // Estratégia para HTML (sempre busca na rede primeiro)
  if (request.destination === 'document') {
    event.respondWith(networkFirst(request));
    return;
  }
  
  // Estratégia para recursos externos
  if (isExternalResource(request)) {
    event.respondWith(cacheFirst(request));
    return;
  }
  
  // Fallback: busca na rede
  event.respondWith(fetch(request).catch(() => {
    return caches.match('/ofline.html');
  }));
});

// Função para identificar recursos estáticos
function isStaticAsset(request) {
  const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.webp', '.ico', '.svg', '.woff', '.woff2'];
  const url = request.url.toLowerCase();
  
  return staticExtensions.some(ext => url.includes(ext)) ||
         url.includes('/assets/') ||
         url.includes('/manifest.json');
}

// Função para identificar recursos externos
function isExternalResource(request) {
  return request.url.includes('cdnjs.cloudflare.com') ||
         request.url.includes('fonts.googleapis.com') ||
         request.url.includes('fonts.gstatic.com');
}

// Estratégia Cache First (para recursos estáticos)
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.warn('⚠️ Erro no cache first:', error);
    return new Response('', { status: 404 });
  }
}

// Estratégia Network First (para HTML)
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn('⚠️ Rede indisponível, usando cache:', error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return caches.match('/ofline.html');
  }
}

// Limpeza automática de cache (a cada 7 dias)
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAN_CACHE') {
    cleanOldCaches();
  }
});

// Função de limpeza de cache
async function cleanOldCaches() {
  try {
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(name => 
      name !== STATIC_CACHE && name !== DYNAMIC_CACHE
    );
    
    await Promise.all(
      oldCaches.map(name => caches.delete(name))
    );
    
    console.log('🧹 Cache limpo com sucesso');
  } catch (error) {
    console.error('❌ Erro ao limpar cache:', error);
  }
}

console.log('🚀 Service Worker: Carregado e pronto!');