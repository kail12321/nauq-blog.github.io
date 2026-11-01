/* global hexo */
'use strict';

/*
 * 看板娘（Live2D 桌宠）注入
 *
 * 用 after_render:html 过滤器注入，不改主题源码，升级 Shoka 不会丢。
 *
 * 关键点（都是踩过的坑）：
 * 1. live2d-widget 会按 config.name.div（默认 "live2d-widget"）查找旧节点并
 *    直接 removeChild 后重建。若模板里预先放同名 div，会和它互相删除，
 *    页面里出现两个同 id 节点、canvas 反而不显示。所以容器 id 必须自定义。
 * 2. 该库依赖 WebGL；无 WebGL 时只打 console.error 然后静默不渲染。
 *    因此无 WebGL / 移动端 / 减少动效偏好下直接不加载，避免出现空框。
 */

const JS_PATH = 'js/live2d/L2Dwidget.min.js';
const MODEL_PATH = 'live2d/shizuku/shizuku.model.json';

const TEMPLATE = `
<div id="waifu-root" aria-hidden="true">
  <div id="waifu-close" title="收起看板娘">×</div>
</div>
<script>
(function () {
  var ROOT = 'waifu-root';
  var STORE = 'waifu-hidden';

  function root() { return document.getElementById(ROOT); }

  function setHidden(hide) {
    var el = root();
    if (!el) return;
    el.classList.toggle('is-hidden', hide);
    try { localStorage.setItem(STORE, hide ? '1' : '0'); } catch (e) {}
  }

  function boot() {
    if (typeof window.L2Dwidget === 'undefined') return;
    var el = root();
    if (!el || el.dataset.ready === '1') return;

    window.L2Dwidget.init({
      model: { jsonPath: '{{MODEL}}', scale: 1 },
      // name.div 必须与模板容器不同，否则会被库删掉
      name: { div: 'waifu-live2d', canvas: 'waifu-canvas' },
      display: {
        position: 'right',
        width: 180,
        height: 320,
        hOffset: 0,
        vOffset: -12
      },
      mobile: { show: false, scale: 0.5 },
      react: { opacityDefault: 0.92, opacityOnHover: 1 },
      dev: { border: false }
    });

    el.dataset.ready = '1';

    // 库在拿不到 WebGL 时只打 console.error 然后静默放弃，
    // 这里兜底：初始化后若始终没有 canvas，就把空框收起来。
    setTimeout(function () {
      if (!document.getElementById('waifu-canvas')) {
        el.classList.add('is-hidden');
      }
    }, 6000);
  }

  function loadScript() {
    if (window.__waifuLoading) return;
    window.__waifuLoading = true;
    var s = document.createElement('script');
    s.src = '{{JS}}';
    s.onload = boot;
    s.onerror = function () {
      var el = root();
      if (el) el.classList.add('is-hidden');
    };
    document.head.appendChild(s);
  }

  // 小屏不加载，省流量也避免遮挡
  if (window.innerWidth < 992) {
    var e0 = root();
    if (e0) e0.remove();
    return;
  }
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var e1 = root();
    if (e1) e1.remove();
    return;
  }

  var btn = document.getElementById('waifu-close');
  if (btn) btn.addEventListener('click', function () { setHidden(true); });

  try {
    if (localStorage.getItem(STORE) === '1') {
      var e2 = root();
      if (e2) e2.classList.add('is-hidden');
    }
  } catch (e) {}

  if (window.L2Dwidget) boot(); else loadScript();

  document.addEventListener('pjax:complete', boot);
  document.addEventListener('pjax:end', boot);
})();
</script>
<style>
#waifu-root {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 180px;
  height: 320px;
  z-index: 880;
  pointer-events: none;
}
#waifu-root.is-hidden { display: none !important; }
#waifu-root #waifu-close {
  position: absolute;
  right: 8px;
  top: 2px;
  width: 20px;
  height: 20px;
  line-height: 18px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  background: rgba(239, 111, 155, .72);
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
  opacity: 0;
  transition: opacity .25s;
  z-index: 3;
}
#waifu-root:hover #waifu-close { opacity: 1; }
@media (max-width: 991px) {
  #waifu-root { display: none !important; }
}
</style>
`;

hexo.extend.filter.register('after_render:html', function (str) {
  if (!str.includes('</body>')) return str;

  const root = (hexo.config.root || '/').replace(/\/+$/, '');
  const url = p => `${root}/${String(p).replace(/^\/+/, '')}`;

  const html = TEMPLATE
    .replace(/\{\{JS\}\}/g, url(JS_PATH))
    .replace(/\{\{MODEL\}\}/g, url(MODEL_PATH));

  return str.replace('</body>', html + '</body>');
});
