/*!
 * 词根词缀库校验：字段、唯一性、重复拼写、例词自证，以及「在真实词书上的拆解效果」
 * 用法：node tools/validate-morph.cjs
 */
"use strict";

var path = require("path");
var ROOT = path.join(__dirname, "..");

var FILES = ["morph-prefix", "morph-suffix", "morph-root-a", "morph-root-m"];
var WORDBOOKS = ["kaoyan", "cet6", "ielts"];

var bad = 0;
var warn = 0;
var notes = [];

function err(msg) {
  bad++;
  console.log("  ✗ " + msg);
}
function warnOf(msg) {
  warn++;
  notes.push(msg);
}
function okLine(msg) {
  console.log("  ✓ " + msg);
}

/* ---------- 1. 载入 ---------- */
var all = [];
var byId = {};
var byForm = {};
function addEntry(e, file) {
  all.push(e);
  if (byId[e.id]) err("id 重复：" + e.id + "（" + file + " 与 " + byId[e.id].file + "）");
  else byId[e.id] = { file: file, entry: e };
  (e.forms || []).forEach(function (f) {
    var key = e.kind + ":" + f;
    if (byForm[key]) warnOf("拼写撞车：" + e.kind + " " + f + " 同时属于 " + byForm[key].id + " 和 " + e.id);
    else byForm[key] = e;
  });
}

FILES.forEach(function (name) {
  var p = path.join(ROOT, "js", "data", name + ".js");
  var list;
  try {
    list = require(p);
  } catch (e) {
    err("读不到 " + name + ".js：" + e.message);
    return;
  }
  if (!Array.isArray(list) || !list.length) {
    err(name + ".js 没有导出数组");
    return;
  }
  list.forEach(function (e) {
    addEntry(e, name);
  });
});
if (bad) {
  console.log("\n数据都没读全，先修上面的问题。");
  process.exit(1);
}
okLine("载入 " + all.length + " 条词素（" + FILES.join(" / ") + "）");

/* ---------- 2. 字段 ---------- */
var kinds = { prefix: 0, root: 0, suffix: 0 };
all.forEach(function (e) {
  var where = e.id || "(无 id)";
  if (!e.id || typeof e.id !== "string") err("缺 id：" + JSON.stringify(e).slice(0, 60));
  if (!kinds.hasOwnProperty(e.kind)) err(where + " 的 kind 非法：" + e.kind);
  else kinds[e.kind]++;
  if (!e.text || typeof e.text !== "string") err(where + " 缺 text");
  if (!e.meaning || typeof e.meaning !== "string") err(where + " 缺 meaning");
  if (typeof e.note !== "string") err(where + " 缺 note");
  if (!Array.isArray(e.forms) || !e.forms.length) err(where + " 缺 forms");
  else {
    e.forms.forEach(function (f) {
      if (typeof f !== "string" || !/^[a-z]{1,10}$/.test(f)) err(where + " 的 form 不合法：" + JSON.stringify(f));
    });
  }
  if (!Array.isArray(e.examples) || e.examples.length < 2) err(where + " 例词少于 2 个");
  else {
    var good = e.examples.some(function (ex) {
      return (e.forms || []).some(function (f) {
        return String(ex).toLowerCase().indexOf(f) >= 0;
      });
    });
    if (!good) err(where + " 的例词没有一个包含它的拼写：" + e.examples.join(","));
  }
});
okLine("字段检查完成：前缀 " + kinds.prefix + " · 词根 " + kinds.root + " · 后缀 " + kinds.suffix);

/* ---------- 3. 例词位置方向 ---------- */
all.forEach(function (e) {
  if (!Array.isArray(e.examples)) return;
  e.examples.forEach(function (ex) {
    var w = String(ex).toLowerCase();
    var hit = (e.forms || []).filter(function (f) {
      return w.indexOf(f) >= 0;
    });
    if (!hit.length) return;
    if (e.kind === "prefix" && !hit.some(function (f) { return w.indexOf(f) === 0; })) {
      err(e.id + " 的前缀例词 " + ex + " 不是以它的拼写开头");
    }
    if (e.kind === "suffix" && !hit.some(function (f) { return w.slice(-f.length) === f; })) {
      err(e.id + " 的后缀例词 " + ex + " 不是以它的拼写结尾");
    }
  });
});
okLine("例词位置检查完成（前缀在词首 / 后缀在词尾）");

/* ---------- 4. 真实拆解效果 ---------- */
var MORPH = require(path.join(ROOT, "js", "morph.js"));
var words = [];
WORDBOOKS.forEach(function (b) {
  require(path.join(ROOT, "js", "data", b + ".js")).forEach(function (w) {
    if (w && w.word) words.push(w);
  });
});

var perfect = 0;
var partial = 0;
var none = 0;
var samples = [];
words.forEach(function (w) {
  var a = MORPH.analyze(w.word, all);
  if (!a.parts.length) {
    none++;
    return;
  }
  if (a.complete) perfect++;
  else partial++;
  if (samples.length < 14) samples.push("    " + (w.word + "                ").slice(0, 16) + a.line);
});

var covered = perfect + partial;
console.log("\n  在 " + words.length + " 个内置词上的表现：");
console.log("    完整拆解 " + perfect + " · 部分拆解 " + partial + " · 拆不出 " + none +
  "（可拆出 " + Math.round((covered / words.length) * 100) + "%）");
console.log(samples.join("\n"));

/* ---------- 5. 反查索引 ---------- */
var idx = MORPH.reverseIndex(words, all);
var used = Object.keys(idx).length;
var top = Object.keys(idx)
  .map(function (k) {
    return { id: k, n: idx[k].words.length };
  })
  .sort(function (a, b) {
    return b.n - a.n || (a.id < b.id ? -1 : 1);
  })
  .slice(0, 8)
  .map(function (x) {
    return byId[x.id].entry.text + "(" + x.n + ")";
  });
okLine("有 " + used + "/" + all.length + " 条词素在词书里找到了词；最活跃：" + top.join("、"));

/* ---------- 6. 结果 ---------- */
if (notes.length) {
  console.log("\n  提示（不算失败）：");
  notes.slice(0, 10).forEach(function (n) {
    console.log("    · " + n);
  });
  if (notes.length > 10) console.log("    · 另有 " + (notes.length - 10) + " 条同类提示");
}
if (bad) {
  console.log("\n✗ 词根词缀库有 " + bad + " 处错误");
  process.exit(1);
}
console.log("\n✓ 词根词缀库校验通过（" + all.length + " 条，警告 " + warn + " 处）");