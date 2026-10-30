/* Service worker di Lumen dei Morti: tutto in cache, il gioco funziona offline. */
const CACHE='lumen-8187dedeb3';
const FILES=["./", "index.html", "manifest.webmanifest", "fonts/fonts.css", "fonts/im-fell-english-sc-latin-400-normal.woff2", "fonts/im-fell-english-latin-400-normal.woff2", "fonts/im-fell-english-latin-400-italic.woff2", "fonts/eb-garamond-latin-400-normal.woff2", "fonts/eb-garamond-latin-ext-400-normal.woff2", "fonts/eb-garamond-latin-500-normal.woff2", "fonts/eb-garamond-latin-ext-500-normal.woff2", "fonts/eb-garamond-latin-600-normal.woff2", "fonts/eb-garamond-latin-ext-600-normal.woff2", "fonts/eb-garamond-latin-400-italic.woff2", "fonts/eb-garamond-latin-ext-400-italic.woff2", "fonts/pixelify-sans-latin-500-normal.woff2", "fonts/pixelify-sans-latin-ext-500-normal.woff2", "fonts/pixelify-sans-latin-700-normal.woff2", "fonts/pixelify-sans-latin-ext-700-normal.woff2", "icons/icon-1024.png", "icons/maskable-512.png", "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{
    if(res.ok&&new URL(e.request.url).origin===location.origin){const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp))}
    return res;
  }).catch(()=>caches.match('index.html'))));
});
