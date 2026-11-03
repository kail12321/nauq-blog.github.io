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

  /* ---------------- 云端（排行榜） ---------------- */
  var ENDPOINT = "https://xinghe-guestbook.app.workbuddy.host";
  var PK = "wbpk_4ZIhceXcDU8edbXAC18P3N_lsxfdQFQ1ejJAMhUXfGuNctaJt1CS2gO";
  var TABLE = "leaderboard";
  var cloud = null;
  try {
    if (typeof WorkBuddyCloud !== "undefined") {
      cloud = WorkBuddyCloud.createWorkBuddyCloud({ endpoint: ENDPOINT, publishableKey: PK });
    }
  } catch (e) { cloud = null; }

  /** 上报当前段位与学习进度（安静失败） */
  function report(extra) {
    if (!cloud) return Promise.resolve(false);
    var d = state;
    var row = {
      player_id: d.pid,
      nickname: (d.nick || "匿名同学").slice(0, 20),
      tier: Math.max(0, Math.min(4, d.tier | 0)),
      stars: Math.max(0, Math.min(3, d.stars | 0)),
      learned: Math.max(0, (extra && extra.learned) | 0),
      mastered: Math.max(0, (extra && extra.mastered) | 0),
      best_streak: Math.max(0, Math.min(9999, d.best | 0)),
      updated_at: new Date().toISOString()
    };
    return cloud.database.from(TABLE).upsert(row, { onConflict: "player_id" }).then(function (res) {
      return !res.error;
    }).catch(function () { return false; });
  }

  /** 拉取排行榜（stars 高在前，其次已学词数） */
  function fetchBoard(limit) {
    if (!cloud) return Promise.resolve({ error: { message: "排行榜服务暂时不可用" }, data: null });
    return cloud.database.from(TABLE)
      .select("player_id, nickname, tier, stars, learned, mastered, best_streak, updated_at")
      .order("stars", { ascending: false })
      .order("learned", { ascending: false })
      .limit(limit || 50)
      .then(function (res) { return res; })
      .catch(function (e) { return { error: { message: (e && e.message) || "加载失败" }, data: null }; });
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
    fetchBoard: fetchBoard,
    setNick: setNick,
    hasCloud: function () { return !!cloud; }
  };
})();
