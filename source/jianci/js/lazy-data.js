/* 简词 · 全量词库按需加载器
 * 大词库（考研/六级大纲、托福）不随页面启动加载，
 * 在需要时动态注入 <script>，只加载一次并缓存 Promise。 */
(function () {
  "use strict";

  var BASE = "js/data/";
  var FILES = {
    "kaoyan-full": "kaoyan-full.js",
    "cet6-full": "cet6-full.js",
    "toefl": "toefl.js"
  };

  var pending = {};

  /** 该词库数据是否已就绪 */
  function loaded(key) {
    var d = window.WORDBOOK_DATA || {};
    return Array.isArray(d[key]) && d[key].length > 0;
  }

  /** 按需加载某个词库；成功后通知 store 重建索引 */
  function load(key) {
    if (loaded(key)) return Promise.resolve(true);
    if (!FILES[key]) return Promise.resolve(false);
    if (pending[key]) return pending[key];
    pending[key] = new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = BASE + FILES[key];
      s.onload = function () {
        if (loaded(key)) {
          try {
            if (window.JC_STORE && window.JC_STORE.refreshIndex) window.JC_STORE.refreshIndex();
          } catch (e) { /* 忽略索引刷新失败 */ }
          resolve(true);
        } else {
          reject(new Error("词库文件内容异常"));
        }
      };
      s.onerror = function () {
        delete pending[key];
        reject(new Error("词库下载失败，请检查网络"));
      };
      document.head.appendChild(s);
    });
    return pending[key];
  }

  window.JC_LAZY = {
    load: load,
    loaded: loaded,
    KEYS: Object.keys(FILES)
  };
})();
