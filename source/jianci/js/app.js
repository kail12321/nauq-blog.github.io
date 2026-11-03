/*!
 * 简词 JianCi · 界面与交互
 * 依赖：js/srs.js（算法）、js/store.js（状态）、js/data/*.js（词库）
 */
(function () {
  "use strict";

  var SRS = window.JC_SRS;
  var ST = window.JC_STORE;
  var RANK = window.JC_RANK;

  if (!SRS || !ST) {
    document.body.innerHTML =
      '<p style="padding:48px;font:16px/1.8 -apple-system,sans-serif">资源加载失败：请确认 js/ 目录下的文件完整，并通过 index.html 打开。</p>';
    return;
  }

  ST.load();

  var TODAY = SRS.todayKey();
  var VIEWS = ["today", "books", "roots", "stats", "rank", "settings"];
  var view = "today";
  var rootQ = ""; // 词根页：搜索词
  var rootKind = "all"; // 词根页：前缀 / 词根 / 后缀 筛选
  var session = null;
  var toastTimer = null;
  var inputCache = "";
  var pendingImport = null; // 已读取但还没确认导入的词书 { name, entries, file, size }

  /* ==================== 小工具 ==================== */

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function pct(a, b) {
    if (!b) return 0;
    return Math.max(0, Math.min(100, Math.round((a / b) * 100)));
  }

  function nz(n) {
    return Number(n) || 0;
  }

  function toast(msg, kind) {
    var t = $("#toast");
    t.textContent = msg;
    t.hidden = false;
    t.className = "toast" + (kind ? " " + kind : "");
    // 触发过渡
    void t.offsetWidth;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      t.classList.remove("show");
      setTimeout(function () {
        t.hidden = true;
      }, 260);
    }, 2300);
  }

  function speak(text) {
    if (!text || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      u.rate = 0.92;
      window.speechSynthesis.speak(u);
    } catch (e) {
      /* 忽略：部分浏览器不支持 */
    }
  }

  function applyTheme() {
    var t = ST.settings().theme;
    var dark = t === "dark";
    if (t === "auto" && window.matchMedia) dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }

  function checkDayRollover() {
    var t = SRS.todayKey();
    if (t !== TODAY) {
      TODAY = t;
      render();
    }
  }

  function download(name, text) {
    var blob = new Blob([text], { type: "application/json;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1500);
  }

  function pickFile(cb) {
    var inp = document.createElement("input");
    inp.type = "file";
    inp.accept = ".json,application/json";
    inp.onchange = function () {
      var f = inp.files && inp.files[0];
      if (!f) return;
      var fr = new FileReader();
      fr.onload = function () {
        cb(String(fr.result || ""));
      };
      fr.readAsText(f, "utf-8");
    };
    inp.click();
  }

  function confirmDo(msg) {
    return window.confirm(msg);
  }

  /* ==================== 词条详情渲染 ==================== */

  function exampleHtml(w, maskWord) {
    var ex = (w && w.example) || {};
    if (!ex.en) return "";
    var html;
    var tok = SRS.findToken(ex.en, w);
    if (tok && !maskWord) {
      html =
        esc(ex.en.slice(0, tok.index)) +
        "<em>" +
        esc(ex.en.slice(tok.index, tok.index + tok.length)) +
        "</em>" +
        esc(ex.en.slice(tok.index + tok.length));
    } else {
      html = esc(ex.en);
    }
    return (
      '<div class="detail-box"><div class="detail-label">例句</div><div class="ex-en">' +
      html +
      "</div>" +
      (ex.zh ? '<div class="ex-zh">' + esc(ex.zh) + "</div>" : "") +
      "</div>"
    );
  }

  function similarHtml(w) {
    if (!w.similar || !w.similar.length) return "";
    var rows = w.similar
      .map(function (s) {
        return (
          '<div class="sim-item"><span class="w">' +
          esc(s.word) +
          '</span><span class="m">' +
          esc(s.meaning) +
          (s.note ? '<br><i class="muted">' + esc(s.note) + "</i>" : "") +
          "</span></div>"
        );
      })
      .join("");
    return '<div class="detail-box"><div class="detail-label">形近词 · 易混</div>' + rows + "</div>";
  }

  function formsHtml(w) {
    if (!w.forms || !w.forms.length) return "";
    var rows = w.forms
      .map(function (f) {
        return (
          '<div class="form-item"><span class="w">' +
          esc(f.word) +
          '</span><span class="m">' +
          (f.pos ? esc(f.pos) + " " : "") +
          esc(f.meaning) +
          "</span></div>"
        );
      })
      .join("");
    return '<div class="detail-box"><div class="detail-label">变形 · 派生</div>' + rows + "</div>";
  }

  function fullDetails(w) {
    return exampleHtml(w, false) + morphHtml(w) + (ST.settings().showSimilar ? similarHtml(w) : "") + formsHtml(w);
  }

  /* ---------- 词根词缀 ---------- */

  function shortTxt(s, n) {
    s = String(s == null ? "" : s);
    return s.length > n ? s.slice(0, n - 1) + "…" : s;
  }

  /** 单词卡片上的词根词缀拆解 */
  function morphHtml(w) {
    var a = ST.analysisOf(w);
    if (!a) return "";
    var row = a.parts
      .map(function (p) {
        return (
          '<span class="morph-part ' +
          esc(p.kind) +
          '" title="' +
          esc(ST.morphKindLabel(p.kind) + "：" + p.meaning) +
          '">' +
          "<b>" +
          esc(p.text) +
          "</b><i>" +
          esc(p.meaning) +
          "</i></span>"
        );
      })
      .join('<span class="morph-plus">+</span>');

    var tail = a.complete
      ? '<div class="morph-said">' + esc(a.line) + "</div>"
      : '<div class="morph-said">能认出：' + esc(a.line) + "</div>";
    if (!a.complete && a.rest) {
      tail += '<div class="muted">剩下 <b>' + esc(a.rest) + "</b> 没有对应词素，拆解仅供参考</div>";
    }
    if (a.inflated) tail += '<div class="muted">先还原成 <b>' + esc(a.inflated) + "</b> 再拆</div>";

    var sib = ST.siblingsOf(w, 6);
    if (sib.length) {
      tail +=
        '<div class="morph-sib"><span class="morph-sib-label">同根 / 同缀词</span>' +
        sib
          .map(function (x) {
            return (
              '<span class="chip" title="' +
              esc(x.via.text + "：" + x.via.meaning + "｜" + x.word.meaning) +
              '">' +
              esc(x.word.word) +
              "<i>" +
              esc(shortTxt(x.word.meaning, 8)) +
              "</i></span>"
            );
          })
          .join("") +
        "</div>";
    }
    return '<div class="detail-box"><div class="detail-label">词根词缀</div><div class="morph-row">' + row + "</div>" + tail + "</div>";
  }

  /* ==================== 今日 ==================== */

  function weekdayName(key) {
    return ["日", "一", "二", "三", "四", "五", "六"][SRS.weekday(key)];
  }

  function greeting() {
    var h = new Date().getHours();
    if (h < 6) return "夜深了";
    if (h < 11) return "早上好";
    if (h < 14) return "中午好";
    if (h < 18) return "下午好";
    return "晚上好";
  }

  function renderToday() {
    var s = ST.settings();
    var books = ST.selectedBooks();
    var box = $("#view-today");

    if (!books.length) {
      box.innerHTML =
        '<div class="card empty">还没有选择词书。<br>先去「词书」里挑一本（考研 / 六级 / 雅思 / 托福），再回来开始今天的背诵。<div class="mt16"><button class="btn primary" data-act="nav" data-view="books">去选词书</button></div></div>';
      return;
    }

    var p = ST.plan(TODAY);
    var stats = ST.stats(TODAY);
    var doneUnits = nz(p.newTarget) - nz(p.newPending) + nz(p.reviewedToday) + Math.min(nz(p.quizDone), nz(p.quizTarget));
    var totalUnits = nz(p.newTarget) + nz(p.reviewTarget) + nz(p.quizTarget);
    var overall = totalUnits ? pct(doneUnits, totalUnits) : 100;
    var bookNames = books.map(function (b) {
      return b.name;
    }).join(" · ");

    var allDone = p.newDone && p.reviewDone && p.quizDoneFlag;
    var heroTitle = allDone ? "今天的任务全部完成 🎉" : greeting() + "，今天还有 " + (nz(p.newPending) + nz(p.dueTotal)) + " 个单词";
    var heroSub = p.checkedIn
      ? "已连续打卡 " + stats.streak + " 天，保持住这个节奏"
      : stats.checkedDays
      ? "累计打卡 " + stats.checkedDays + " 天 · 已学 " + stats.totalWords + " 词"
      : "这是你的第一天，从 " + nz(p.newTarget) + " 个新词开始";

    var html = "";
    html +=
      '<div class="card hero"><div class="hero-info">' +
      '<div class="hero-date">' + esc(TODAY + " 星期" + weekdayName(TODAY)) + "</div>" +
      '<div class="hero-title">' + esc(heroTitle) + "</div>" +
      '<div class="hero-sub">' + esc(heroSub) + "</div>" +
      '<div class="hero-chip">' + esc(bookNames) + " · 每日 " + nz(s.dailyNew) + " 词</div>" +
      "</div>" +
      '<div class="ring" style="--p:' + overall + '%"><span>' + overall + "%</span></div>" +
      "</div>";

    // 三项任务
    var newDisabled = nz(p.newPending) === 0;
    var reviewDisabled = nz(p.dueWords.length) === 0;
    var quizDisabled = nz(p.quizTarget) - nz(p.quizDone) <= 0;

    html += '<div class="sec-title">今日任务</div><div class="tasks">';

    html +=
      '<div class="task' + (p.newDone ? " done" : "") + '">' +
      '<div class="task-icon' + (p.newDone ? " ok" : "") + '">新</div>' +
      '<div class="task-main"><div class="task-name">新词学习' +
      (p.newDone ? ' <span class="pill ok">已完成</span>' : "") +
      '</div><div class="task-desc tag-books">按每日 ' + nz(s.dailyNew) + " 词分配 · " + esc(bookNames) + "</div>" +
      '<div class="bar mt8"><i style="width:' + pct(nz(p.newLearned), nz(p.newTarget)) + '%"></i></div>' +
      "</div>" +
      '<div class="task-side"><div class="task-num"><b>' + nz(p.newLearned) + "</b>/" + nz(p.newTarget) + "</div>" +
      '<button class="btn primary sm" data-act="start-new"' + (newDisabled ? " disabled" : "") + ">开始</button></div>" +
      "</div>";

    html +=
      '<div class="task' + (p.reviewDone && nz(p.reviewTarget) > 0 ? " done" : "") + '">' +
      '<div class="task-icon warn">复</div>' +
      '<div class="task-main"><div class="task-name">记忆曲线复习' +
      (p.reviewDone && nz(p.reviewTarget) > 0 ? ' <span class="pill ok">已清空</span>' : "") +
      '</div><div class="task-desc">按 1 / 2 / 4 / 7 / 15 天间隔到期复习，下次复习会自动排期</div>' +
      '<div class="bar mt8"><i style="width:' + pct(nz(p.reviewedToday), nz(p.reviewTarget)) + '%"></i></div>' +
      "</div>" +
      '<div class="task-side"><div class="task-num"><b>' + nz(p.reviewedToday) + "</b>/" + nz(p.reviewTarget) + "</div>" +
      '<button class="btn primary sm" data-act="start-review"' + (reviewDisabled ? " disabled" : "") + ">复习</button></div>" +
      "</div>";

    html +=
      '<div class="task' + (p.quizDoneFlag && nz(p.quizTarget) > 0 ? " done" : "") + '">' +
      '<div class="task-icon ok">填</div>' +
      '<div class="task-main"><div class="task-name">单词填空巩固' +
      (p.quizDoneFlag && nz(p.quizTarget) > 0 ? ' <span class="pill ok">已完成</span>' : "") +
      '</div><div class="task-desc">用今天学过的词出题（例句挖空 / 选词 / 拼写），答错的词自动降级到明天复习</div>' +
      '<div class="bar mt8"><i style="width:' + pct(nz(p.quizDone), nz(p.quizTarget)) + '%"></i></div>' +
      "</div>" +
      '<div class="task-side"><div class="task-num"><b>' + nz(p.quizDone) + "</b>/" + nz(p.quizTarget) + "</div>" +
      '<button class="btn primary sm" data-act="start-quiz"' + (quizDisabled ? " disabled" : "") + ">填空</button></div>" +
      "</div>";

    html += "</div>";

    // 排位赛入口
    var rankPool = ST.day(TODAY).reviewIds.map(ST.wordById).filter(Boolean);
    var rt = RANK.tierInfo(RANK.state().tier);
    html += '<div class="card rank-entry" style="--tc:' + rt.color + '">' +
      '<div class="row between">' +
      '<div><b>' + rt.icon + " 当前段位：" + esc(rt.name) + "</b>" +
      '<div class="muted" style="margin-top:3px">今天已复习 <b>' + rankPool.length + "</b> 个词，可随时开一场排位赛（连对 15 词升 1 星）</div></div>" +
      '<button class="btn sm" data-act="nav" data-view="rank">去排位</button>' +
      "</div></div>";

    // 打卡
    var checkinHtml;
    if (p.checkedIn) {
      checkinHtml =
        '<div class="checkin-row"><button class="checkin-btn checked" disabled>✓ 今日已打卡 · 连续 ' + stats.streak + " 天</button>" +
        '<button class="btn ghost sm" data-act="cancel-checkin">撤销</button></div>';
    } else if (p.readyToCheckIn) {
      checkinHtml = '<div class="checkin-row"><button class="checkin-btn" data-act="checkin">今 日 打 卡</button></div>';
    } else {
      var why = p.rule === "review" ? "还有 " + nz(p.dueTotal) + " 个词等待复习" : "完成上方任务后即可打卡";
      checkinHtml = '<div class="checkin-row"><button class="checkin-btn" disabled>' + esc(why) + "</button></div>";
    }
    html += '<div class="mt20">' + checkinHtml + "</div>";

    // 一周打卡条
    html += '<div class="sec-title">最近 7 天</div><div class="week">';
    for (var i = 6; i >= 0; i--) {
      var k = SRS.addDays(TODAY, -i);
      var d = ST.state().days[k] || {};
      var cls = "week-day" + (k === TODAY ? " today" : "") + (d.checkedIn ? " done" : "");
      html +=
        '<div class="' + cls + '"><div class="wd-name">' + weekdayName(k) + '</div><div class="wd-num">' +
        Number(k.slice(8)) + '</div><div class="wd-dot"></div></div>';
    }
    html += "</div>";

    // 记忆曲线说明
    html +=
      '<div class="sec-title">记忆曲线</div><div class="card">' +
      '<div class="note">每个单词学完后自动排期，间隔依次拉长；「忘记」会让它退回前几个阶段，重新巩固。</div>' +
      '<div class="curve">' +
      SRS.INTERVALS.map(function (v, idx) {
        var h = 16 + (idx / (SRS.INTERVALS.length - 1)) * 34;
        return '<i style="height:' + h + 'px" title="第 ' + (idx + 1) + ' 阶段：' + v + ' 天"></i>';
      }).join("") +
      "</div>" +
      '<div class="note">' + SRS.INTERVALS.join(" → ") + " 天（第 5 阶段起视为已掌握）" +
      "<br>今天到期的复习：" + nz(p.dueTotal) + " 个 · 累计已学：" + nz(stats.totalWords) + " 个 · 已掌握：" + nz(stats.mastered) + " 个</div>" +
      "</div>";

    box.innerHTML = html;
  }

  /* ==================== 词书 ==================== */

  function renderBooks() {
    var s = ST.settings();
    var lib = ST.library();
    var html = '<div class="sec-title">内置词书</div><div class="book-grid">';

    lib.forEach(function (b) {
      var pr = ST.bookProgress(b.id);
      var on = (s.books || []).indexOf(b.id) >= 0;
      html +=
        '<div class="card book-card' + (on ? "" : " off") + '">' +
        '<div class="book-head"><span class="book-dot" style="background:' + b.accent + '"></span><div class="grow">' +
        '<div class="book-name">' + esc(b.name) + ' <span class="pill gray">' + esc(b.tag) + "</span></div>" +
        '<div class="book-desc">' + esc(b.desc) + "</div>" +
        "</div></div>" +
        '<div class="book-meta"><span>总词 <b>' + pr.total + "</b></span><span>已学 <b>" + pr.learned + "</b></span><span>掌握 <b>" + pr.mastered + "</b></span></div>" +
        '<div class="bar"><i style="width:' + pct(pr.learned, pr.total) + "%;background:" + b.accent + '"></i></div>' +
        '<div class="book-foot">' +
        '<button class="switch' + (on ? " on" : "") + '" data-act="book-toggle" data-book="' + b.id + '" title="加入 / 移出每日计划"></button>' +
        '<span class="muted">' + (on ? "已加入每日计划" : "未加入") + "</span>" +
        '<span class="grow"></span>' +
        (pr.learned
          ? '<button class="btn ghost sm danger" data-act="book-reset" data-book="' + b.id + '">重置进度</button>'
          : "") +
        (b.builtin ? "" : '<button class="btn ghost sm danger" data-act="book-remove" data-book="' + b.id + '">删除</button>') +
        "</div></div>";
    });
    html += "</div>";

    // 导入自定义词书
    var pendingHtml = "";
    if (pendingImport) {
      var samples = pendingImport.entries.slice(0, 3).map(function (e) {
        return e.word + " " + e.meaning;
      });
      pendingHtml =
        '<div class="pending mt12"><div class="note">已读取 <b>' + esc(pendingImport.file || "粘贴内容") + "</b>：识别到 <b>" +
        nz(pendingImport.size) + "</b> 个单词" + (samples.length ? "<br>例如：" + esc(samples.join(" / ")) : "") + "</div>" +
        '<div class="row mt8"><button class="btn primary" data-act="import-confirm">确认导入《' + esc(pendingImport.name) + "》</button>" +
        '<button class="btn ghost" data-act="import-cancel">取消</button></div></div>';
    }
    html +=
      '<div class="sec-title">导入自己的词书</div><div class="card" id="importCard">' +
      '<div class="note"><b>支持 txt 词表文件</b>（UTF-8 / GBK 自动识别），也可以直接粘贴文本。每行一个词：<code>word 中文释义</code>，也可以用逗号、分号、Tab、| 分隔；<b>只有单词没有释义也能导入</b>，考试时改用音标 / 拼写方式考查。</div>' +
      '<div class="row mt12"><input class="num-input grow" id="customName" placeholder="词书名，例如：专业课术语" style="text-align:left;width:auto;max-width:280px" value="">' +
      '<button class="btn" data-act="import-file">选择 txt 文件</button>' +
      '<button class="btn primary" data-act="import-text">导入粘贴内容</button></div>' +
      '<div class="drop mt12" data-act="import-file" id="importDrop">把 .txt 词表文件拖到这里，或点击选择文件</div>' +
      '<textarea class="ta mt12" id="customText" placeholder="abandon 放弃；抛弃&#10;abundant 丰富的&#10;ambiguous, 模糊的&#10;（只有单词也行：resilience）"></textarea>' +
      pendingHtml +
      '<div class="note mt8">导入的词没有例句时，会自动改用「看释义选单词」或「看音标拼写」出题，所以任意规模的词表都能用。</div>' +
      "</div>";

    html +=
      '<div class="sec-title">当前计划</div><div class="card"><div class="note">每日新词 <b>' + nz(s.dailyNew) +
      "</b> 个 · 每日填空 <b>" + nz(s.quizCount) + "</b> 题 · 复习上限 <b>" + nz(s.reviewLimit) +
      '</b> 个 · 打卡条件：<b>' + esc(ruleText(s.checkinRule)) + "</b><br>以上都可以在「设置」里调整。</div></div>";

    $("#view-books").innerHTML = html;
  }

  function ruleText(r) {
    if (r === "review") return "完成复习";
    if (r === "manual") return "手动打卡";
    return "全部任务完成";
  }

  /* ==================== 统计 ==================== */

  function renderStats() {
    var st = ST.stats(TODAY);
    var days = ST.state().days;
    var totalMs = 0;
    Object.keys(days).forEach(function (k) {
      totalMs += nz(days[k].ms);
    });
    var hours = Math.floor(totalMs / 3600000);
    var mins = Math.round((totalMs % 3600000) / 60000);

    var html = '<div class="tiles">';
    html += tile("累计打卡", st.checkedDays, "天");
    html += tile("连续打卡", st.streak, "天");
    html += tile("已学单词", st.totalWords, "词");
    html += tile("已掌握", st.mastered, "词");
    html += tile("填空正确率", st.accuracy, "%");
    html += tile("累计学习", hours ? hours : mins, hours ? "小时" : "分钟");
    html += "</div>";

    // 14 天柱状
    var max = 1;
    st.series.forEach(function (d) {
      max = Math.max(max, d.new + d.review + d.quizTotal);
    });
    html += '<div class="sec-title">最近 14 天</div><div class="card"><div class="chart">';
    st.series.forEach(function (d) {
      var total = d.new + d.review + d.quizTotal;
      var scale = 96 / max;
      html +=
        '<div class="chart-col" title="' + esc(d.date + " · 新词 " + d.new + " · 复习 " + d.review + " · 填空 " + d.quizTotal) + '">' +
        '<div class="chart-stack">' +
        (d.quizTotal ? '<div class="chart-seg q" style="height:' + Math.max(2, Math.round(d.quizTotal * scale)) + 'px"></div>' : "") +
        (d.review ? '<div class="chart-seg rev" style="height:' + Math.max(2, Math.round(d.review * scale)) + 'px"></div>' : "") +
        (d.new ? '<div class="chart-seg new" style="height:' + Math.max(2, Math.round(d.new * scale)) + 'px"></div>' : "") +
        (total ? "" : '<div class="chart-seg new" style="height:2px;opacity:.25"></div>') +
        "</div>" +
        '<div class="chart-label">' + esc(d.label.slice(3)) + "</div>" +
        "</div>";
    });
    html += "</div>";
    html +=
      '<div class="legend"><span><i style="background:var(--accent)"></i>新词</span><span><i style="background:color-mix(in srgb, var(--accent) 45%, var(--card))"></i>复习</span><span><i style="background:var(--ok)"></i>填空</span></div>';
    html += "</div>";

    // 热力图
    html +=
      '<div class="sec-title">打卡热力图（近 17 周）</div><div class="card"><div class="heat">' +
      st.heat
        .map(function (c) {
          return (
            '<i data-lv="' + c.level + '" data-check="' + (c.checkedIn ? 1 : 0) + '" data-future="' + (c.future ? 1 : 0) +
            '" title="' + esc(c.date + " · 新词 " + c.new + " · 复习 " + c.review + (c.checkedIn ? " · 已打卡" : "")) + '"></i>'
          );
        })
        .join("") +
      "</div>" +
      '<div class="legend"><span>每天学习量越高颜色越深</span><span><i style="background:transparent;border:1.5px solid var(--ok)"></i>已打卡</span></div>' +
      '<div class="note mt8">最长连续打卡 <b>' + st.bestStreak + "</b> 天 · 有学习记录的天数 <b>" + st.studyDays + "</b> 天 · 累计新词 <b>" + st.totalNew + "</b> 个 · 累计复习 <b>" + st.totalReview + "</b> 次</div>" +
      "</div>";

    // 词书进度
    html += '<div class="sec-title">词书进度</div><div class="card set-list">';
    st.books.forEach(function (b) {
      html +=
        '<div class="set-row"><div class="set-main"><div class="set-name">' + esc(b.name) +
        ' <span class="pill gray">' + esc(b.tag) + "</span></div>" +
        '<div class="bar mt8"><i style="width:' + pct(b.learned, b.total) + "%;background:" + b.accent + '"></i></div>' +
        '<div class="set-desc">已学 ' + b.learned + " / " + b.total + " · 已掌握 " + b.mastered + (b.selected ? " · 在每日计划中" : "") + "</div>" +
        "</div></div>";
    });
    html += "</div>";

    // 记忆阶段分布
    html += '<div class="sec-title">记忆阶段分布</div><div class="card">';
    var stageMax = 1;
    st.stageBuckets.forEach(function (n) {
      stageMax = Math.max(stageMax, n);
    });
    var bucketSum = st.stageBuckets.reduce(function (a, b) {
      return a + b;
    }, 0);
    if (!bucketSum) {
      html += '<div class="empty">还没有学习记录</div>';
    } else {
      st.stageBuckets.forEach(function (n, idx) {
        html +=
          '<div class="set-row"><div class="set-main"><div class="set-name">' + esc(SRS.labelOf(idx)) +
          '</div><div class="bar mt8"><i style="width:' + pct(n, stageMax) + '%"></i></div></div>' +
          '<div class="task-num"><b>' + n + "</b> 词</div></div>";
      });
    }
    html += "</div>";

    if (st.tough) {
      html +=
        '<div class="sec-title">需要重点关照</div><div class="card"><div class="note">有 <b>' +
        st.tough +
        "</b> 个词已经反复遗忘 3 次以上。它们会在复习队列里优先出现，也可以把每日新词量调小一点，先消化旧词。</div></div>";
    }

    $("#view-stats").innerHTML = html;
  }

  function tile(label, value, unit) {
    return (
      '<div class="tile"><div class="t-label">' + esc(label) + '</div><div class="t-value">' + nz(value) +
      (unit ? "<small>" + esc(unit) + "</small>" : "") +
      "</div></div>"
    );
  }

  /* ==================== 词根词缀 ==================== */

  var ROOT_MAX = 120; // 一次最多渲染多少条，剩下的靠搜索

  /** 按「词库里命中数」排序的搜索结果：有用的排前面 */
  function rootResults() {
    var idx = ST.morphIndex();
    var hit = function (id) {
      return idx[id] ? idx[id].words.length : 0;
    };
    var list = ST.searchMorph(rootQ, rootKind).slice();
    list.sort(function (a, b) {
      var d = hit(b.id) - hit(a.id);
      if (d) return d;
      var la = (a.forms && a.forms[0] ? a.forms[0] : a.id).length;
      var lb = (b.forms && b.forms[0] ? b.forms[0] : b.id).length;
      if (la !== lb) return lb - la;
      return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
    });
    return list;
  }

  function rootCardHtml(e) {
    var words = ST.morphWords(e.id, 8);
    var learned = ST.state().words;
    var h = '<div class="rcard k-' + esc(e.kind) + '">';
    h +=
      '<div class="rcard-head"><b class="rcard-text">' +
      esc(e.text) +
      '</b><span class="tag t-' +
      esc(e.kind) +
      '">' +
      esc(ST.morphKindLabel(e.kind)) +
      '</span><span class="rcard-meaning">' +
      esc(e.meaning) +
      "</span></div>";
    if (e.note) h += '<div class="rcard-note">' + esc(e.note) + "</div>";
    if (e.examples && e.examples.length) {
      h += '<div class="rcard-ex">例词：' + e.examples.map(esc).join(" · ") + "</div>";
    }
    if (words.length) {
      h +=
        '<div class="rcard-words"><span class="morph-sib-label">你的词库里用到它</span>' +
        words
          .map(function (w) {
            return (
              '<span class="chip' +
              (learned[w.id] ? " learned" : "") +
              '" title="' +
              esc(w.meaning) +
              '">' +
              esc(w.word) +
              "<i>" +
              esc(shortTxt(w.meaning, 10)) +
              "</i></span>"
            );
          })
          .join("") +
        "</div>";
    }
    return h + "</div>";
  }

  function rootListHtml(shown, total) {
    if (!shown.length) {
      return '<div class="empty">没找到匹配的词根词缀。<br>可以直接搜中文含义，比如「看」「引导」「不」。</div>';
    }
    var h = shown.map(rootCardHtml).join("");
    if (total > shown.length) {
      h += '<div class="muted center mt16">还有 ' + (total - shown.length) + " 个，输入关键词继续缩小范围</div>";
    }
    return h;
  }

  /** 只刷列表，不重建输入框（否则打字会掉焦点） */
  function renderRootList() {
    var el = $("#rootList");
    if (!el) return;
    var list = rootResults();
    el.innerHTML = rootListHtml(list.slice(0, ROOT_MAX), list.length);
  }

  function renderRoots() {
    var box = $("#view-roots");
    if (!ST.hasMorph()) {
      box.innerHTML =
        '<div class="card empty">没有读到词根词缀库。<br>确认 js/data/ 里的 morph-prefix.js、morph-suffix.js、morph-root-a.js、morph-root-m.js 都在。</div>';
      return;
    }
    var st = ST.morphStats();
    var list = rootResults();

    var html = '<div class="card root-top">';
    html +=
      '<input class="ta root-q" id="rootQ" type="search" autocomplete="off" spellcheck="false" value="' +
      esc(rootQ) +
      '" placeholder="搜词根 / 词缀 / 中文含义 / 例词 —— 如 duc、看、transport">';
    html +=
      '<div class="root-seg">' +
      seg(
        [
          { v: "all", t: "全部 " + st.total },
          { v: "prefix", t: "前缀 " + st.byKind.prefix },
          { v: "root", t: "词根 " + st.byKind.root },
          { v: "suffix", t: "后缀 " + st.byKind.suffix }
        ],
        rootKind,
        "root-kind",
        "data-kind"
      ) +
      "</div>";
    html +=
      '<div class="muted">当前 ' +
      st.words +
      " 个词里，有 " +
      st.covered +
      " 个能拆出词根词缀；下面按「你词库里命中多少词」排序。</div>";
    html += "</div>";

    box.innerHTML = html + '<div class="card root-list" id="rootList">' + rootListHtml(list.slice(0, ROOT_MAX), list.length) + "</div>";
  }

  /* ==================== 设置 ==================== */

  function seg(list, current, act, dataKey) {
    return (
      '<div class="seg">' +
      list
        .map(function (item) {
          return (
            '<button data-act="' + act + '" ' + dataKey + '="' + item.v + '" class="' +
            (String(current) === String(item.v) ? "active" : "") +
            '">' + esc(item.t) + "</button>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function renderSettings() {
    var s = ST.settings();
    var html = '<div class="sec-title">学习计划</div><div class="card set-list">';

    html +=
      '<div class="set-row"><div class="set-main"><div class="set-name">每日新词量</div><div class="set-desc">每天新学多少个单词（未学完的会顺延到明天）</div></div>' +
      '<div class="row">' +
      seg([{ v: 10, t: "10" }, { v: 15, t: "15" }, { v: 20, t: "20" }, { v: 30, t: "30" }, { v: 50, t: "50" }], s.dailyNew, "set-daily", "data-n") +
      '<input class="num-input" id="dailyNewInput" type="number" min="1" max="500" value="' + nz(s.dailyNew) + '">' +
      "</div></div>";

    html +=
      '<div class="set-row"><div class="set-main"><div class="set-name">每日填空题量</div><div class="set-desc">当天末尾的巩固填空，题目来自今天学过的例句</div></div>' +
      seg([{ v: 0, t: "关闭" }, { v: 5, t: "5" }, { v: 10, t: "10" }, { v: 15, t: "15" }, { v: 20, t: "20" }], s.quizCount, "set-quiz", "data-n") +
      "</div>";

    html +=
      '<div class="set-row"><div class="set-main"><div class="set-name">每日复习上限</div><div class="set-desc">到期词太多时，先复习最该复习的那部分（按到期时间排序）</div></div>' +
      seg([{ v: 50, t: "50" }, { v: 100, t: "100" }, { v: 200, t: "200" }, { v: 2000, t: "不限" }], s.reviewLimit, "set-review", "data-n") +
      "</div>";

    html +=
      '<div class="set-row"><div class="set-main"><div class="set-name">打卡条件</div><div class="set-desc">满足什么才算今天打卡成功</div></div>' +
      seg([{ v: "all", t: "全部完成" }, { v: "review", t: "完成复习" }, { v: "manual", t: "手动打卡" }], s.checkinRule, "set-rule", "data-rule") +
      "</div>";

    html += "</div>";

    html += '<div class="sec-title">偏好</div><div class="card set-list">';
    html +=
      '<div class="set-row"><div class="set-main"><div class="set-name">自动朗读</div><div class="set-desc">出现新卡片时用系统语音读出单词</div></div>' +
      '<button class="switch' + (s.autoSpeak ? " on" : "") + '" data-act="toggle-speak"></button></div>';

    html +=
      '<div class="set-row"><div class="set-main"><div class="set-name">显示形近词</div><div class="set-desc">在卡片下方展示易混词辨析</div></div>' +
      '<button class="switch' + (s.showSimilar ? " on" : "") + '" data-act="toggle-similar"></button></div>';

    html +=
      '<div class="set-row"><div class="set-main"><div class="set-name">主题</div><div class="set-desc">跟随系统，或手动指定</div></div>' +
      seg([{ v: "auto", t: "自动" }, { v: "light", t: "浅色" }, { v: "dark", t: "深色" }], s.theme, "set-theme", "data-theme") +
      "</div>";

    html += "</div>";

    // 记忆曲线说明
    html +=
      '<div class="sec-title">记忆曲线怎么安排的</div><div class="card"><div class="note">' +
      "每学一个新词，就按 <b>" + SRS.INTERVALS.join(" → ") + " 天</b>的间隔排期：<br>" +
      "· 选「熟练」→ 直接跳到下一阶段（2 天后复习）<br>" +
      "· 选「一般」→ 明天再复习一次<br>" +
      "· 选「忘记」/ 填空答错 → 退回前两个阶段，并重新排进当天或次日队列<br>" +
      "阶段到第 5 个（15 天间隔）之后记为「已掌握」，但依然会在 30 / 60 / 120 天时回到复习队列。" +
      "</div></div>";

    // 数据管理
    html +=
      '<div class="sec-title">数据</div><div class="card set-list">' +
      '<div class="set-row"><div class="set-main"><div class="set-name">导出备份</div><div class="set-desc">把学习记录导出成 JSON，换浏览器 / 换电脑时可以再导入</div></div>' +
      '<button class="btn sm" data-act="export">导出</button></div>' +
      '<div class="set-row"><div class="set-main"><div class="set-name">导入备份</div><div class="set-desc">会覆盖当前记录，请谨慎操作</div></div>' +
      '<button class="btn sm" data-act="import">选择文件</button></div>' +
      '<div class="set-row"><div class="set-main"><div class="set-name">清空学习记录</div><div class="set-desc">保留词书与设置，只清掉背诵进度和打卡记录</div></div>' +
      '<button class="btn sm danger" data-act="wipe">清空</button></div>' +
      '<div class="set-row"><div class="set-main"><div class="set-name">恢复出厂设置</div><div class="set-desc">删除全部本地数据（包括自定义词书）</div></div>' +
      '<button class="btn sm danger" data-act="factory">重置</button></div>' +
      "</div>";

    html +=
      '<div class="sec-title">关于</div><div class="card"><div class="note">' +
      "简词是一个纯前端的小工具：不需要联网、不需要安装、不上传任何数据，所有记录都存在浏览器 localStorage 里。" +
      "把整个文件夹拷到别的电脑，用浏览器打开 <code>index.html</code> 就能继续用。" +
      "<br>词库共 " + ST.allWords().length + " 词（考研 / 六级 / 雅思 + 自定义）。" +
      "</div></div>";

    $("#view-settings").innerHTML = html;
  }

  /* ==================== 排位赛与排行榜 ==================== */

  function tierBadge(tier, stars, small) {
    var t = RANK.tierInfo(tier);
    var dots = "";
    for (var i = 0; i < RANK.STARS_PER_TIER; i++) {
      dots += '<span class="star' + (i < stars ? " on" : "") + '">★</span>';
    }
    return '<span class="tier-badge' + (small ? " sm" : "") + '" style="--tc:' + t.color + '">' +
      '<span class="tier-ico">' + t.icon + "</span>" + esc(t.name) +
      '<span class="tier-stars">' + dots + "</span></span>";
  }

  function renderRank() {
    var rs = RANK.state();
    var p = ST.plan(TODAY);
    var stats = ST.stats(TODAY);
    var pool = ST.day(TODAY).reviewIds.map(ST.wordById).filter(Boolean);
    var t = RANK.tierInfo(rs.tier);
    var totalStars = RANK.totalStars(rs);
    var maxed = rs.tier >= RANK.TIERS.length - 1 && rs.stars >= RANK.STARS_PER_TIER;

    var html = "";
    // 我的段位卡
    html += '<div class="card rank-hero" style="--tc:' + t.color + '">' +
      '<div class="rank-hero-main">' +
      '<div class="rank-hero-ico">' + t.icon + "</div>" +
      '<div class="grow"><div class="rank-hero-tier">' + esc(t.name) +
      ' <span class="tier-stars big">' + dots3(rs.stars) + "</span></div>" +
      '<div class="muted">总星数 ' + totalStars + " · 最佳连击 " + nz(rs.best) +
      " · 已学 " + nz(stats.totalWords) + " 词</div>" +
      "</div></div>" +
      '<div class="rank-goal">' + (maxed
        ? "已达最高段位，传说中的奶娃 👶"
        : "再连续答对 <b>" + RANK.GOAL + "</b> 个复习词升 1 星") + "</div>" +
      "</div>";

    // 排位赛入口
    html += '<div class="card" style="padding:16px 18px">' +
      '<div class="row between">' +
      "<div><b>🎯 排位赛</b>" +
      '<div class="muted" style="margin-top:3px">题目与今天的复习词一致（今天已复习 <b>' + pool.length + "</b> 个）· 连续答对 15 个升 1 星</div></div>" +
      '<button class="btn primary sm" data-act="start-rank"' + (pool.length ? "" : " disabled") + ">开始挑战</button>" +
      "</div>" +
      (pool.length ? "" : '<div class="muted" style="margin-top:8px">先去完成今日复习，复习过的词才会进入排位赛题池</div>') +
      "</div>";

    // 段位一览
    html += '<div class="sec-title">段位一览</div><div class="tiers">';
    RANK.TIERS.forEach(function (tp, i) {
      html += '<div class="tier-chip' + (i === rs.tier ? " me" : "") + '" style="--tc:' + tp.color + '">' +
        '<span class="tier-ico">' + tp.icon + "</span>" + esc(tp.name) + "</div>";
    });
    html += "</div>";

    // 昵称
    html += '<div class="card" style="padding:14px 18px;margin-top:16px">' +
      '<div class="row between"><span class="muted">排行榜昵称</span></div>' +
      '<div class="row" style="margin-top:8px">' +
      '<input id="rankNick" class="cmt-input" maxlength="20" placeholder="留空显示「匿名同学」" value="' + esc(rs.nick) + '">' +
      '<button class="btn ghost sm" data-act="rank-nick-save">保存</button></div></div>';

    // 排行榜
    html += '<div class="row between" style="margin:16px 2px 10px"><b>🏆 全站排行榜</b>' +
      '<button class="btn ghost sm" data-act="rank-refresh">刷新</button></div>' +
      '<div id="rankBoard"><div class="cmt-empty">正在加载排行榜…</div></div>';

    $("#view-rank").innerHTML = html;
    loadBoard();
  }

  function dots3(stars) {
    var s = "";
    for (var i = 0; i < RANK.STARS_PER_TIER; i++) s += '<span class="star' + (i < stars ? " on" : "") + '">★</span>';
    return s;
  }

  function loadBoard() {
    var el = $("#rankBoard");
    if (!el) return;
    if (!RANK.hasCloud()) {
      el.innerHTML = '<div class="cmt-empty">排行榜服务暂时不可用，稍后再试试～</div>';
      return;
    }
    RANK.fetchBoard(50).then(function (res) {
      if (!$("#rankBoard")) return;
      if (res.error || !res.data) {
        el.innerHTML = '<div class="cmt-empty">排行榜加载失败：' + esc((res.error && res.error.message) || "未知错误") + "</div>";
        return;
      }
      var rows = res.data || [];
      if (!rows.length) {
        el.innerHTML = '<div class="cmt-empty">还没有人上榜，打一局排位赛抢占第一 ✨</div>';
        return;
      }
      var me = RANK.state().pid;
      var medals = ["🥇", "🥈", "🥉"];
      el.innerHTML = rows.map(function (r, i) {
        var tp = RANK.tierInfo(r.tier);
        return '<div class="cmt rank-row' + (r.player_id === me ? " me" : "") + '">' +
          '<div class="cmt-head">' +
          '<span class="rank-no">' + (medals[i] || i + 1) + "</span>" +
          '<div class="cmt-ava" style="background:' + tp.color + '">' + tp.icon + "</div>" +
          '<span class="cmt-name">' + esc(r.nickname || "匿名同学") + "</span>" +
          '<span class="tier-badge sm" style="--tc:' + tp.color + '"><span class="tier-ico">' + tp.icon + "</span>" + esc(tp.name) +
          '<span class="tier-stars">' + dots3(r.stars) + "</span></span>" +
          '<span class="rank-meta">学 ' + nz(r.learned) + " 词</span>" +
          "</div></div>";
      }).join("");
    });
  }

  function startRank() {
    var pool = ST.day(TODAY).reviewIds.map(ST.wordById).filter(Boolean);
    if (!pool.length) return toast("先完成今日复习，再来排位赛");
    session = {
      mode: "rank",
      pool: pool,
      q: RANK.buildQuestion(pool, ST.allWords()),
      streak: 0,
      answered: 0,
      right: 0,
      state: "asking",
      picked: -1,
      started: Date.now()
    };
    openOverlay("🏆 排位赛 · " + RANK.tierInfo(RANK.state().tier).name);
    renderSession();
  }

  function renderRankQuiz() {
    var q = session.q;
    var rs = RANK.state();
    var t = RANK.tierInfo(rs.tier);
    var html = '<div class="rank-status">' +
      '<span class="tier-badge" style="--tc:' + t.color + '"><span class="tier-ico">' + t.icon + "</span>" + esc(t.name) +
      '<span class="tier-stars">' + dots3(rs.stars) + "</span></span>" +
      '<span class="rank-streak">连击 <b>' + session.streak + "</b> / " + RANK.GOAL + "</span>" +
      "</div>";
    html += '<div class="bar ov-bar2"><i style="width:' + pct(session.streak, RANK.GOAL) + '%"></i></div>';

    if (session.state === "asking" || session.state === "feedback") {
      html += '<div class="scard rank-card"><div class="word-line"><span class="word">' + esc(q.word.word) + "</span>" +
        '<button class="speak-btn" data-act="speak-current" title="朗读">🔊</button></div>' +
        (q.word.phonetic ? '<div class="phonetic">' + esc(q.word.phonetic) + "</div>" : "") +
        '<div class="reveal-hint">选出正确的中文释义</div></div>';
      html += '<div class="rank-opts">';
      q.options.forEach(function (o, i) {
        var cls = "rank-opt";
        if (session.state === "feedback") {
          if (o.ok) cls += " ok";
          else if (i === session.picked) cls += " bad";
        }
        html += '<button class="' + cls + '" data-act="rank-pick" data-i="' + i + '"' +
          (session.state === "feedback" ? " disabled" : "") + ">" + esc(o.text) + "</button>";
      });
      html += "</div>";
      if (session.state === "feedback") {
        html += '<div class="kbd-hint">' +
          (session.lastOk
            ? "✅ 答对了 · 连击 " + session.streak + " / " + RANK.GOAL
            : "❌ 正确答案已标绿 · 连击清零，稳住再来") + "</div>";
        html += '<div class="ov-foot"><button class="btn primary sm" data-act="rank-next">下一题（空格）</button></div>';
      } else {
        html += '<div class="kbd-hint">已答 ' + session.answered + " 题 · 答对 " + session.right + " 题</div>";
      }
    }
    html += '<div class="ov-foot"><button class="btn ghost" data-act="exit-session">结束排位（保留段位）</button></div>';
    $("#ovBody").innerHTML = html;
  }

  function rankPick(i) {
    if (!session || session.mode !== "rank" || session.state !== "asking") return;
    var q = session.q;
    var ok = !!(q.options[i] && q.options[i].ok);
    session.picked = i;
    session.answered += 1;
    session.lastOk = ok;
    if (ok) {
      session.right += 1;
      session.streak += 1;
      if (session.streak > nz(RANK.state().best)) {
        RANK.state().best = session.streak;
        RANK.save();
      }
      if (session.streak >= RANK.GOAL) {
        var kind = RANK.promote();
        session.streak = 0;
        RANK.save();
        reportRank();
        if (kind === "tier") {
          toast("🎉 晋级 " + RANK.tierInfo(RANK.state().tier).name + " 段位！", "ok");
        } else if (kind === "star") {
          toast("⭐ 升 1 星！", "ok");
        } else {
          toast("🍼 已站上最高段位「奶娃」！", "ok");
        }
      }
    } else {
      session.streak = 0;
    }
    session.state = "feedback";
    renderSession();
  }

  function rankNext() {
    if (!session || session.mode !== "rank") return;
    session.q = RANK.buildQuestion(session.pool, ST.allWords());
    if (!session.q) return closeOverlay();
    session.state = "asking";
    session.picked = -1;
    renderSession();
  }

  function reportRank() {
    var stats = ST.stats(TODAY);
    RANK.report({ learned: nz(stats.totalWords), mastered: nz(stats.mastered) });
  }

  /* ==================== 总渲染 ==================== */

  function render() {
    applyTheme();
    VIEWS.forEach(function (v) {
      var el = $("#view-" + v);
      if (el) el.classList.toggle("active", v === view);
    });
    var tabs = document.querySelectorAll("#tabs .tab");
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.toggle("active", tabs[i].getAttribute("data-view") === view);
    }
    if (view === "today") renderToday();
    else if (view === "books") renderBooks();
    else if (view === "roots") renderRoots();
    else if (view === "stats") renderStats();
    else if (view === "rank") renderRank();
    else renderSettings();
  }

  function go(v) {
    if (VIEWS.indexOf(v) < 0) v = "today";
    view = v;
    if (location.hash !== "#" + v) {
      try {
        history.replaceState(null, "", "#" + v);
      } catch (e) {
        /* file:// 下部分浏览器限制，忽略 */
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    render();
  }

  /* ==================== 学习浮层 ==================== */

  function openOverlay(title) {
    $("#overlay").hidden = false;
    $("#ovTitle").textContent = title;
    document.body.style.overflow = "hidden";
  }

  function closeOverlay() {
    if (session) flushTime();
    session = null;
    $("#overlay").hidden = true;
    document.body.style.overflow = "";
    render();
  }

  function flushTime() {
    if (!session || !session.started) return;
    var ms = Date.now() - session.started;
    session.started = Date.now();
    if (ms > 1000) {
      var d = ST.day(TODAY);
      d.ms = nz(d.ms) + ms;
      ST.save();
    }
  }

  function startSession(mode) {
    var p = ST.plan(TODAY);
    if (mode === "new") {
      var q = p.pendingWords.slice();
      if (!q.length) return toast("今天的新词已经学完啦");
      session = { mode: "new", queue: q, total: q.length, seen: {}, wrong: [], revealed: false, started: Date.now() };
      openOverlay("新词学习");
    } else if (mode === "review") {
      var q2 = p.dueWords.slice();
      if (!q2.length) return toast("暂时没有到期的复习词");
      session = { mode: "review", queue: q2, total: q2.length, seen: {}, wrong: [], revealed: false, started: Date.now() };
      openOverlay("记忆曲线复习");
    } else {
      var need = nz(p.quizTarget) - nz(p.quizDone);
      if (need <= 0) {
        if (!nz(p.quizTarget)) return toast("先在设置里开启填空题量，或先学几个新词");
        return toast("今天的填空已经完成啦");
      }
      var qs = SRS.buildQuiz(p.quizPool, need, ST.allWords());
      if (!qs.length) return toast("词库太小，暂时出不了题");
      inputCache = "";
      session = {
        mode: "quiz",
        questions: qs,
        index: 0,
        right: 0,
        wrong: [],
        state: "asking",
        picked: -1,
        started: Date.now()
      };
      openOverlay("单词填空 · 巩固");
    }
    renderSession();
  }

  function progressText() {
    if (!session) return "";
    if (session.mode === "quiz") return session.index + 1 + " / " + session.questions.length + " 题";
    if (session.mode === "rank") return "答对 " + session.right + " / " + session.answered;
    var done = Object.keys(session.seen).length;
    return done + " / " + session.total + " 词";
  }

  function renderSession() {
    if (!session) return;
    $("#ovCount").textContent = progressText();
    var ratio;
    if (session.mode === "quiz") {
      ratio = session.questions.length ? pct(session.index, session.questions.length) : 0;
    } else {
      ratio = session.total ? pct(Object.keys(session.seen).length, session.total) : 0;
    }
    $("#ovBar").style.width = ratio + "%";

    if (session.mode === "quiz") renderQuiz();
    else if (session.mode === "rank") renderRankQuiz();
    else renderCard();
  }

  function statusLine(w) {
    var st = ST.state().words[w.id];
    if (!st || session.mode === "new") return "";
    var bits = [];
    bits.push("已复习 " + nz(st.seen) + " 次");
    if (nz(st.lapses)) bits.push("遗忘 " + nz(st.lapses) + " 次");
    bits.push("下次 " + SRS.labelOf(st.stage));
    return bits.join(" · ");
  }

  function renderCard() {
    var w = session.queue[0];
    if (!w) return renderRoundSummary();
    var isQuizNext = false;
    var revealed = session.revealed;
    var s = ST.settings();

    var html =
      '<div class="scard' + (revealed ? "" : " tap-mask") + '"' + (revealed ? "" : ' data-act="reveal"') + ">" +
      '<div class="word-line"><span class="word">' + esc(w.word) + "</span>" +
      '<button class="speak-btn" data-act="speak-current" title="朗读（不影响作答）">🔊</button></div>' +
      (w.phonetic ? '<div class="phonetic">' + esc(w.phonetic) + "</div>" : "") +
      (revealed
        ? '<div class="meaning">' + (w.pos ? '<span class="pos">' + esc(w.pos) + "</span>" : "") + esc(w.meaning) + "</div>" +
          '<div class="detail">' + fullDetails(w) + "</div>"
        : '<div class="reveal-hint">想一想它的意思，然后点击卡片 / 按空格查看释义</div>') +
      "</div>";

    if (revealed) {
      html +=
        '<div class="rate-bar">' +
        '<button class="rate-btn know" data-act="rate" data-rating="know">熟练<small>1 · 拉长间隔</small></button>' +
        '<button class="rate-btn fuzzy" data-act="rate" data-rating="fuzzy">一般<small>2 · 明天再来</small></button>' +
        '<button class="rate-btn forgot" data-act="rate" data-rating="forgot">忘记<small>3 · 重新排期</small></button>' +
        "</div>";
      html += '<div class="kbd-hint">' + esc(statusLine(w) || (s.autoSpeak ? "可以用 🔊 再听一遍" : "")) +
        "</div>";
    } else {
      html += '<div class="kbd-hint">按 <kbd>空格</kbd> 显示释义</div>';
    }

    html +=
      '<div class="ov-foot">' +
      '<button class="btn ghost" data-act="exit-session">先休息一下</button>' +
      "</div>";

    $("#ovBody").innerHTML = html;
    if (session.spokeFor !== w.id) {
      session.spokeFor = w.id;
      if (s.autoSpeak) speak(w.word);
    }
  }

  function rate(rating) {
    var w = session.queue.shift();
    if (!w) return;
    if (session.mode === "new") ST.learnWord(w.id, rating, TODAY);
    else ST.reviewWord(w.id, rating, TODAY);
    session.seen[w.id] = true;
    if (rating === "forgot") {
      session.wrong.push(w);
      // 忘记的词插回本轮队列，稍后再看一次
      var pos = Math.min(3, session.queue.length);
      session.queue.splice(pos, 0, w);
    }
    session.revealed = false;
    session.spokeFor = null;
    renderSession();
    if (!session) render();
  }

  function renderRoundSummary() {
    flushTime();
    var total = session.total;
    var wrong = session.wrong;
    var uniqWrong = [];
    var seen = {};
    wrong.forEach(function (w) {
      if (!seen[w.id]) {
        seen[w.id] = 1;
        uniqWrong.push(w);
      }
    });
    var p = ST.plan(TODAY);
    var html =
      '<div class="result">' +
      '<div class="result-title">' + (session.mode === "new" ? "今天的新词学完了 🎉" : "本轮复习完成") + "</div>" +
      '<div class="result-sub">' + total + " 个词 · 其中 " + uniqWrong.length + " 个需要再巩固</div>" +
      (uniqWrong.length
        ? '<div class="sec-title" style="text-align:left">忘记的词</div><div class="wrong-list">' +
          uniqWrong
            .map(function (w) {
              return '<div class="wrong-item"><span class="w">' + esc(w.word) + '</span><span class="m">' + esc(w.meaning) + "</span></div>";
            })
            .join("") +
          "</div>"
        : "") +
      "</div>";

    var canContinue = session.mode === "review" && nz(p.dueWords.length) > 0;
    html +=
      '<div class="ov-foot">' +
      (canContinue
        ? '<button class="btn primary" data-act="continue-session">继续复习 ' + nz(p.dueWords.length) + " 个</button>"
        : nz(p.quizTarget) - nz(p.quizDone) > 0
        ? '<button class="btn primary" data-act="start-quiz">去填空巩固</button>'
        : "") +
      '<button class="btn" data-act="exit-session">回到首页</button>' +
      "</div>";
    $("#ovBody").innerHTML = html;
    $("#ovCount").textContent = "完成";
    $("#ovBar").style.width = "100%";
  }

  /* ---------------- 填空 ---------------- */

  function renderQuiz() {
    var q = session.questions[session.index];
    if (!q) return renderQuizResult();
    var html = '<div class="quiz-box">';

    if (q.type === "blank") {
      html +=
        '<div><div class="detail-label">' + (q.spell ? "根据提示写出单词" : "把句子补充完整") + "</div>" +
        '<div class="quiz-prompt">' + highlightBlank(q.prompt) + "</div>" +
        (q.zh ? '<div class="quiz-zh' + (session.state === "asking" ? " blur" : "") + '">' + esc(q.zh) + "</div>" : "") +
        "</div>";
    } else {
      html +=
        '<div><div class="detail-label">选出对应的单词</div>' +
        '<div class="quiz-prompt">' + esc(q.prompt) + "</div>" +
        '<div class="quiz-zh">' + (q.word.phonetic ? esc(q.word.phonetic) : "结合词性和释义判断") + "</div></div>";
    }

    if (session.state === "asking") {
      if (q.type === "blank") {
        html +=
          '<div class="quiz-input-row"><input class="quiz-input" id="quizInput" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="输入这个单词…">' +
          '<button class="btn primary" data-act="quiz-submit">检查</button></div>' +
          '<div class="row"><button class="btn ghost sm" data-act="quiz-skip">不会，看答案</button><span class="grow"></span><span class="muted">首字母 ' +
          esc(String(q.answer).charAt(0)) + " · " + esc(String(q.answer).length) + " 个字母</span></div>";
      } else {
        html +=
          '<div class="quiz-opts">' +
          q.options
            .map(function (o, i) {
              return '<button class="quiz-opt" data-act="quiz-choose" data-index="' + i + '">' + esc(o.word) + "</button>";
            })
            .join("") +
          "</div>";
      }
    } else {
      // 已作答：回显 + 解析
      var right = session.lastRight;
      if (q.type === "blank") {
        html +=
          '<div class="quiz-input-row"><input class="quiz-input ' + (right ? "ok" : "bad") + '" value="' +
          esc(session.lastInput || "") + '" readonly><button class="btn" disabled>' + (right ? "正确" : "订正") + "</button></div>";
      } else {
        html +=
          '<div class="quiz-opts">' +
          q.options
            .map(function (o, i) {
              var cls = "quiz-opt";
              if (o.word === q.answer) cls += " ok";
              else if (i === session.picked) cls += " bad";
              return '<button class="' + cls + '" disabled>' + esc(o.word) + "</button>";
            })
            .join("") +
          "</div>";
      }
      html +=
        '<div class="feedback ' + (right ? "ok" : "bad") + '">' +
        (right ? "✓ 答对了" : "✗ 正确答案：<b>" + esc(q.answer) + "</b>") +
        '<div class="fb-zh">' + (q.word.pos ? esc(q.word.pos) + " " : "") + esc(q.word.meaning) + "</div>" +
        (q.word.example && q.word.example.en ? '<div class="fb-zh">' + esc(q.word.example.en) + "</div>" : "") +
        "</div>";
      html += '<div class="ov-foot"><button class="btn primary" data-act="quiz-next">' +
        (session.index + 1 >= session.questions.length ? "看结果" : "下一题") + "</button></div>";
    }

    html += "</div>";
    $("#ovBody").innerHTML = html;
    $("#ovCount").textContent = session.index + 1 + " / " + session.questions.length + " 题";
    $("#ovBar").style.width = pct(session.index, session.questions.length) + "%";

    var inp = $("#quizInput");
    if (inp) {
      if (session.state === "asking") {
        inp.value = inputCache;
        inp.focus();
      }
      inp.oninput = function () {
        inputCache = inp.value;
      };
      inp.onkeydown = function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          submitQuiz();
        }
      };
    }
  }

  function highlightBlank(text) {
    return esc(text).replace(/______/g, '<span class="quiz-blank">______</span>');
  }

  function submitQuiz() {
    var q = session.questions[session.index];
    if (!q || session.state !== "asking") return;
    if (q.type === "choice") return;
    var inp = $("#quizInput");
    var val = inp ? inp.value : inputCache;
    var right = SRS.checkAnswer(val, q.word, q.answer);
    finishQuestion(q, right, val);
  }

  function finishQuestion(q, right, val) {
    session.state = "answered";
    session.lastRight = right;
    session.lastInput = val || "";
    ST.recordQuiz(q.id, right, TODAY);
    if (right) session.right++;
    else session.wrong.push(q.word);
    renderQuiz();
  }

  function nextQuestion() {
    session.index++;
    session.state = "asking";
    session.picked = -1;
    session.lastInput = "";
    inputCache = "";
    renderSession();
  }

  function renderQuizResult() {
    flushTime();
    var total = session.questions.length;
    var right = Math.min(session.right, total);
    var uniq = [];
    var seen = {};
    session.wrong.forEach(function (w) {
      if (!seen[w.id]) {
        seen[w.id] = 1;
        uniq.push(w);
      }
    });
    var p = ST.plan(TODAY);
    var score = total ? Math.round((right / total) * 100) : 0;
    var word = score >= 90 ? "非常稳" : score >= 70 ? "还不错" : score >= 50 ? "再练练" : "多复习几遍";

    var html =
      '<div class="result">' +
      '<div class="result-score">' + score + "<small>分</small></div>" +
      '<div class="result-title">' + word + " · 答对 " + right + " / " + total + " 题</div>" +
      '<div class="result-sub">答错的词已经退回上一阶段，明天会再次出现在复习队列里</div>' +
      (uniq.length
        ? '<div class="sec-title" style="text-align:left">错词回顾</div><div class="wrong-list">' +
          uniq
            .map(function (w) {
              return (
                '<div class="wrong-item"><span class="w">' + esc(w.word) + '</span><span class="m">' +
                esc(w.meaning) +
                (w.example && w.example.en ? '<br><i class="muted">' + esc(w.example.en) + "</i>" : "") +
                "</span></div>"
              );
            })
            .join("") +
          "</div>"
        : "") +
      "</div>";

    html +=
      '<div class="ov-foot">' +
      (uniq.length ? '<button class="btn" data-act="quiz-retry-wrong">只练错词</button>' : "") +
      (nz(p.quizTarget) - nz(p.quizDone) > 0
        ? '<button class="btn primary" data-act="quiz-more">再练 ' + (nz(p.quizTarget) - nz(p.quizDone)) + " 题</button>"
        : "") +
      '<button class="btn" data-act="exit-session">完成</button>' +
      "</div>";
    $("#ovBody").innerHTML = html;
    $("#ovCount").textContent = "完成";
    $("#ovBar").style.width = "100%";
  }

  /* ==================== 事件 ==================== */

  /* ---------------- txt 词表文件导入 ---------------- */

  function decodeBuffer(buf) {
    if (typeof TextDecoder !== "function") return null;
    var b = new Uint8Array(buf);
    if (b.length >= 2 && b[0] === 0xff && b[1] === 0xfe) return new TextDecoder("utf-16le").decode(buf);
    if (b.length >= 2 && b[0] === 0xfe && b[1] === 0xff) return new TextDecoder("utf-16be").decode(buf);
    var utf8 = new TextDecoder("utf-8").decode(buf).replace(/^\uFEFF/, "");
    if (utf8.indexOf("\uFFFD") < 0) return utf8;
    var gbk = null;
    try {
      gbk = new TextDecoder("gb18030").decode(buf);
    } catch (e) {
      gbk = null;
    }
    if (!gbk) return utf8;
    // 两种解码都有乱码时，选乱码更少的那个（中文 txt 常见 GBK 编码）
    var c8 = (utf8.match(/\uFFFD/g) || []).length;
    var cg = (gbk.match(/\uFFFD/g) || []).length;
    return cg < c8 ? gbk : utf8;
  }

  function takeImportText(text, fileName) {
    var entries = ST.parseWordLines(text);
    if (!entries.length) {
      toast("没有识别到单词，请检查文件格式");
      return;
    }
    var name = (($("#customName") || {}).value || "").trim();
    if (!name) name = String(fileName || "").replace(/\.[^.]+$/, "").trim().slice(0, 20) || "我的词书";
    pendingImport = { name: name, entries: entries, file: String(fileName || ""), size: entries.length };
    if (view !== "books") go("books");
    else render();
    toast("识别到 " + entries.length + " 个单词，确认后导入");
  }

  function readTxtFile(file) {
    if (!file) return;
    if (typeof FileReader !== "function") {
      toast("当前浏览器不支持读取文件，请改用粘贴");
      return;
    }
    var fr = new FileReader();
    fr.onerror = function () {
      toast("文件读取失败");
    };
    fr.onload = function () {
      var text = decodeBuffer(fr.result);
      if (text !== null) {
        takeImportText(text, file.name);
        return;
      }
      // 老浏览器没有 TextDecoder：退回按 UTF-8 读取
      var fr2 = new FileReader();
      fr2.onerror = function () {
        toast("文件读取失败");
      };
      fr2.onload = function () {
        takeImportText(String(fr2.result), file.name);
      };
      fr2.readAsText(file, "utf-8");
    };
    fr.readAsArrayBuffer(file);
  }

  function pickTxtFile() {
    var old = $("#txtFileInput");
    if (old && old.parentNode) old.parentNode.removeChild(old);
    var inp = document.createElement("input");
    inp.type = "file";
    inp.id = "txtFileInput";
    inp.accept = ".txt,.csv,.md,text/plain,text/*";
    inp.style.position = "fixed";
    inp.style.left = "-9999px";
    inp.onchange = function () {
      readTxtFile(inp.files && inp.files[0]);
    };
    document.body.appendChild(inp);
    inp.click();
  }

  function inDropZone(node) {
    return !!(node && node.closest && node.closest("#importCard"));
  }

  document.addEventListener("dragover", function (e) {
    if (!inDropZone(e.target)) return;
    e.preventDefault();
    var z = $("#importDrop");
    if (z) z.classList.add("over");
    if (e.dataTransfer) {
      try {
        e.dataTransfer.dropEffect = "copy";
      } catch (err) {
        /* 某些浏览器里 dataTransfer 只读 */
      }
    }
  });
  document.addEventListener("dragleave", function (e) {
    var z = $("#importDrop");
    if (z && inDropZone(e.target)) z.classList.remove("over");
  });
  document.addEventListener("drop", function (e) {
    if (!inDropZone(e.target)) return;
    e.preventDefault();
    var z = $("#importDrop");
    if (z) z.classList.remove("over");
    var files = e.dataTransfer && e.dataTransfer.files;
    if (files && files.length) readTxtFile(files[0]);
  });

  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("[data-act]") : null;
    if (!t) return;
    var act = t.getAttribute("data-act");
    var s = ST.settings();

    switch (act) {
      case "nav":
        go(t.getAttribute("data-view"));
        break;

      case "root-kind":
        rootKind = t.getAttribute("data-kind") || "all";
        renderRoots();
        break;

      case "theme": {
        var order = ["auto", "light", "dark"];
        var cur = order.indexOf(s.theme);
        s.theme = order[(cur + 1) % 3];
        ST.save();
        applyTheme();
        render();
        toast("主题：" + (s.theme === "auto" ? "跟随系统" : s.theme === "light" ? "浅色" : "深色"));
        break;
      }

      case "start-new":
        startSession("new");
        break;
      case "start-review":
        startSession("review");
        break;
      case "start-rank":
        startRank();
        break;
      case "rank-pick":
        rankPick(Number(t.getAttribute("data-i")));
        break;
      case "rank-next":
        rankNext();
        break;
      case "rank-refresh":
        loadBoard();
        break;
      case "rank-nick-save": {
        var nn = RANK.setNick(($("#rankNick") || {}).value);
        reportRank();
        toast(nn ? "昵称已保存：" + nn : "已清除昵称，将显示「匿名同学」", "ok");
        break;
      }
      case "start-quiz":
        startSession("quiz");
        break;
      case "reveal":
        if (session && session.mode !== "quiz" && !session.revealed) {
          session.revealed = true;
          renderSession();
        }
        break;
      case "speak-current":
        if (session && session.mode === "rank") {
          if (session.q && session.q.word) speak(session.q.word.word);
        } else if (session && session.mode !== "quiz") {
          var w0 = session.queue[0];
          if (w0) speak(w0.word);
        }
        break;
      case "rate":
        if (session && session.revealed) rate(t.getAttribute("data-rating"));
        break;
      case "continue-session":
        session = null;
        $("#overlay").hidden = true;
        document.body.style.overflow = "";
        startSession("review");
        break;
      case "exit-session":
        if (session && session.mode === "rank") reportRank();
        closeOverlay();
        break;

      case "quiz-submit":
        submitQuiz();
        break;
      case "quiz-skip":
        finishQuestion(session.questions[session.index], false, "");
        break;
      case "quiz-choose": {
        var qi = Number(t.getAttribute("data-index"));
        var q = session.questions[session.index];
        session.picked = qi;
        finishQuestion(q, q.options[qi].word === q.answer, q.options[qi].word);
        break;
      }
      case "quiz-next":
        nextQuestion();
        break;
      case "quiz-retry-wrong": {
        var ws = session.wrong.slice();
        var qs = SRS.buildQuiz(ws, ws.length, ST.allWords());
        if (!qs.length) {
          toast("错词太少，出不了题");
          break;
        }
        session.questions = qs;
        session.index = 0;
        session.right = 0;
        session.wrong = [];
        session.state = "asking";
        session.picked = -1;
        inputCache = "";
        renderSession();
        break;
      }
      case "quiz-more": {
        var p2 = ST.plan(TODAY);
        var need2 = nz(p2.quizTarget) - nz(p2.quizDone);
        var qs2 = SRS.buildQuiz(p2.quizPool, Math.max(1, need2), ST.allWords());
        if (!qs2.length) {
          toast("暂时出不了题");
          break;
        }
        session.questions = qs2;
        session.index = 0;
        session.right = 0;
        session.wrong = [];
        session.state = "asking";
        session.picked = -1;
        inputCache = "";
        renderSession();
        break;
      }

      case "checkin":
        ST.checkIn(TODAY);
        toast("打卡成功 🎉", "ok");
        render();
        break;
      case "cancel-checkin":
        ST.cancelCheckIn(TODAY);
        toast("已撤销今日打卡");
        render();
        break;

      case "book-toggle": {
        var bid = t.getAttribute("data-book");
        var idx = s.books.indexOf(bid);
        if (idx >= 0) {
          if (s.books.length === 1) {
            toast("至少保留一本词书");
            break;
          }
          s.books.splice(idx, 1);
        } else {
          s.books.push(bid);
        }
        ST.save();
        render();
        break;
      }
      case "book-reset": {
        var b2 = t.getAttribute("data-book");
        var bk = ST.bookById(b2);
        if (confirmDo("确定清空《" + (bk ? bk.name : b2) + "》的学习进度吗？打卡记录会保留。")) {
          ST.resetBookProgress(b2);
          toast("已重置该词书进度");
          render();
        }
        break;
      }
      case "book-remove": {
        var b3 = t.getAttribute("data-book");
        if (confirmDo("确定删除这本自定义词书吗？其中的学习记录也会一起删除。")) {
          ST.removeCustomBook(b3);
          toast("已删除");
          render();
        }
        break;
      }
      case "import-file":
        pickTxtFile();
        break;
      case "import-confirm": {
        if (!pendingImport) break;
        var newBook = ST.addCustomBook(pendingImport.name, pendingImport.entries);
        toast("《" + newBook.name + "》导入 " + newBook.words.length + " 个词", "ok");
        pendingImport = null;
        var taEl = $("#customText");
        if (taEl) taEl.value = "";
        render();
        break;
      }
      case "import-cancel":
        pendingImport = null;
        render();
        break;
      case "import-text": {
        var name = (($("#customName") || {}).value || "").trim();
        var text = ($("#customText") || {}).value || "";
        var entries = ST.parseWordLines(text);
        if (!entries.length) {
          toast("没有识别到单词，请检查格式");
          break;
        }
        ST.addCustomBook(name || "我的词书", entries);
        pendingImport = null;
        toast("已导入 " + entries.length + " 个单词");
        go("books");
        render();
        break;
      }

      case "set-daily":
        s.dailyNew = Math.max(1, Math.min(500, Number(t.getAttribute("data-n")) || 20));
        ST.save();
        render();
        toast("每日新词：" + s.dailyNew + " 个");
        break;
      case "set-quiz":
        s.quizCount = Math.max(0, Math.min(50, Number(t.getAttribute("data-n")) || 0));
        ST.save();
        render();
        break;
      case "set-review":
        s.reviewLimit = Number(t.getAttribute("data-n")) || 100;
        ST.save();
        render();
        break;
      case "set-rule":
        s.checkinRule = t.getAttribute("data-rule");
        ST.save();
        render();
        break;
      case "set-theme":
        s.theme = t.getAttribute("data-theme");
        ST.save();
        applyTheme();
        render();
        break;
      case "toggle-speak":
        s.autoSpeak = !s.autoSpeak;
        ST.save();
        render();
        if (s.autoSpeak) speak("hello");
        break;
      case "toggle-similar":
        s.showSimilar = !s.showSimilar;
        ST.save();
        render();
        break;

      case "export":
        download("jianci-backup-" + TODAY + ".json", ST.exportJSON());
        toast("备份已导出");
        break;
      case "import":
        pickFile(function (text) {
          try {
            ST.importJSON(text);
            invalidateToday();
            toast("导入成功", "ok");
            render();
          } catch (err) {
            toast("导入失败：" + (err && err.message ? err.message : "文件格式不对"));
          }
        });
        break;
      case "wipe":
        if (confirmDo("清空全部学习进度与打卡记录？词书和设置会保留。")) {
          var st0 = ST.state();
          st0.words = {};
          st0.pending = [];
          st0.cursor = {};
          st0.days = {};
          ST.invalidate();
          ST.save();
          render();
          toast("学习记录已清空");
        }
        break;
      case "factory":
        if (confirmDo("恢复出厂设置：将删除所有本地数据（含自定义词书），确定吗？")) {
          ST.reset();
          render();
          toast("已恢复出厂设置");
        }
        break;
    }
  });

  document.addEventListener("input", function (e) {
    var t = e.target;
    if (t && t.id === "rootQ") {
      rootQ = t.value;
      renderRootList();
    }
  });

  document.addEventListener("change", function (e) {
    var el = e.target;
    if (!el || !el.id) return;
    if (el.id === "dailyNewInput") {
      var v = Math.max(1, Math.min(500, Number(el.value) || 20));
      ST.settings().dailyNew = v;
      ST.save();
      render();
      toast("每日新词：" + v + " 个");
    }
  });

  function invalidateToday() {
    TODAY = SRS.todayKey();
  }

  /* ---------------- 快捷键 ---------------- */
  document.addEventListener("keydown", function (e) {
    var overlayOpen = !$("#overlay").hidden;
    var tag = (e.target && e.target.tagName) || "";
    var typing = tag === "INPUT" || tag === "TEXTAREA";

    if (!overlayOpen) {
      if (!typing && e.key === "Escape") go("today");
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      closeOverlay();
      return;
    }
    if (!session) return;

    if (session.mode === "quiz") {
      if (typing) return; // 输入框内交给自己的 Enter 处理
      if (e.key === "Enter") {
        e.preventDefault();
        var cur = session.questions[session.index];
        if (!cur) return; // 已在结果页
        if (session.state === "asking" && cur.type === "blank") submitQuiz();
        else if (session.state === "answered") nextQuestion();
      }
      return;
    }

    if (session.mode === "rank") {
      if (typing) return;
      if (session.state === "feedback" && (e.key === " " || e.key === "Enter")) {
        e.preventDefault();
        rankNext();
        return;
      }
      if (session.state === "asking" && /^[1-4]$/.test(e.key)) {
        e.preventDefault();
        rankPick(Number(e.key) - 1);
        return;
      }
      return;
    }

    if (typing) return;
    if (!session.revealed && (e.key === " " || e.key === "Enter" || e.key === "r")) {
      e.preventDefault();
      session.revealed = true;
      renderSession();
      return;
    }
    if (session.revealed) {
      if (e.key === "1") {
        e.preventDefault();
        rate("know");
      } else if (e.key === "2") {
        e.preventDefault();
        rate("fuzzy");
      } else if (e.key === "3") {
        e.preventDefault();
        rate("forgot");
      }
    }
  });

  /* ---------------- 系统事件 ---------------- */
  window.addEventListener("hashchange", function () {
    var v = String(location.hash || "").replace("#", "");
    if (VIEWS.indexOf(v) >= 0 && v !== view) go(v);
  });

  window.addEventListener("focus", checkDayRollover);
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) checkDayRollover();
  });
  setInterval(checkDayRollover, 60000);

  window.addEventListener("beforeunload", function () {
    if (session) flushTime();
  });

  /* ---------------- 启动 ---------------- */
  var initial = String(location.hash || "").replace("#", "");
  view = VIEWS.indexOf(initial) >= 0 ? initial : "today";
  render();

  // 首次使用引导
  if (!Object.keys(ST.state().words).length && !ST.state().days[TODAY]) {
    setTimeout(function () {
      toast("从「今日任务」开始：先学新词，再做填空巩固");
    }, 600);
  }
})();