// InroScan se mudó a https://inroprin-apps.github.io/InroScan/web/.
// Este trabajador reemplaza al de la app en los equipos que la abrieron (o la
// instalaron) en la dirección vieja: borra su copia local, se da de baja y
// recarga cada pestaña, que entonces cae en la página que redirige.
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (e) => {
  e.waitUntil(
    (async () => {
      await Promise.all((await caches.keys()).map((k) => caches.delete(k)));
      await self.registration.unregister();
      for (const c of await self.clients.matchAll({ type: "window" })) c.navigate(c.url);
    })(),
  );
});
