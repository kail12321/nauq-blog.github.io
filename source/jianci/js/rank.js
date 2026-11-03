/*!
 * 简词 JianCi · 排位赛与段位
 * 段位：紫铜 → 黄金 → 翡翠 → 冠军 → 奶娃（每段 3 星，连续答对 15 词升 1 星）
 * 排位赛题目与今日复习词一致；云端排行榜复用 WorkBuddy 云服务。
 */
(function () {
  "use strict";

  /* ---------------- 段位定义 ---------------- */
  var TIERS = [
    { key: "bronze", name: "紫铜", icon: "🥉", color: "#b87333" },
    { key: "gold", name: "黄金", icon: "🏅", color: "#e6a700" },
    { key: "jade", name: "翡翠", icon: "💎", color: "#0fa968" },
    { key: "champ", name: "冠军", icon: "👑", color: "#e8434f" },
    { key: "naiwa", name: "奶娃", icon: "🍼", color: "#8b5cf6" }
  ];
  var STARS_PER_TIER = 3;
  var GOAL = 15; // 连续答对数 → 升 1 星

  /* ---------------- 本地状态 ---------------- */
  var KEY = "jci_rank_v1";

  function load() {
    var d = { pid: "", nick: "", tier: 0, stars: 0, best: 0, wins: 0 };
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var p = JSON.parse(raw);
        if (p && typeof p === "object") {
          d.pid = typeof p.pid === "string" ? p.pid : "";
          d.nick = typeof p.nick === "string" ? p.nick : "";
          d.tier = Math.max(0, Math.min(TIERS.length - 1, Number(p.tier) || 0));
          d.stars = Math.max(0, Math.min(STARS_PER_TIER, Number(p.stars) || 0));
          d.best = Math.max(0, Number(p.best) || 0);
          d.wins = Math.max(0, Number(p.wins) || 0);
        }
      }
    } catch (e) { /* 忽略损坏数据 */ }
    if (!d.pid) {
      d.pid = "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
      save(d);
    }
    return d;
  }

  function save(d) {
    try {
      localStorage.setItem(KEY, JSON.stringify(d));
    } catch (e) { /* 容量超限忽略 */ }
  }

  var state = load();

  /* ---------------- 段位计算 ---------------- */
  function tierInfo(t) {
    return TIERS[Math.max(0, Math.min(TIERS.length - 1, t || 0))];
  }
  function totalStars(d) {
    return (d.tier || 0) * STARS_PER_TIER + (d.stars || 0);
  }
  /** 连击达标后升星，返回 "star" | "tier" | "max" | null */
  function promote(d) {
    d = d || state;
    if (d.tier >= TIERS.length - 1 && d.stars >= STARS_PER_TIER) return "max";
    if (d.stars + 1 >= STARS_PER_TIER && d.tier < TIERS.length - 1) {
      d.tier += 1;
      d.stars = 0;
      return "tier";
    }
    d.stars += 1;
    return "star";
  }

  /* ---------------- 出题（与今日复习词一致） ---------------- */
  /**
   * pool: 今日复习过的词对象数组；allWords: 全词库（干扰项来源）
   * 返回 { word, options: [{text, ok}], answerIndex } 或 null
   */
  function buildQuestion(pool, allWords) {
    if (!pool || !pool.length) return null;
    var w = pool[Math.floor(Math.random() * pool.length)];
    var opts = [{ text: (w.pos ? w.pos + " " : "") + w.meaning, ok: true }];
    var seen = {};
    seen[w.id || w.word] = 1;
    var guard = 0;
    while (opts.length < 4 && guard++ < 200) {
      var c = allWords[Math.floor(Math.random() * allWords.length)];
      if (!c || seen[c.id || c.word]) continue;
      seen[c.id || c.word] = 1;
      opts.push({ text: (c.pos ? c.pos + " " : "") + c.meaning, ok: false });
    }
    // 选项不足 4 个也能玩
    for (var i = opts.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = opts[i]; opts[i] = opts[j]; opts[j] = t;
    }
    var answerIndex = 0;
    for (var k = 0; k < opts.length; k++) if (opts[k].ok) { answerIndex = k; break; }
    return { word: w, options: opts, answerIndex: answerIndex };
  }

  /* ---------------- 云端（排行榜，经同源 iframe 桥） ----------------
   * 云服务网关强制精确 Origin 匹配，GitHub Pages 域名直连会被 403。
   * 因此排行榜页部署在应用同域下，由本页 iframe 嵌入；
   * 上报通过 postMessage 交给 iframe（同源）完成写入。 */
  var BOARD_URL = "https://xinghe-guestbook.app.workbuddy.host/jianci-board.html?sharecode=LP45SNTRLR";

  function boardWindow() {
    var f = null;
    try { f = document.getElementById("rankBoardFrame"); } catch (e) { return null; }
    if (!f || !f.contentWindow) return null;
    return f.contentWindow;
  }

  /** 把身份/最新数据交给排行榜 iframe（同源代理）上报 */
  function report(extra) {
    var w = boardWindow();
    if (!w) return false;
    var d = state;
    var exp = Math.max(0, Math.min(999999, (extra && extra.exp) | 0));
    w.postMessage({
      type: "jc-rank-report",
      payload: {
        player_id: d.pid,
        nickname: (d.nick || "匿名同学").slice(0, 20),
        tier: Math.max(0, Math.min(4, d.tier | 0)),
        stars: Math.max(0, Math.min(3, d.stars | 0)),
        learned: Math.max(0, (extra && extra.learned) | 0),
        mastered: Math.max(0, (extra && extra.mastered) | 0),
        best_streak: Math.max(0, Math.min(9999, d.best | 0)),
        exp: exp,
        level: Math.max(1, Math.min(9999, (extra && extra.level) | 0 || Math.floor(exp / 15) + 1))
      }
    }, "*");
    return true;
  }

  /** 告诉排行榜 iframe 当前玩家 id（用于高亮自己） */
  function syncIdentity() {
    var w = boardWindow();
    if (w && state.pid) w.postMessage({ type: "jc-rank-identity", pid: state.pid }, "*");
  }

  function setNick(nick) {
    state.nick = String(nick || "").trim().slice(0, 20);
    save(state);
    return state.nick;
  }

  window.JC_RANK = {
    TIERS: TIERS,
    STARS_PER_TIER: STARS_PER_TIER,
    GOAL: GOAL,
    state: function () { return state; },
    save: function () { save(state); },
    tierInfo: tierInfo,
    totalStars: totalStars,
    promote: promote,
    buildQuestion: buildQuestion,
    report: report,
    syncIdentity: syncIdentity,
    boardWindow: boardWindow,
    setNick: setNick
  };
})();
