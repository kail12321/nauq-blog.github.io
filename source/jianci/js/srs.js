/*!
 * 简词 JianCi · 记忆曲线核心算法
 * 纯函数模块：无 DOM、无存储依赖，浏览器与 Node 共用。
 *
 * 复习间隔参考艾宾浩斯遗忘曲线：1 / 2 / 4 / 7 / 15 / 30 / 60 / 120 天。
 * stage 就是「已经成功复习过几轮」，due 是下次该复习的日期。
 */
(function () {
  "use strict";

  var INTERVALS = [1, 2, 4, 7, 15, 30, 60, 120];
  var MASTER_STAGE = 5; // stage >= 5（间隔已到 30 天）视为「已掌握」
  // stage 0..7 分别对应的「下次复习间隔」
  var LABELS = ["1 天后", "2 天后", "4 天后", "7 天后", "15 天后", "30 天后", "60 天后", "120 天后"];
  var DAY = 86400000;

  var RATING = { know: 3, fuzzy: 2, forgot: 1 };

  /* ---------------- 日期工具（全部使用本地时区的 YYYY-MM-DD） ---------------- */

  function pad2(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function toKey(date) {
    return date.getFullYear() + "-" + pad2(date.getMonth() + 1) + "-" + pad2(date.getDate());
  }

  /** 今天的日期键；可传入时间戳 / Date / 日期键。 */
  function todayKey(base) {
    if (typeof base === "string" && /^\d{4}-\d{2}-\d{2}$/.test(base)) return base;
    return toKey(base ? new Date(base) : new Date());
  }

  function fromKey(key) {
    var p = String(key).split("-");
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }

  function addDays(key, n) {
    var d = fromKey(key);
    d.setDate(d.getDate() + n);
    return toKey(d);
  }

  /** to - from，单位天（用 round 抵消夏令时带来的 23/25 小时）。 */
  function diffDays(from, to) {
    return Math.round((fromKey(to).getTime() - fromKey(from).getTime()) / DAY);
  }

  function weekday(key) {
    return fromKey(key).getDay(); // 0 = 周日
  }

  function isValidKey(key) {
    return typeof key === "string" && /^\d{4}-\d{2}-\d{2}$/.test(key);
  }

  /* ---------------- 单词状态机 ---------------- */

  function baseState(wordId, bookId, today) {
    return {
      w: wordId,
      b: bookId,
      stage: 0,
      due: addDays(today, INTERVALS[0]),
      lapses: 0,
      seen: 0,
      right: 0,
      wrong: 0,
      learnedAt: today,
      lastAt: today
    };
  }

  /**
   * 新词第一次学习后的初始状态。
   * rating: "know"（熟练）/ "fuzzy"（一般）/ "forgot"（忘了）
   */
  function learn(wordId, bookId, rating, today) {
    var st = baseState(wordId, bookId, today);
    st.seen = 1;
    if (rating === "know") {
      st.stage = 1;
      st.right = 1;
    } else if (rating === "fuzzy") {
      st.stage = 0;
    } else {
      st.stage = 0;
      st.wrong = 1;
      st.lapses = 1;
    }
    st.due = addDays(today, INTERVALS[st.stage]);
    return st;
  }

  /** 复习一次之后的新状态（返回新对象，不修改入参）。 */
  function review(state, rating, today) {
    var st = {};
    for (var k in state) if (Object.prototype.hasOwnProperty.call(state, k)) st[k] = state[k];
    st.seen = (st.seen || 0) + 1;
    st.lastAt = today;
    if (rating === "know") {
      st.right = (st.right || 0) + 1;
      st.stage = Math.min((st.stage || 0) + 1, INTERVALS.length - 1);
    } else if (rating === "fuzzy") {
      st.stage = st.stage || 0;
    } else {
      st.wrong = (st.wrong || 0) + 1;
      st.lapses = (st.lapses || 0) + 1;
      st.stage = Math.max(0, (st.stage || 0) - 2);
    }
    st.due = addDays(today, INTERVALS[st.stage]);
    return st;
  }

  /** 答题错误时同步下调记忆阶段（填空/复习都走这里）。 */
  function demote(state, today) {
    return review(state, "forgot", today);
  }

  function isDue(state, today) {
    if (!state) return false;
    if (!isValidKey(state.due)) return true;
    return state.due <= today;
  }

  function isMastered(state) {
    return !!state && (state.stage || 0) >= MASTER_STAGE;
  }

  /** 从一批状态里挑出今天该复习的，按到期早晚 + 记忆阶段升序。 */
  function dueList(states, today) {
    return states
      .filter(function (s) {
        return isDue(s, today);
      })
      .sort(function (a, b) {
        if (a.due !== b.due) return a.due < b.due ? -1 : 1;
        return (a.stage || 0) - (b.stage || 0);
      });
  }

  function labelOf(stage) {
    var i = Math.max(0, Math.min(LABELS.length - 1, Number(stage) || 0));
    return LABELS[i];
  }

  function intervalOf(stage) {
    var i = Math.max(0, Math.min(INTERVALS.length - 1, Number(stage) || 0));
    return INTERVALS[i];
  }

  function ratingValue(rating) {
    return RATING[rating] || 0;
  }

  /* ---------------- 填空 / 选择题生成 ---------------- */

  function escapeRe(s) {
    return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  /** 生成常见词形变化，用于在例句里正确定位该词（-e 脱落、双写辅音等）。 */
  function variantsOf(word) {
    var w = String(word || "").toLowerCase();
    if (!w || !/^[a-z]/.test(w)) return [];
    var out = [w];
    function push(x) {
      if (x && x !== w && out.indexOf(x) < 0) out.push(x);
    }
    push(w + "s");
    push(w + "es");
    push(w + "ed");
    push(w + "d");
    push(w + "ing");
    if (/e$/.test(w)) {
      push(w.slice(0, -1) + "ing");
      push(w.slice(0, -1) + "ed");
    }
    if (/y$/.test(w)) {
      push(w.slice(0, -1) + "ied");
      push(w.slice(0, -1) + "ies");
    }
    if (/[^aeiou][aeiou][^aeiouwxy]$/.test(w)) {
      var last = w.charAt(w.length - 1);
      push(w + last + "ed");
      push(w + last + "ing");
    }
    return out;
  }

  /** 在例句里找到目标词（或其变形）出现的位置。 */
  function findToken(sentence, word) {
    if (!sentence || !word || !word.word) return null;
    var cands = [word.word];
    (word.forms || []).forEach(function (f) {
      if (f && f.word) cands.push(f.word);
    });
    variantsOf(word.word).forEach(function (v) {
      if (cands.indexOf(v) < 0) cands.push(v);
    });
    for (var i = 0; i < cands.length; i++) {
      var c = String(cands[i]).trim();
      if (!c) continue;
      var m = new RegExp("\\b" + escapeRe(c) + "\\b", "i").exec(sentence);
      if (m) return { token: m[0], index: m.index, length: m[0].length, source: c };
    }
    return null;
  }

  function normalizeAnswer(s) {
    return String(s == null ? "" : s)
      .toLowerCase()
      .replace(/[^a-z0-9'\- ]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function acceptedAnswers(word, token) {
    var out = [];
    if (token) out.push(token);
    if (word && word.word) out.push(word.word);
    (word && word.forms ? word.forms : []).forEach(function (f) {
      if (f && f.word) out.push(f.word);
    });
    var seen = {};
    return out.filter(function (x) {
      var k = normalizeAnswer(x);
      if (!k || seen[k]) return false;
      seen[k] = 1;
      return true;
    });
  }

  function checkAnswer(input, word, token) {
    var got = normalizeAnswer(input);
    if (!got) return false;
    var acc = acceptedAnswers(word, token);
    for (var i = 0; i < acc.length; i++) {
      if (normalizeAnswer(acc[i]) === got) return true;
    }
    return false;
  }

  function shuffle(arr, rng) {
    var r = rng || Math.random;
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(r() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function hasChinese(s) {
    return !!s && /[\u4e00-\u9fa5]/.test(String(s));
  }

  var NO_MEANING = "（未填释义）";

  /** 是否有一条真实的中文释义（排除导入时留的占位符）。 */
  function hasMeaning(word) {
    var m = word && word.meaning ? String(word.meaning) : "";
    if (!m || m === NO_MEANING) return false;
    return hasChinese(m);
  }

  /**
   * 为单个单词生成题目。三种题型，按可用信息降级：
   *   1. 例句填空（最优）—— 词条带例句，且能在句子里定位到它
   *   2. 看释义选单词 —— 没有例句但有中文释义
   *   3. 看音标 / 释义拼写 —— 只有单词本身（常见于大纲 txt 词表）
   * 一条信息都没有（无例句、无释义、无音标）时返回 null：出不了公平的题，就不考它。
   * @param {Object} word 词条
   * @param {Array}  pool 其余词条（做干扰项）
   */
  function buildQuestion(word, pool, rng) {
    if (!word || !word.word) return null;
    var ex = word.example || {};
    var tok = findToken(ex.en, word);
    if (tok) {
      return {
        type: "blank",
        id: word.id,
        word: word,
        prompt: ex.en.slice(0, tok.index) + "______" + ex.en.slice(tok.index + tok.length),
        answer: tok.token,
        zh: ex.zh || "",
        accepted: acceptedAnswers(word, tok.token),
        hint: word.meaning
      };
    }

    if (hasMeaning(word)) {
      var others = (pool || []).filter(function (w) {
        return w && w.id !== word.id && w.word && w.word !== word.word;
      });
      if (others.length) {
        var picks = shuffle(others, rng).slice(0, 3);
        var opts = shuffle([word].concat(picks), rng);
        return {
          type: "choice",
          id: word.id,
          word: word,
          prompt: word.meaning,
          options: opts.map(function (w) {
            return { id: w.id, word: w.word, pos: w.pos || "" };
          }),
          answer: word.word,
          accepted: [word.word]
        };
      }
    }

    if (word.phonetic || hasMeaning(word)) {
      return {
        type: "blank",
        spell: true,
        id: word.id,
        word: word,
        prompt: word.phonetic ? "音标 " + word.phonetic : "释义：" + word.meaning,
        answer: word.word,
        zh: word.phonetic && hasMeaning(word) ? word.meaning : "",
        accepted: [word.word],
        hint: word.meaning
      };
    }

    return null;
  }

  /** 轻量判断「这个词出得了题吗」——不构造题目，避免大词表（几千词）时反复洗牌。 */
  function canQuiz(word, pool) {
    if (!word || !word.word) return false;
    if (findToken((word.example || {}).en, word)) return true;
    if (hasMeaning(word) && pool && pool.length > 1) return true;
    if (word.phonetic || hasMeaning(word)) return true;
    return false;
  }

  /** 过滤出「出得了题」的词条，用于计算每日填空量。 */
  function quizzable(words, pool) {
    var p = pool || words || [];
    return (words || []).filter(function (w) {
      return canQuiz(w, p);
    });
  }

  /** 批量出题，尽量不重复同一个词（除非池子太小）。 */
  function buildQuiz(words, count, pool, rng) {
    var picked = shuffle(words || [], rng);
    var out = [];
    var seenId = {};
    for (var i = 0; i < picked.length && out.length < count; i++) {
      var w = picked[i];
      if (!w || seenId[w.id]) continue;
      var q = buildQuestion(w, pool || words, rng);
      if (q) {
        seenId[w.id] = 1;
        out.push(q);
      }
    }
    // 池子太小导致题目不足时，允许重复（换个题型）
    if (out.length < count) {
      var extra = shuffle(picked, rng);
      for (var j = 0; j < extra.length && out.length < count; j++) {
        var q2 = buildQuestion(extra[j], pool || words, rng);
        if (q2) out.push(q2);
      }
    }
    return out;
  }

  var api = {
    INTERVALS: INTERVALS,
    MASTER_STAGE: MASTER_STAGE,
    LABELS: LABELS,
    todayKey: todayKey,
    fromKey: fromKey,
    addDays: addDays,
    diffDays: diffDays,
    weekday: weekday,
    isValidKey: isValidKey,
    baseState: baseState,
    learn: learn,
    review: review,
    demote: demote,
    isDue: isDue,
    isMastered: isMastered,
    dueList: dueList,
    labelOf: labelOf,
    intervalOf: intervalOf,
    ratingValue: ratingValue,
    findToken: findToken,
    variantsOf: variantsOf,
    normalizeAnswer: normalizeAnswer,
    acceptedAnswers: acceptedAnswers,
    checkAnswer: checkAnswer,
    shuffle: shuffle,
    buildQuestion: buildQuestion,
    canQuiz: canQuiz,
    quizzable: quizzable,
    hasChinese: hasChinese,
    hasMeaning: hasMeaning,
    buildQuiz: buildQuiz
  };

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (typeof window !== "undefined") window.JC_SRS = api;
})();