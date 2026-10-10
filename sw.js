const V='rm-v3',CDN=['https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js','https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js'],CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(async c=>{await c.addAll(CORE);await Promise.all(CDN.map(u=>c.add(u).catch(()=>{})))}).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.pathname.includes('/api/'))return;
 const keep=res=>{if(res.ok&&(u.origin===location.origin||u.hostname==='cdn.jsdelivr.net')){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res};
 if(r.mode==='navigate')e.respondWith(fetch(r).then(keep).catch(()=>caches.match('./index.html')));
 else e.respondWith(caches.match(r).then(h=>h||fetch(r).then(keep)))});
