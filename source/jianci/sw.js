/* ===========================================================
   简词 JianCi · Service Worker
   策略：核心资源预缓存；页面导航网络优先；
        其余静态资源缓存优先 + 后台更新（stale-while-revalidate）。
   更新站点时把 VERSION 号 +1 即可让所有客户端换新缓存。
   =========================================================== */
var VERSION = "jianci-v2";

var CORE = [
  "./index.html",
  "assets/style.css",
  "manifest.json",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/icons/icon-maskable-512.png",
  "assets/icons/apple-touch-icon.png",
  "js/lazy-data.js",
  "js/srs.js",
  "js/morph.js",
  "js/store.js",
  "js/rank.js",
  "js/app.js",
  "js/data/kaoyan.js",
  "js/data/cet6.js",
  "js/data/ielts.js",
  "js/data/morph-prefix.js",
  "js/data/morph-suffix.js",
  "js/data/morph-root-a.js",
  "js/data/morph-root-m.js"
];

/* 以 SW 所在目录为基准解析相对路径（主站 /jianci/ 与博客副本均可用） */
function toUrl(u) { return new URL(u, self.registration.scope).toString(); }

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(VERSION).then(function (c) {
      return c.addAll(CORE.map(toUrl));
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== VERSION) return caches.delete(k);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;

  var url = new URL(req.url);
  if (url.origin !== location.origin) return; // 云端评论区/排行榜 iframe 不拦截

  /* 页面导航：网络优先，离线回退到缓存页 */
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(VERSION).then(function (c) { c.put(toUrl("./index.html"), copy); });
        return res;
      }).catch(function () {
        return caches.match(toUrl("./index.html"));
      })
    );
    return;
  }

  /* 静态资源（含按需词库）：缓存优先，命中后仍拉新版本回填 */
  e.respondWith(
    caches.match(req).then(function (hit) {
      var net = fetch(req).then(function (res) {
        if (res && res.status === 200 && res.type === "basic") {
          var copy = res.clone();
          caches.open(VERSION).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () { return hit; });
      return hit || net;
    })
  );
});
