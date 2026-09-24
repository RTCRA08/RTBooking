/* RTCRA Booking — Service Worker */
const CACHE='rtcra-booking-v1';
const ASSETS=['./','./index.html','./config.js','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS).catch(()=>{})));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET')return;
  const url=new URL(req.url); if(url.origin!==self.location.origin)return;
  if(req.mode==='navigate'){e.respondWith(fetch(req).catch(()=>caches.match('./index.html')));}
  else{e.respondWith(caches.match(req).then(h=>h||fetch(req)));}
});
