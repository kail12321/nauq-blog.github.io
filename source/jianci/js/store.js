/*!
 * 简词 JianCi · 状态与计划引擎
 * 负责：词书注册、每日任务计划、打卡记录、统计、导入导出。
 * 存储使用 localStorage；在 Node 中自动退化为内存存储，便于测试。
 */
(function () {
  "use strict";

  var G = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : {};
  var SRS = G.JC_SRS || (typeof require === "function" ? require("./srs.js") : null);
  var MORPH = G.JC_MORPH || (typeof require === "function" ? require("./morph.js") : null);

  var KEY = "jianci.state.v1";

  /* ---------------- 存储适配 ---------------- */
  var mem = {};
  var storage = (function () {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("__jc__", "1");
        localStorage.removeItem("__jc__");
        return localStorage;
      }
    } catch (e) {
      /* 隐私模式等场景退回内存存储 */
    }
    return {
      getItem: function (k) {
        return Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : null;
      },
      setItem: function (k, v) {
        mem[k] = String(v);
      },
      removeItem: function (k) {
        delete mem[k];
      }
    };
  })();

  /* ---------------- 内置词书元信息 ---------------- */
  var BOOK_META = [
    {
      id: "kaoyan",
      name: "考研核心词汇",
      tag: "考研",
      desc: "考研英语（一/二）大纲高频词，偏学术阅读与写作",
      accent: "#4f6ef7"
    },
    {
      id: "cet6",
      name: "六级核心词汇",
      tag: "CET-6",
      desc: "六级真题高频词，难度介于四级与考研之间",
      accent: "#0f9d76"
    },
    {
      id: "ielts",
      name: "雅思核心词汇",
      tag: "IELTS",
      desc: "雅思学术场景词与写作论证词，英式拼写优先",
      accent: "#d97706"
    },
    {
      id: "toefl",
      name: "托福核心词汇",
      tag: "TOEFL",
      desc: "托福高频学术词，覆盖听说读写四大场景",
      accent: "#8b5cf6"
    }
  ];

  function defaults() {
    return {
      version: 1,
      createdAt: SRS.todayKey(),
      lastOpen: SRS.todayKey(),
      settings: {
        dailyNew: 20,
        quizCount: 10,
        reviewLimit: 100,
        books: ["kaoyan"],
        checkinRule: "all",
        autoSpeak: true,
        theme: "auto",
        showSimilar: true
      },
      words: {},
      pending: [],
      cursor: {},
      days: {},
      custom: [],
      exp: 0,
      expDay: ""
    };
  }

  var S = defaults();
  var _index = null;
  var _all = null;
  var _morph = null;

  function invalidate() {
    _index = null;
    _all = null;
    _morph = null;
  }

  function clamp(n, lo, hi) {
    n = Number(n);
    if (!isFinite(n)) n = lo;
    return Math.max(lo, Math.min(hi, Math.round(n)));
  }

  /* ---------------- 载入 / 保存 ---------------- */
  function load() {
    var raw = storage.getItem(KEY);
    if (raw) {
      try {
        var parsed = JSON.parse(raw);
        var base = defaults();
        S = {
          version: base.version,
          createdAt: parsed.createdAt || base.createdAt,
          lastOpen: parsed.lastOpen || base.lastOpen,
          settings: Object.assign({}, base.settings, parsed.settings || {}),
          words: parsed.words && typeof parsed.words === "object" ? parsed.words : {},
          pending: Array.isArray(parsed.pending) ? parsed.pending.filter(function (x) { return typeof x === "string"; }) : [],
          cursor: parsed.cursor && typeof parsed.cursor === "object" ? parsed.cursor : {},
          days: parsed.days && typeof parsed.days === "object" ? parsed.days : {},
          custom: Array.isArray(parsed.custom) ? parsed.custom : [],
          exp: clamp(Number(parsed.exp) || 0, 0, 9999999),
          expDay: typeof parsed.expDay === "string" ? parsed.expDay : ""
        };
        if (!Array.isArray(S.settings.books) || !S.settings.books.length) S.settings.books = ["kaoyan"];
      } catch (e) {
        S = defaults();
      }
    } else {
      S = defaults();
    }
    S.settings.dailyNew = clamp(S.settings.dailyNew, 1, 500);
    S.settings.quizCount = clamp(S.settings.quizCount, 0, 50);
    S.settings.reviewLimit = clamp(S.settings.reviewLimit, 5, 2000);
    invalidate();
    return S;
  }

  function save() {
    try {
      storage.setItem(KEY, JSON.stringify(S));
    } catch (e) {
      /* 容量超限时忽略，不阻塞使用 */
    }
  }

  function reset() {
    S = defaults();
    invalidate();
    save();
    return S;
  }

  function state() {
    return S;
  }

  function settings() {
    return S.settings;
  }

  /* ---------------- 词书 ---------------- */
  function library() {
    var data = G.WORDBOOK_DATA || {};
    var out = BOOK_META.map(function (m) {
      return {
        id: m.id,
        name: m.name,
        tag: m.tag,
        desc: m.desc,
        accent: m.accent,
        builtin: true,
        /* 主词库（精讲）+ 全量词库（-full 后缀，如考研/六级大纲词表）合并 */
        words: (data[m.id] || []).concat(data[m.id + "-full"] || [])
      };
    });
    (S.custom || []).forEach(function (b) {
      out.push({
        id: b.id,
        name: b.name,
        tag: "自定义",
        desc: "自己导入的词书",
        accent: "#8b5cf6",
        builtin: false,
        words: b.words || []
      });
    });
    return out;
  }

  function bookById(id) {
    var all = library();
    for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return null;
  }

  function selectedBooks() {
    var ids = S.settings.books || [];
    return ids.map(bookById).filter(Boolean);
  }

  function index() {
    if (_index) return _index;
    var map = {};
    library().forEach(function (b) {
      b.words.forEach(function (w) {
        if (w && w.id) map[w.id] = { word: w, book: b };
      });
    });
    _index = map;
    return map;
  }

  function wordById(id) {
    var e = index()[id];
    return e ? e.word : null;
  }

  function allWords() {
    if (_all) return _all;
    var out = [];
    library().forEach(function (b) {
      b.words.forEach(function (w) {
        if (w && w.id) out.push(w);
      });
    });
    _all = out;
    return out;
  }

  function bookOfWord(id) {
    var e = index()[id];
    return e ? e.book.id : null;
  }

  /* ---------------- 词根词缀 ---------------- */

  /** 内置的词根词缀库（来自 js/data/morph-*.js，缺失时返回空数组） */
  function morphLib() {
    if (!MORPH) return [];
    return MORPH.library(G.MORPH_DATA || null);
  }

  function hasMorph() {
    return morphLib().length > 0;
  }

  /** 拆解一个单词：{parts, rest, coverage, complete, line} */
  function analysisOf(word) {
    if (!MORPH || !word) return null;
    var a = MORPH.analyze(word.word || word, G.MORPH_DATA || null);
    return a.parts.length ? a : null;
  }

  /** 同根/同缀词（从已载入的所有词书里找），用于卡片上的「同根词」 */
  function siblingsOf(word, limit) {
    if (!MORPH || !word) return [];
    var all = allWords();
    if (all.length > 4000) all = all.slice(0, 4000);
    return MORPH
      .siblings(word.word || word, G.MORPH_DATA || null, all, limit || 8)
      .filter(function (s) {
        return s.word && s.word.id !== word.id;
      });
  }

  /** 反查索引：词根词缀 id → 词库中用到它的词（懒加载 + 缓存） */
  function morphIndex() {
    if (_morph) return _morph;
    _morph = MORPH ? MORPH.reverseIndex(allWords(), G.MORPH_DATA || null) : {};
    return _morph;
  }

  /** 词根词缀库 + 命中统计，供「词根」页使用 */
  function morphStats() {
    var lib = morphLib();
    var idx = morphIndex();
    var hit = 0;
    var byKind = { prefix: 0, root: 0, suffix: 0 };
    lib.forEach(function (e) {
      if (byKind[e.kind] != null) byKind[e.kind]++;
      if (idx[e.id] && idx[e.id].words.length) hit++;
    });
    var covered = 0;
    allWords().forEach(function (w) {
      if (MORPH && MORPH.analyze(w.word, G.MORPH_DATA || null).parts.length) covered++;
    });
    return {
      total: lib.length,
      hit: hit,
      byKind: byKind,
      words: allWords().length,
      covered: covered
    };
  }

  /** 搜索词根词缀 */
  function searchMorph(query, kind) {
    if (!MORPH) return [];
    return MORPH.search(morphLib(), query, kind);
  }

  /** 某个词素命中的词（带释义），用于「词根」页展开 */
  function morphWords(entryId, limit) {
    var hit = morphIndex()[entryId];
    if (!hit) return [];
    return hit.words.slice(0, limit || 20);
  }

  /** 前缀 / 词根 / 后缀 的中文名 */
  function morphKindLabel(kind) {
    return MORPH ? MORPH.kindLabel(kind) : String(kind || "");
  }

  /** 某词书已学词数 / 已掌握词数 */
  function bookProgress(bookId) {
    var b = bookById(bookId);
    if (!b) return { total: 0, learned: 0, mastered: 0 };
    var learned = 0;
    var mastered = 0;
    b.words.forEach(function (w) {
      var st = S.words[w.id];
      if (st) {
        learned++;
        if (SRS.isMastered(st)) mastered++;
      }
    });
    return { total: b.words.length, learned: learned, mastered: mastered };
  }

  /* ---------------- 取新词 ---------------- */
  function takeFromBook(book, n) {
    var out = [];
    var cur = S.cursor[book.id] || 0;
    while (out.length < n && cur < book.words.length) {
      var w = book.words[cur++];
      if (w && w.id && !S.words[w.id] && S.pending.indexOf(w.id) < 0) out.push(w);
    }
    S.cursor[book.id] = cur;
    return out;
  }

  /**
   * 把「今日新词队列」补足到 dailyNew。
   * 队列里没学完的词会自然顺延到第二天，不会丢失。
   */
  function assignNew(today) {
    var d = day(today);
    var quota = clamp(S.settings.dailyNew, 1, 500);
    var need = quota - S.pending.length - d.new;
    if (need <= 0) return 0;
    var books = selectedBooks().filter(function (b) {
      return b.words && b.words.length;
    });
    var before = S.pending.length;
    var guard = 0;
    while (need > 0 && books.length && guard++ < 500) {
      var progressed = false;
      for (var i = 0; i < books.length && need > 0; i++) {
        var got = takeFromBook(books[i], 1);
        if (got.length) {
          S.pending.push(got[0].id);
          need--;
          progressed = true;
        }
      }
      if (!progressed) break;
    }
    return S.pending.length - before;
  }

  /* ---------------- 每日记录 ---------------- */
  function day(today) {
    var t = SRS.todayKey(today);
    if (!S.days[t]) S.days[t] = {};
    var d = S.days[t];
    if (!Array.isArray(d.newIds)) d.newIds = [];
    if (!Array.isArray(d.wrongIds)) d.wrongIds = [];
    if (!Array.isArray(d.reviewIds)) d.reviewIds = [];
    if (typeof d.new !== "number") d.new = 0;
    if (typeof d.quizTotal !== "number") d.quizTotal = 0;
    if (typeof d.quizRight !== "number") d.quizRight = 0;
    if (typeof d.checkedIn !== "boolean") d.checkedIn = false;
    return d;
  }

  function allStates() {
    return Object.keys(S.words).map(function (k) {
      return S.words[k];
    });
  }

  function dueStatesToday(today) {
    return SRS.dueList(
      allStates().filter(function (s) {
        return s && s.learnedAt;
      }),
      today
    );
  }

  /** 今天已经出现过、需要参与巩固填空的词：今天学的新词 + 今天做错的词 */
  function quizWords(today) {
    var d = day(today);
    var seen = {};
    var out = [];
    d.newIds.concat(d.wrongIds).forEach(function (id) {
      if (seen[id]) return;
      seen[id] = 1;
      var w = wordById(id);
      if (w) out.push(w);
    });
    return out;
  }

  /** 今日计划（唯一入口，所有视图都从这里取数据） */
  function plan(today) {
    var t = SRS.todayKey(today);
    assignNew(t);
    save();
    var d = day(t);
    var pending = S.pending.map(wordById).filter(Boolean);
    var dueStates = dueStatesToday(t);
    var limit = clamp(S.settings.reviewLimit, 5, 2000);
    var due = dueStates.slice(0, limit).map(function (s) {
      return { state: s, word: wordById(s.w) };
    }).filter(function (x) {
      return x.word;
    });
    var pool = quizWords(t);
    var quizTarget = Math.min(clamp(S.settings.quizCount, 0, 50), SRS.quizzable(pool, allWords()).length);
    var reviewDone = due.length === 0;
    var newDone = pending.length === 0;
    var quizDone = d.quizTotal >= quizTarget;
    var rule = S.settings.checkinRule;
    var ready;
    if (rule === "manual") ready = true;
    else if (rule === "review") ready = reviewDone;
    else ready = newDone && reviewDone && quizDone;
    return {
      today: t,
      rule: rule,
      newLearned: d.new,
      newPending: pending.length,
      newTarget: d.new + pending.length,
      pendingWords: pending,
      dueWords: due.map(function (x) {
        return x.word;
      }),
      dueItems: due,
      dueTotal: dueStates.length,
      reviewedToday: d.reviewIds.length,
      reviewTarget: d.reviewIds.length + due.length,
      quizPool: pool,
      quizTarget: quizTarget,
      quizDone: d.quizTotal,
      checkedIn: !!d.checkedIn,
      readyToCheckIn: ready,
      newDone: newDone,
      reviewDone: reviewDone,
      quizDoneFlag: quizDone
    };
  }

  /* ---------------- 学习动作 ---------------- */
  function learnWord(id, rating, today) {
    var t = SRS.todayKey(today);
    var d = day(t);
    if (!S.words[id]) {
      S.words[id] = SRS.learn(id, bookOfWord(id) || "custom", rating, t);
      d.new += 1;
      if (d.newIds.indexOf(id) < 0) d.newIds.push(id);
      var i = S.pending.indexOf(id);
      if (i >= 0) S.pending.splice(i, 1);
    } else {
      S.words[id] = SRS.review(S.words[id], rating, t);
    }
    if (rating === "forgot" && d.wrongIds.indexOf(id) < 0) d.wrongIds.push(id);
    save();
    return S.words[id];
  }

  function reviewWord(id, rating, today) {
    var t = SRS.todayKey(today);
    if (!S.words[id]) return learnWord(id, rating, t);
    S.words[id] = SRS.review(S.words[id], rating, t);
    var d = day(t);
    if (d.reviewIds.indexOf(id) < 0) d.reviewIds.push(id);
    if (rating === "forgot" && d.wrongIds.indexOf(id) < 0) d.wrongIds.push(id);
    save();
    return S.words[id];
  }

  function recordQuiz(id, right, today) {
    var t = SRS.todayKey(today);
    var d = day(t);
    d.quizTotal += 1;
    if (right) d.quizRight += 1;
    if (!right) {
      if (d.wrongIds.indexOf(id) < 0) d.wrongIds.push(id);
      if (S.words[id]) S.words[id] = SRS.demote(S.words[id], t);
    }
    save();
  }

  function checkIn(today) {
    var t = SRS.todayKey(today);
    var d = day(t);
    d.checkedIn = true;
    d.checkedAt = Date.now();
    // 每日首次打卡 +3 经验（撤销后再打卡不重复计，防刷）
    if (S.expDay !== t) {
      S.expDay = t;
      S.exp = clamp((S.exp || 0) + 3, 0, 9999999);
    }
    save();
    return d;
  }

  function cancelCheckIn(today) {
    var t = SRS.todayKey(today);
    day(t).checkedIn = false;
    save();
  }

  /* ---------------- 经验与等级 ---------------- */
  /** 每升 1 级需要 15 经验（每天打卡 +3，坚持 5 天升一级） */
  var EXP_PER_LEVEL = 15;

  function expInfo() {
    var exp = S.exp || 0;
    var level = Math.floor(exp / EXP_PER_LEVEL) + 1;
    var into = exp % EXP_PER_LEVEL;
    return {
      exp: exp,
      level: level,
      into: into,
      need: EXP_PER_LEVEL,
      pct: pct0(into, EXP_PER_LEVEL)
    };
  }

  function pct0(a, b) {
    if (!b) return 0;
    return Math.max(0, Math.min(100, Math.round((a / b) * 100)));
  }

  function addExp(n, today) {
    S.exp = clamp((S.exp || 0) + n, 0, 9999999);
    save();
    return expInfo();
  }

  /* ---------------- 统计 ---------------- */
  function stats(today) {
    var t = SRS.todayKey(today);
    var ids = Object.keys(S.words);
    var mastered = 0;
    var learning = 0;
    var tough = 0;
    var stageBuckets = [0, 0, 0, 0, 0, 0, 0, 0];
    ids.forEach(function (id) {
      var st = S.words[id];
      if (!st) return;
      var sg = clamp(st.stage || 0, 0, 7);
      stageBuckets[sg] += 1;
      if (SRS.isMastered(st)) mastered++;
      else learning++;
      if ((st.lapses || 0) >= 3) tough++;
    });

    var dayKeys = Object.keys(S.days);
    var checkedDays = dayKeys.filter(function (k) {
      return S.days[k] && S.days[k].checkedIn;
    }).sort();

    // 当前连续打卡天数
    var streak = 0;
    var cur = day(t).checkedIn ? t : SRS.addDays(t, -1);
    while (S.days[cur] && S.days[cur].checkedIn) {
      streak++;
      cur = SRS.addDays(cur, -1);
    }

    // 历史最长连续
    var best = 0;
    var run = 0;
    var prev = null;
    checkedDays.forEach(function (k) {
      if (prev && SRS.diffDays(prev, k) === 1) run++;
      else run = 1;
      best = Math.max(best, run);
      prev = k;
    });

    var totalNew = 0;
    var totalReview = 0;
    var totalQuizTotal = 0;
    var totalQuizRight = 0;
    dayKeys.forEach(function (k) {
      var d = S.days[k] || {};
      totalNew += d.new || 0;
      totalReview += (d.reviewIds ? d.reviewIds.length : d.review || 0);
      totalQuizTotal += d.quizTotal || 0;
      totalQuizRight += d.quizRight || 0;
    });

    // 最近 14 天曲线
    var series = [];
    for (var i = 13; i >= 0; i--) {
      var k2 = SRS.addDays(t, -i);
      var dd = S.days[k2] || {};
      series.push({
        date: k2,
        label: k2.slice(5),
        isToday: k2 === t,
        new: dd.new || 0,
        review: dd.reviewIds ? dd.reviewIds.length : 0,
        quizTotal: dd.quizTotal || 0,
        quizRight: dd.quizRight || 0,
        checkedIn: !!dd.checkedIn
      });
    }

    // 热力图：最近 17 周（119 天），按周一开头对齐
    var heatEnd = SRS.addDays(t, 6 - SRS.weekday(t));
    var heatStart = SRS.addDays(heatEnd, -118);
    var heat = [];
    for (var j = 0; j < 119; j++) {
      var k3 = SRS.addDays(heatStart, j);
      var rec = S.days[k3] || {};
      heat.push({
        date: k3,
        future: k3 > t,
        level: heatLevel(rec),
        new: rec.new || 0,
        review: rec.reviewIds ? rec.reviewIds.length : 0,
        checkedIn: !!rec.checkedIn
      });
    }

    var books = library().map(function (b) {
      var p = bookProgress(b.id);
      return {
        id: b.id,
        name: b.name,
        tag: b.tag,
        accent: b.accent,
        total: p.total,
        learned: p.learned,
        mastered: p.mastered,
        selected: (S.settings.books || []).indexOf(b.id) >= 0
      };
    });

    return {
      today: t,
      totalWords: ids.length,
      mastered: mastered,
      learning: learning,
      tough: tough,
      stageBuckets: stageBuckets,
      streak: streak,
      bestStreak: best,
      checkedDays: checkedDays.length,
      studyDays: dayKeys.filter(function (k) {
        var d = S.days[k] || {};
        return (d.new || 0) + (d.reviewIds ? d.reviewIds.length : 0) + (d.quizTotal || 0) > 0;
      }).length,
      totalNew: totalNew,
      totalReview: totalReview,
      totalQuizTotal: totalQuizTotal,
      totalQuizRight: totalQuizRight,
      accuracy: totalQuizTotal ? Math.round((totalQuizRight / totalQuizTotal) * 100) : 0,
      series: series,
      heat: heat,
      books: books,
      libraryTotal: allWords().length
    };
  }

  function heatLevel(rec) {
    var n = (rec.new || 0) + (rec.reviewIds ? rec.reviewIds.length : 0);
    if (!n) return rec.checkedIn ? 1 : 0;
    if (n < 10) return 1;
    if (n < 25) return 2;
    if (n < 50) return 3;
    return 4;
  }

  /* ---------------- 自定义词书 / 导入导出 ---------------- */
  function pad3(n) {
    return n < 10 ? "00" + n : n < 100 ? "0" + n : String(n);
  }

  /**
   * 用「每行一个词」的文本创建自定义词书。容忍常见写法：
   *   abandon 放弃；抛弃        /  abundant, 丰富的
   *   resilience；韧性          /  mitigate v. 减轻
   *   in terms of 就……而言      /  1. abandon 放弃
   * 支持 , ， ; ； 、 Tab | : ： / — 作为分隔符，会自动去掉行首序号。
   */
  function parseWordLines(text) {
    var out = [];
    var seen = {};
    String(text || "")
      .split(/\r?\n/)
      .forEach(function (line) {
        var s = String(line).trim();
        if (!s) return;
        s = s.replace(/^[\s\-\*•·]+/, "").replace(/^\d+[\.\)、]\s*/, "");
        if (!s) return;

        // 先把 /音标/ 摘出来：很多大纲 txt 是「word /əˈbændən/ 释义」
        var phonetic = "";
        var ipa = s.match(/(\/[^\/\s]{2,40}\/)/);
        if (ipa) {
          phonetic = ipa[1];
          s = (s.slice(0, ipa.index) + " " + s.slice(ipa.index + ipa[0].length)).trim();
        }
        s = s.replace(/[\s,，;；、\t|:：\/—]+$/, "");
        if (!s) return;

        var word = "";
        var meaning = "";
        var pos = "";
        var m = s.match(/^([A-Za-z][A-Za-z0-9'\-\. ]*?)\s*[,，;；、\t|:：\/—]+\s*(.+)$/);
        if (m) {
          word = m[1].trim();
          meaning = m[2].trim();
        } else {
          var toks = s.split(/\s+/);
          var en = [];
          var i = 0;
          for (; i < toks.length; i++) {
            var t = toks[i];
            if (/^(n|v|adj|adv|prep|conj|pron|num|phr)\.?$/i.test(t)) {
              pos = t.charAt(t.length - 1) === "." ? t.toLowerCase() : t.toLowerCase() + ".";
              i++;
              break;
            }
            if (/^[A-Za-z][A-Za-z0-9'\-\.]*$/.test(t)) en.push(t);
            else break;
          }
          if (!en.length) return;
          word = en.join(" ");
          meaning = toks.slice(i).join(" ").trim();
        }

        // 释义开头带词性时（如 "放弃" 前有 "v."）也识别出来
        var pm = meaning.match(/^(n|v|adj|adv|prep|conj|pron|num|phr)\.\s*(.*)$/i);
        if (pm) {
          if (!pos) pos = pm[1].toLowerCase() + ".";
          meaning = pm[2].trim();
        }

        if (!/[A-Za-z]/.test(word)) return;
        if (meaning && !/[A-Za-z\u4e00-\u9fa5]/.test(meaning)) meaning = "";
        var key = word.toLowerCase();
        if (seen[key]) return;
        seen[key] = 1;
        out.push({ word: word, phonetic: phonetic, pos: pos, meaning: meaning || "（未填释义）" });
      });
    return out;
  }

  function addCustomBook(name, entries) {
    var id = "cu" + Date.now().toString(36);
    var words = (entries || []).map(function (e, i) {
      return {
        id: id + "-" + pad3(i + 1),
        word: e.word,
        phonetic: e.phonetic || "",
        pos: e.pos || "",
        meaning: e.meaning || "（未填释义）",
        example: { en: "", zh: "" },
        similar: [],
        forms: [],
        custom: true
      };
    });
    var book = { id: id, name: name || "我的词书", words: words, createdAt: SRS.todayKey() };
    S.custom.push(book);
    invalidate();
    if ((S.settings.books || []).indexOf(id) < 0) S.settings.books.push(id);
    save();
    return book;
  }

  function removeCustomBook(id) {
    S.custom = S.custom.filter(function (b) {
      return b.id !== id;
    });
    S.settings.books = (S.settings.books || []).filter(function (x) {
      return x !== id;
    });
    S.pending = S.pending.filter(function (wid) {
      return String(wid).indexOf(id) !== 0;
    });
    invalidate();
    save();
  }

  /** 清空某本词书的学习进度（词库本身保留） */
  function resetBookProgress(bookId) {
    var b = bookById(bookId);
    if (!b) return;
    b.words.forEach(function (w) {
      delete S.words[w.id];
    });
    S.cursor[bookId] = 0;
    S.pending = S.pending.filter(function (wid) {
      return S.words[wid] || bookOfWord(wid) !== bookId;
    });
    invalidate();
    save();
  }

  function exportJSON() {
    return JSON.stringify(S, null, 2);
  }

  function importJSON(text) {
    var parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || !parsed.words) throw new Error("不是有效的简词备份文件");
    storage.setItem(KEY, JSON.stringify(parsed));
    load();
    return S;
  }

  var api = {
    KEY: KEY,
    load: load,
    save: save,
    reset: reset,
    state: state,
    settings: settings,
    library: library,
    bookById: bookById,
    selectedBooks: selectedBooks,
    wordById: wordById,
    allWords: allWords,
    bookOfWord: bookOfWord,
    bookProgress: bookProgress,
    morphLib: morphLib,
    hasMorph: hasMorph,
    analysisOf: analysisOf,
    siblingsOf: siblingsOf,
    morphIndex: morphIndex,
    morphStats: morphStats,
    searchMorph: searchMorph,
    morphWords: morphWords,
    morphKindLabel: morphKindLabel,
    plan: plan,
    day: day,
    dueStatesToday: dueStatesToday,
    quizWords: quizWords,
    learnWord: learnWord,
    reviewWord: reviewWord,
    recordQuiz: recordQuiz,
    checkIn: checkIn,
    cancelCheckIn: cancelCheckIn,
    expInfo: expInfo,
    addExp: addExp,
    stats: stats,
    parseWordLines: parseWordLines,
    addCustomBook: addCustomBook,
    removeCustomBook: removeCustomBook,
    resetBookProgress: resetBookProgress,
    exportJSON: exportJSON,
    importJSON: importJSON,
    invalidate: invalidate
  };

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (typeof window !== "undefined") window.JC_STORE = api;
})();