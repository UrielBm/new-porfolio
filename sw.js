const STATIC_CACHE = "static-v1";
const DYNAMIC_CACHE = "dynamic-v1";
const INMUTABLE_CACHE = "inmutable-v1";

const APP_SHELL = [
  // "/",
  "index.html",
  "index-en.html",
  "css/index.css",
  "js/index.js",
  "js/app.js",
  "assets/fonts/Bebas_Neue/BebasNeue-Regular.ttf",
  "assets/fonts/Bebas_Neue/BebasNeue-Regular.woff2",
  "assets/fonts/Montserrat/Montserrat.ttf",
  "assets/fonts/Montserrat/Montserrat.woff2",
  "assets/imgs/favico.ico",
  "assets/imgs/avatar.webp",
  "assets/imgs/avatar.avif",
  "assets/imgs/avatar.jpg",
  "assets/imgs/foto.webp",
  "assets/imgs/foto.avif",
  "assets/imgs/foto.jpg",
  "assets/imgs/proyecto_1_phone.webp",
  "assets/imgs/proyecto_1_phone.avif",
  "assets/imgs/proyecto_2_phone.webp",
  "assets/imgs/proyecto_2_phone.avif",
  "assets/imgs/proyecto_3_phone.webp",
  "assets/imgs/proyecto_3_phone.avif",
  "assets/imgs/proyecto_1_tablet.webp",
  "assets/imgs/proyecto_1_tablet.avif",
  "assets/imgs/proyecto_2_tablet.webp",
  "assets/imgs/proyecto_2_tablet.avif",
  "assets/imgs/proyecto_3_tablet.webp",
  "assets/imgs/proyecto_3_tablet.avif",
  "assets/imgs/proyecto_1.webp",
  "assets/imgs/proyecto_1.avif",
  "assets/imgs/proyecto_1.png",
  "assets/imgs/proyecto_2.webp",
  "assets/imgs/proyecto_2.avif",
  "assets/imgs/proyecto_2.png",
  "assets/imgs/proyecto_3.webp",
  "assets/imgs/proyecto_3.avif",
  "assets/imgs/proyecto_3.png",
  "assets/imgs/svgs/avatar.svg",
  "assets/imgs/svgs/bank.svg",
  "assets/imgs/svgs/code.svg",
  "assets/imgs/svgs/css.svg",
  "assets/imgs/svgs/express.svg",
  "assets/imgs/svgs/heart.svg",
  "assets/imgs/svgs/html.svg",
  "assets/imgs/svgs/idea.svg",
  "assets/imgs/svgs/institute.svg",
  "assets/imgs/svgs/js.svg",
  "assets/imgs/svgs/mongodb.svg",
  "assets/imgs/svgs/node.svg",
  "assets/imgs/svgs/portfolio.svg",
  "assets/imgs/svgs/react.svg",
  "assets/imgs/svgs/socket.svg",
];
const APP_SHELL_INMUTABLE = [];

self.addEventListener("install", (e) => {
  const cacheStatic = caches
    .open(STATIC_CACHE)
    .then((cache) => cache.addAll(APP_SHELL));

  const cacheInmutable = caches
    .open(INMUTABLE_CACHE)
    .then((cache) => cache.addAll(APP_SHELL_INMUTABLE));

  e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});

self.addEventListener("activate", (e) => {
  const respuesta = caches.keys().then((keys) => {
    keys.forEach((key) => {
      if (key !== STATIC_CACHE && key.includes("static")) {
        return caches.delete(key);
      }

      if (key !== DYNAMIC_CACHE && key.includes("dynamic")) {
        return caches.delete(key);
      }
    });
  });

  e.waitUntil(respuesta);
});

self.addEventListener("fetch", (e) => {
  const respuesta = caches.match(e.request).then((res) => {
    if (res) {
      return res;
    } else {
      return fetch(e.request).then((newRes) => {
        if (newRes.ok) {
          return caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(e.request, newRes.clone());

            return newRes.clone();
          });
        } else {
          return newRes;
        }
      });
    }
  });

  e.respondWith(respuesta);
});
