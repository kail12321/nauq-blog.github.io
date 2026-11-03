/*!
 * 样式表体检：页面用到的 class 是否都写了样式、样式里有没有已经没人用的 class
 * 用法：node tools/validate-css.cjs
 */
"use strict";

var fs = require("fs");
var path = require("path");
var ROOT = path.join(__dirname, "..");

var css = fs.readFileSync(path.join(ROOT, "assets", "style.css"), "utf8");
var html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
var app = fs.readFileSync(path.join(ROOT, "js", "app.js"), "utf8");

/* ---------- 页面里用到的 class ---------- */
var used = {}; // 宽松：出现的类名（含动态拼接），用于「样式没人用」
var strict = {}; // 严格：静态写法，用于「用了却没写样式」
function markUsed(name) {
  if (name && /^[a-zA-Z][\w-]*$/.test(name)) used[name] = (used[name] || 0) + 1;
}
function markStrict(name) {
  markUsed(name);
  if (name && /^[a-zA-Z][\w-]*$/.test(name)) strict[name] = (strict[name] || 0) + 1;
}

[html, app].forEach(function (src) {
  var m;
  // 严格：class="a b" 里没有拼接
  var reStrict = /class="([^"'\+]*)"/g;
  while ((m = reStrict.exec(src))) {
    m[1].split(/\s+/).forEach(markStrict);
  }
  // 宽松：把拼接里的 JS 片段也收进来，只为让动态类名不被误判成「没人用」
  var reLoose = /class="([^"]*)"/g;
  while ((m = reLoose.exec(src))) {
    m[1].split(/[^A-Za-z0-9_-]+/).forEach(markUsed);
  }
  var re2 = /classList\.(?:add|remove|toggle)\(\s*"([^"]+)"|className\s*=\s*"([^"]+)"/g;
  while ((m = re2.exec(src))) {
    (m[1] || m[2]).split(/\s+/).forEach(markStrict);
  }
});

// 动态拼出来的类名（class="tag t-' + kind"）单独列出，避免误判为「未使用」
var dynamic = ["t-prefix", "t-root", "t-suffix", "k-prefix", "k-root", "k-suffix", "prefix", "root", "suffix", "learned"];
dynamic.forEach(function (n) {
  used[n] = used[n] || 0;
});

/* ---------- 样式里定义的 class ---------- */
var defined = {};
var reCss = /\.([a-zA-Z][\w-]*)/g;
var mc;
while ((mc = reCss.exec(css))) defined[mc[1]] = 1;

/* ---------- 比对 ---------- */
var missing = Object.keys(strict).filter(function (c) {
  return !defined[c];
});
var unused = Object.keys(defined).filter(function (c) {
  return !used[c];
});

console.log("用到的 class " + Object.keys(used).length + " 个，样式里定义 " + Object.keys(defined).length + " 个");

if (missing.length) {
  console.log("\n✗ 用了但没写样式（会导致没样式）：");
  missing.sort().forEach(function (c) {
    console.log("    ." + c + "  （用了 " + used[c] + " 次）");
  });
} else {
  console.log("✓ 没有「用了却没样式」的 class");
}

if (unused.length) {
  console.log("\n提示：样式里定义了但页面没用到（可能是残留，也可能是动态拼的）：");
  unused.sort().forEach(function (c) {
    console.log("    ." + c);
  });
} else {
  console.log("✓ 没有多余的样式");
}

process.exit(missing.length ? 1 : 0);