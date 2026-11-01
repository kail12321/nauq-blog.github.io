/* global hexo */
'use strict';

/*
 * Shoka 的资源路径修正
 *
 * 原主题用 `${statics}${css}/...` 和 `statics + img` 拼路径：
 *   statics: '/'  → '//css/app.css'、'//assets/x.jpg'（协议相对地址，指向错误主机）
 *   statics: ''   → 'nullcss/app.css'（字面量 null）
 * 两种都不可用，因此这里重新注册同名 helper 覆盖掉它们，
 * 统一用 Hexo 的 url_for 处理，保证在根域名和子路径部署下都正确。
 */

const { htmlTag } = require('hexo-util');
const theme_env = require('../package.json');

const ROOT = () => hexo.config.root || '/';

/** 把主题内的相对资源路径转成站点内的绝对路径 */
function assetUrl(path) {
  const root = ROOT().replace(/\/+$/, '');
  const clean = String(path || '').replace(/^\/+/, '');
  return `${root}/${clean}`;
}

hexo.extend.helper.register('_css', function (...urls) {
  const { css } = hexo.theme.config;
  return urls
    .map(url => htmlTag('link', {
      rel: 'stylesheet',
      href: assetUrl(`${css}/${url}`) + `?v=${theme_env.version}`,
    }))
    .join('');
});

hexo.extend.helper.register('_js', function (...urls) {
  const { js } = hexo.theme.config;
  return urls
    .map(url => htmlTag('script', { src: assetUrl(`${js}/${url}`) + `?v=${theme_env.version}` }, ''))
    .join('');
});

hexo.extend.helper.register('_image_url', function (img, path = '') {
  if (!img) return '';

  // 外链原样返回
  if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('//')) {
    return img;
  }

  return assetUrl(img);
});

/*
 * 覆盖 _cover：原实现依赖 randomBG / _image_url，
 * 在 statics 被改成 '/' 时会产出 '//assets/xxx.jpg' 这种协议相对地址，
 * 浏览器会把它解析成 http://assets/xxx.jpg 而 404。
 */
hexo.extend.helper.register('_cover', function (item, num) {
  const { image_server, image_list } = hexo.theme.config;

  if (item && item.cover) {
    return this._image_url(item.cover, item.path);
  }
  if (item && item.photos && item.photos.length > 0) {
    return this._image_url(item.photos[0], item.path);
  }

  // 随机背景：image_list 里已是绝对地址，直接用
  const list = (image_list || []).filter(Boolean);
  if (!list.length) return '';

  if (image_server) {
    return `${image_server}?${Math.floor(Math.random() * 999999)}`;
  }

  if (num && num > 1) {
    const shuffled = list.slice().sort(() => Math.random() - 0.5);
    return shuffled.slice(0, num);
  }

  return list[Math.floor(Math.random() * list.length)];
});
