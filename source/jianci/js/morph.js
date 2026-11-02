/*! 简词 JianCi · 词根词缀拆解引擎（纯函数，可在 node 里直接 require 测试） */
(function (root, factory) {
  var api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root) root.JC_MORPH = api;
})(typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : null, function () {
  "use strict";

  var MIN_RESIDUAL = 2; // 拆掉前缀后至少要剩几个字母（否则 uncle 会被拆成 un-）
  var MIN_ROOT = 3; // 词根至少 3 个字母
  var MIN_AFFIX = 1; // 后缀至少 1 个字母（-y 这类短后缀由词库自己决定）
  var MAX_ROOTS = 2; // 一个词最多认两个词根（如 auto + bio + graph）
  var RATIO = 0.6; // 裸词里的词根至少覆盖这么大比例，才认
  var OVERLAP = 2; // 词根与后缀最多允许重叠几个字母（bio + ology 的 o）

  // 拆了反而误导的词：要么本来就不是词根词缀结构（moreover / otherwise），
  // 要么词源和拼写对不上（academic 来自地名 Academy，不是 ad- + dem）。
  // 宁可不显示，也不给一个错的联想。
  var SKIP = {};
  (
    "uncle until unit union unique universe university upon upper ugly utter usual use user used " +
    "utensil utility month money monkey person season reason lesson orange difficult " +
    "moreover nevertheless otherwise thereby hence poverty climate cite bias digital density " +
    "conceal enormous academic abolish accomplish distinguish distinct contaminate detrimental " +
    "deteriorate despite eliminate empirical emission hypothesis integrate qualification therapy " +
    "criterion correlate mother translate relate"
  )
    .split(" ")
    .forEach(function (w) {
      SKIP[w] = 1;
    });

  var KIND_LABEL = { prefix: "前缀", root: "词根", suffix: "后缀" };

  function kindLabel(kind) {
    return KIND_LABEL[kind] || "词素";
  }

  function normalize(word) {
    return String(word == null ? "" : word)
      .toLowerCase()
      .replace(/[^a-z]/g, "");
  }

  /** 把词根词缀数据（{affix:[],rootA:[],rootM:[]}）摊平成一个数组 */
  function flatten(data) {
    if (!data) return [];
    if (data.length) return data.slice();
    var out = [];
    Object.keys(data).forEach(function (k) {
      if (data[k] && data[k].length) out = out.concat(data[k]);
    });
    return out;
  }

  /** 取出当前页面可用的词根词缀库（浏览器里读 window.MORPH_DATA） */
  function library(data) {
    if (data) return flatten(data);
    var g = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : null;
    return g && g.MORPH_DATA ? flatten(g.MORPH_DATA) : [];
  }

  /** 按 kind 建「拼写 → 条目」的索引，顺带按长度倒序排好，匹配时优先长词素 */
  function buildMaps(entries) {
    var maps = { prefix: {}, root: {}, suffix: {} };
    var lens = { prefix: [], root: [], suffix: [] };
    (entries || []).forEach(function (e) {
      if (!e || !e.forms || !e.kind || !maps[e.kind]) return;
      e.forms.forEach(function (f) {
        var key = normalize(f);
        if (!key) return;
        if (!maps[e.kind][key]) {
          maps[e.kind][key] = e;
          lens[e.kind].push(key.length);
        }
      });
    });
    ["prefix", "root", "suffix"].forEach(function (k) {
      lens[k] = lens[k].sort(function (a, b) {
        return b - a;
      });
    });
    return { maps: maps, lens: lens };
  }

  /** 词首最长匹配的前缀 */
  function matchPrefix(str, maps, lens) {
    for (var i = 0; i < lens.prefix.length; i++) {
      var len = lens.prefix[i];
      if (len < 1 || len > str.length - MIN_RESIDUAL) continue;
      var e = maps.prefix[str.slice(0, len)];
      if (e) return { entry: e, form: str.slice(0, len), index: 0 };
    }
    return null;
  }

  // 2 字母前缀里真正高信号的（不算「同化变体」，不做额外要求）
  var STRONG2 = "un re in im de di ex co bi en em il ir".split(" ");

  /** 同化变体之类 2 字母的前缀（ac-/af-/ap-/oc-/…），很容易误伤 academic 这种词 */
  function weakPrefix(form) {
    return form.length <= 2 && STRONG2.indexOf(form) < 0;
  }

  /** 词干开头有没有一个「像样的」词根（4 字母以上，或几乎覆盖整个词干） */
  function strongRootAt(str, maps, lens) {
    if (!str || str.length < MIN_ROOT) return false;
    for (var i = 0; i < lens.root.length; i++) {
      var len = lens.root[i];
      if (len < 4 || len > str.length) continue;
      if (maps.root[str.slice(0, len)]) return true;
    }
    return false;
  }

  /** 词尾最长匹配的后缀（至少给词干留 1 个字母） */
  function matchSuffix(str, maps, lens) {
    for (var i = 0; i < lens.suffix.length; i++) {
      var len = lens.suffix[i];
      if (len < MIN_AFFIX || len > str.length - 1) continue;
      var e = maps.suffix[str.slice(str.length - len)];
      if (e) return { entry: e, form: str.slice(str.length - len), index: str.length - len };
    }
    return null;
  }

  /**
   * 列出词干里所有「站得住脚」的词根候选，再按可信度排序：
   *   1) 紧贴词干开头（con + duct）—— 最可信，排最前
   *   2) 正好顶着后缀（geography 的 graph）
   *   3) 覆盖词干 60% 以上（animal = anim + al）
   *   4) 裸词里 4 字母以上、顶到词尾、覆盖 40% 以上（maintain 的 tain）
   * 其余一律不认，免得 person 里认出 son、crisis 里认出 ris。
   */
  function rootCandidates(str, maps, lens, hasAffix, sufStart) {
    var out = [];
    for (var i = 0; i < lens.root.length; i++) {
      var len = lens.root[i];
      if (len < MIN_ROOT || len > str.length) continue;
      for (var at = 0; at + len <= str.length; at++) {
        var form = str.slice(at, at + len);
        var entry = maps.root[form];
        if (!entry) continue;
        var end = at + len;
        var atStart = at === 0;
        var ratio = len / str.length;
        var exact = hasAffix && end === sufStart;
        var overlap = atStart && hasAffix && end >= sufStart && end <= sufStart + OVERLAP;
        var bare = !hasAffix && end === str.length && len >= 4 && ratio >= 0.4;
        if (!(atStart && hasAffix) && !exact && !overlap && !bare && !(ratio > RATIO)) continue;
        out.push({ entry: entry, form: form, index: at });
      }
    }
    out.sort(function (a, b) {
      if ((a.index === 0) !== (b.index === 0)) return a.index === 0 ? -1 : 1;
      if (a.form.length !== b.form.length) return b.form.length - a.form.length;
      return a.index - b.index;
    });
    return out;
  }

  /** 在词干里按可信度取最多两个不重叠的词根 */
  function matchRoots(str, maps, lens, hasAffix, sufStart) {
    var cands = rootCandidates(str, maps, lens, hasAffix, sufStart);
    var found = [];
    var used = [];
    for (var c = 0; c < cands.length && found.length < MAX_ROOTS; c++) {
      var cand = cands[c];
      var clash = false;
      for (var u = 0; u < used.length; u++) {
        if (cand.index < used[u].end && cand.index + cand.form.length > used[u].start) {
          clash = true;
          break;
        }
      }
      if (clash) continue;
      found.push(cand);
      used.push({ start: cand.index, end: cand.index + cand.form.length });
    }
    return found.sort(function (a, b) {
      return a.index - b.index;
    });
  }

  /** 还原可能的原形：produced → produce，studies → study，running → run */
  function lemmatize(word) {
    var w = normalize(word);
    var out = [];
    var push = function (x) {
      if (x && x.length >= 3 && x !== w && out.indexOf(x) < 0) out.push(x);
    };
    if (/ies$/.test(w)) push(w.slice(0, -3) + "y");
    if (/ied$/.test(w)) push(w.slice(0, -3) + "y");
    if (/es$/.test(w)) push(w.slice(0, -2));
    if (/ed$/.test(w)) {
      push(w.slice(0, -1)); // produced → produce（补回被吞掉的 e）
      push(w.slice(0, -2));
    }
    if (/ing$/.test(w)) {
      var b = w.slice(0, -3);
      if (/([bdfglmnprt])\1$/.test(b)) push(b.slice(0, -1)); // running → run
      push(b + "e");
      push(b);
    }
    if (/s$/.test(w)) push(w.slice(0, -1));
    return out;
  }

  /** 对单个原形做拆解 */
  function analyzeBase(base, maps, lens) {
    var prefix = matchPrefix(base, maps, lens);
    var afterPrefix = prefix ? base.slice(prefix.form.length) : base;
    var suffix = matchSuffix(afterPrefix, maps, lens);

    // 弱前缀（ac-/af-/ap- 这类同化变体）：后面必须紧跟一个像样的词根，否则宁可不拆
    // 例如 academic 不能被拆成 ac-(朝向) + dem(人民)
    if (prefix && weakPrefix(prefix.form)) {
      var mid = suffix ? afterPrefix.slice(0, afterPrefix.length - suffix.form.length) : afterPrefix;
      if (!strongRootAt(mid, maps, lens)) prefix = null;
    }

    var withPre = buildParts(base, maps, lens, prefix);
    // 词缀反而把词根吃掉了（emerge 的 em- 抢走 merg-；biography 的 bi- 抢走 bio-）：
    // 只要不要这个词缀能解释更多字母，就不要它
    if (prefix) {
      var without = buildParts(base, maps, lens, null);
      if (meaningful(without) && (!meaningful(withPre) || without.coverage > withPre.coverage)) return without;
    }
    return withPre;
  }

  /** 按给定的前缀拆一次，得出可展示的部件 */
  function buildParts(base, maps, lens, prefix) {
    var afterPrefix = prefix ? base.slice(prefix.form.length) : base;
    var suffix = matchSuffix(afterPrefix, maps, lens);
    var sufStart = suffix ? afterPrefix.length - suffix.form.length : afterPrefix.length;
    var roots = matchRoots(afterPrefix, maps, lens, !!(prefix || suffix), sufStart);

    var mask = [];
    var i;
    for (i = 0; i < afterPrefix.length; i++) mask[i] = false;
    var mark = function (from, len) {
      for (var k = from; k < from + len && k < mask.length; k++) mask[k] = true;
    };

    var parts = [];
    if (prefix) parts.push(makePart(prefix, "prefix"));
    roots.forEach(function (r) {
      parts.push(makePart(r, "root"));
      mark(r.index, r.form.length);
    });
    if (suffix) {
      parts.push(makePart(suffix, "suffix"));
      mark(sufStart, suffix.form.length);
    }

    var rest = "";
    var covered = prefix ? prefix.form.length : 0;
    for (i = 0; i < mask.length; i++) {
      if (mask[i]) covered++;
      else rest += afterPrefix[i];
    }
    return {
      form: base,
      parts: parts,
      rest: rest,
      coverage: base.length ? Math.min(1, covered / base.length) : 0,
      complete: parts.length >= 2 && rest.length <= 1
    };
  }

  function makePart(m, kind) {
    return {
      id: m.entry.id,
      kind: kind,
      text: m.entry.text || m.form,
      form: m.form,
      meaning: m.entry.meaning || "",
      note: m.entry.note || "",
      examples: m.entry.examples || []
    };
  }

  /** 拆出来的东西够不够「有意义」：只有孤零零一个 1 字母后缀（studies → -y）不算 */
  function meaningful(a) {
    if (!a.parts.length) return false;
    if (a.parts.length >= 2) return true;
    if (a.parts[0].form.length >= MIN_ROOT) return true;
    return a.parts[0].kind === "prefix" && a.coverage >= 0.4;
  }

  var cache = {};
  var cacheKey = "";

  /** 清空拆解缓存（词根词缀库变化或测试时用） */
  function resetCache() {
    cache = {};
  }

  /** 拆解一个单词；返回 {word, form, parts, rest, coverage, complete, line} */
  function analyze(word, data) {
    var entries = library(data);
    var key = entries.length + "|" + normalize(word);
    if (cacheKey !== String(entries.length)) {
      cache = {};
      cacheKey = String(entries.length);
    }
    if (cache[key]) return cache[key];

    var result = { word: String(word || ""), form: "", parts: [], rest: "", coverage: 0, complete: false, line: "" };
    var raw = String(word == null ? "" : word).toLowerCase();
    var plain = normalize(raw);

    // 词组、带空格或带数字/符号的词不拆（in terms of 不是 inter-）
    if (plain && /^[a-z]+$/.test(raw) && entries.length) {
      if (!SKIP[plain]) {
        var built = buildMaps(entries);
        var cands = lemmatize(plain).concat([plain]);
        for (var i = 0; i < cands.length; i++) {
          if (SKIP[cands[i]]) continue;
          var a = analyzeBase(cands[i], built.maps, built.lens);
          if (meaningful(a)) {
            result.form = a.form;
            result.parts = a.parts;
            result.rest = a.rest;
            result.coverage = a.coverage;
            result.complete = a.complete;
            break;
          }
        }
      }
    }
    result.line = result.parts
      .map(function (p) {
        return p.text + "（" + p.meaning + "）";
      })
      .join(" + ");
    if (result.form && result.form !== plain) {
      result.inflated = result.form; // 由变形还原出的原形
    }
    cache[key] = result;
    return result;
  }

  /** 这个词在词库里能拆出的其他词（同根词 / 同前缀词 / 同后缀词） */
  function siblings(word, entries, words, limit) {
    var a = analyze(word, entries);
    if (!a.parts.length) return [];
    var ids = a.parts.map(function (p) {
      return p.id;
    });
    var out = [];
    var seen = {};
    var cap = limit || 8;
    for (var i = 0; i < (words || []).length; i++) {
      var w = words[i];
      if (!w || w.word === word || seen[w.id]) continue;
      var b = analyze(w.word, entries);
      for (var j = 0; j < b.parts.length; j++) {
        var p = b.parts[j];
        if (ids.indexOf(p.id) < 0 || seen[w.id]) continue;
        seen[w.id] = 1;
        out.push({ word: w, via: p });
        break;
      }
      if (out.length >= cap) break;
    }
    return out;
  }

  /** 反查索引：条目 id → 用到它的词列表 */
  function reverseIndex(words, entries) {
    var idx = {};
    (words || []).forEach(function (w) {
      if (!w || !w.id) return;
      var a = analyze(w.word, entries);
      a.parts.forEach(function (p) {
        if (!idx[p.id]) idx[p.id] = { entry: p, words: [] };
        idx[p.id].words.push(w);
      });
    });
    return idx;
  }

  /** 搜索词根词缀：匹配拼写 / 含义 / 例词 */
  function search(entries, query, kind) {
    var q = String(query || "").trim().toLowerCase();
    var list = flatten(entries);
    return list.filter(function (e) {
      if (kind && kind !== "all" && e.kind !== kind) return false;
      if (!q) return true;
      if (String(e.text || "").toLowerCase().indexOf(q) >= 0) return true;
      if (String(e.meaning || "").toLowerCase().indexOf(q) >= 0) return true;
      if (String(e.note || "").toLowerCase().indexOf(q) >= 0) return true;
      if ((e.forms || []).some(function (f) { return String(f).toLowerCase().indexOf(q) >= 0; })) return true;
      return (e.examples || []).some(function (x) { return String(x).toLowerCase().indexOf(q) >= 0; });
    });
  }

  return {
    MAX_ROOTS: MAX_ROOTS,
    kindLabel: kindLabel,
    normalize: normalize,
    flatten: flatten,
    library: library,
    buildMaps: buildMaps,
    lemmatize: lemmatize,
    analyze: analyze,
    siblings: siblings,
    reverseIndex: reverseIndex,
    search: search,
    resetCache: resetCache
  };
});