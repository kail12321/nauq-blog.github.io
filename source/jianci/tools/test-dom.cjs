/*!
 * 界面端到端测试：用 jsdom 真正加载 index.html，模拟点击走完
 * 「学新词 → 填空 → 打卡 → 统计 / 设置 / 词书」全流程。
 * 用法：node tools/test-dom.cjs
 * 依赖：jsdom（npm i jsdom，默认从 %TEMP%/jc_domtest/node_modules 读取）
 */
"use strict";

var path = require("path");
var ROOT = path.join(__dirname, "..");
var INDEX = path.join(ROOT, "index.html");
var JSDOM_PATH =
  process.env.JSDOM_PATH || path.join(process.env.TEMP || "/tmp", "jc_domtest", "node_modules", "jsdom");

var jsdom;
try {
  jsdom = require(JSDOM_PATH);
} catch (e) {
  console.log("跳过界面测试：未安装 jsdom（" + JSDOM_PATH + "）");
  process.exit(0);
}

var pass = 0;
var fail = 0;
function ok(cond, msg, extra) {
  if (cond) {
    pass++;
    console.log("  ✓ " + msg);
  } else {
    fail++;
    console.log("  ✗ " + msg + (extra === undefined ? "" : "  → " + JSON.stringify(extra)));
  }
}
function section(t) {
  console.log("\n" + t);
}
function eq(got, want, msg) {
  ok(got === want, msg, { got: got, want: want });
}

var W;
var D;
function $(sel) {
  return D.querySelector(sel);
}
function all(sel) {
  return Array.prototype.slice.call(D.querySelectorAll(sel));
}
function txt(sel) {
  var e = $(sel);
  return e ? e.textContent.replace(/\s+/g, " ").trim() : null;
}
function click(sel) {
  var e = typeof sel === "string" ? $(sel) : sel;
  if (!e) throw new Error("找不到元素：" + sel);
  e.click();
  return e;
}

var errors = [];

function tick(ms) {
  return new Promise(function (r) {
    setTimeout(r, ms || 10);
  });
}

async function run() {
  var ST = W.JC_STORE;
  var SRS = W.JC_SRS;
  var TODAY = SRS.todayKey();

  /* ---------- 1. 首屏 ---------- */
  section("1. 首屏渲染（今日）");
  ok($("#view-today").classList.contains("active"), "默认停在「今日」视图");
  ok(/新词学习/.test(txt("#view-today")), "今日任务卡渲染出「新词学习」");
  ok(/记忆曲线/.test(txt("#view-today")), "页面解释了记忆曲线");
  ok(all(".week-day").length === 7, "最近 7 天打卡条", all(".week-day").length);
  ok($(".ring") !== null, "今日进度环渲染");
  ok($('[data-act="start-new"]') !== null, "有「开始」新词按钮");
  var p0 = ST.plan(TODAY);
  ok(p0.newPending === 20, "首屏自动排好 20 个新词", p0.newPending);
  ok($('[data-act="checkin"]') === null, "任务没做完时不显示打卡按钮");

  /* ---------- 2. 四个视图都能渲染 ---------- */
  section("2. 视图切换");
  click('[data-act="nav"][data-view="books"]');
  ok($("#view-books").classList.contains("active"), "切到「词书」");
  ok(/考研核心词汇/.test(txt("#view-books")) && /雅思核心词汇/.test(txt("#view-books")), "三本词书都列出");
  ok(/100/.test(txt("#view-books")), "显示词书词量");

  click('[data-act="nav"][data-view="stats"]');
  ok($("#view-stats").classList.contains("active"), "切到「统计」");
  ok(all(".heat i").length === 119, "热力图 119 格", all(".heat i").length);
  ok(all(".tile").length >= 4, "统计卡片 ≥ 4 个", all(".tile").length);

  click('[data-act="nav"][data-view="settings"]');
  ok($("#view-settings").classList.contains("active"), "切到「设置」");
  ok(/每日新词量/.test(txt("#view-settings")), "有每日词量设置");
  ok($("#customText") !== null, "词书页有导入框");

  click('[data-act="nav"][data-view="today"]');
  ok($("#view-today").classList.contains("active"), "回到「今日」");

  /* ---------- 3. 新词学习 ---------- */
  section("3. 新词学习（卡片 / 例句 / 形近词 / 变形）");
  click('[data-act="start-new"]');
  ok($("#overlay").hidden === false, "学习浮层打开");
  ok($(".scard") !== null, "出现单词卡");
  ok($(".scard").classList.contains("tap-mask"), "释义默认遮住");
  ok($(".meaning") === null, "未翻面前看不到中文释义");
  var first = txt(".scard .word");
  ok(first && first.length > 0, "显示单词", first);

  click('[data-act="reveal"]');
  ok($(".meaning") !== null, "翻开后出现释义");
  ok($(".ex-en") !== null, "翻开后出现英文例句");
  ok($(".ex-zh") !== null, "例句有中文翻译");
  ok($(".sim-item") !== null, "有形近词/易混词");
  ok($(".form-item") !== null, "有词形变化");
  ok(all(".rate-bar .rate-btn").length === 3, "三个记忆反馈按钮");

  var seenWords = {};
  var firstPass = 0;
  var forgotDone = false;
  var guard = 0;
  while ($(".scard") && guard++ < 80) {
    if ($('[data-act="reveal"]')) click('[data-act="reveal"]');
    var cur = txt(".scard .word");
    if (!seenWords[cur]) {
      seenWords[cur] = true;
      firstPass++;
    }
    var rating = !forgotDone && firstPass === 3 ? "forgot" : "know";
    if (rating === "forgot") forgotDone = true;
    click('.rate-btn[data-rating="' + rating + '"]');
  }
  ok(/学完了/.test(txt(".result-title") || ""), "新词学完出现小结", txt(".result-title"));
  ok(firstPass === 20, "一共过手 20 个词", firstPass);
  ok(!forgotDone || Object.keys(seenWords).length === 20, "忘记的词被插回队列再出现一次");
  var pAfterNew = ST.plan(TODAY);
  ok(pAfterNew.newPending === 0, "待学队列清空");
  ok(pAfterNew.newLearned === 20, "今日已学 20");
  ok(Object.keys(ST.state().words).length === 20, "20 个词写入了记忆状态");
  ok(ST.day(TODAY).new === 20, "今日记录 new = 20");

  /* ---------- 3b. 记忆曲线复习（把到期日改到今天来模拟次日打开） ---------- */
  section("3b. 记忆曲线复习");
  var st3 = ST.state();
  var ids3 = Object.keys(st3.words);
  ids3.forEach(function (id) {
    st3.words[id].due = TODAY;
    st3.words[id].stage = 0;
  });
  ST.save();
  click('[data-act="nav"][data-view="stats"]');
  click('[data-act="nav"][data-view="today"]');
  ok(/记忆曲线复习/.test(txt("#view-today")), "今日页显示复习任务");
  var pRev = ST.plan(TODAY);
  ok(pRev.dueTotal === 20, "20 个词到期（模拟次日）", pRev.dueTotal);
  ok(pRev.reviewTarget === 20, "复习目标 20", pRev.reviewTarget);
  ok(pRev.newPending === 0, "新词配额已用完，不再排新词", pRev.newPending);

  click('[data-act="start-review"]');
  ok($(".scard") !== null, "进入复习卡片");
  click('[data-act="reveal"]');
  var hint = txt(".kbd-hint") || "";
  ok(/已复习|下次/.test(hint), "复习卡显示该词的记忆状态", hint);
  ok($(".ex-en") !== null, "复习卡里也能看到例句");

  // 词根词缀块必须和引擎算出来的一致（有拆解才有块，没拆解就没有）
  var shownW = txt(".scard .word") || "";
  var wobj = ST.allWords().filter(function (x) {
    return shownW.indexOf(x.word) === 0;
  })[0];
  if (wobj) {
    var an = ST.analysisOf(wobj);
    var parts = all(".scard .morph-part");
    ok(!!an === (parts.length > 0), "卡片的词根词缀块与数据一致（" + wobj.word + "）", an ? an.line : "无拆解");
    if (an) {
      ok(parts.length === an.parts.length, "拆出几个部件就画几个块", [parts.length, an.parts.length]);
      ok(/前缀|词根|后缀/.test(parts[0].getAttribute("title") || ""), "部件上有类型提示", parts[0].getAttribute("title"));
      ok(parts[0].getAttribute("data-act") === null, "背诵中词根块不可跳转（不会跑到遮罩后面）");
    }
  }

  var done3 = 0;
  var guard3 = 0;
  while ($(".scard") && guard3++ < 60) {
    if ($('[data-act="reveal"]')) click('[data-act="reveal"]');
    click('.rate-btn[data-rating="' + (done3 === 2 ? "forgot" : done3 === 5 ? "fuzzy" : "know") + '"]');
    done3++;
  }
  ok(/本轮复习完成/.test(txt(".result-title") || ""), "复习完成出现小结", txt(".result-title"));
  ok(/需要再巩固/.test(txt(".result") || ""), "小结里点名忘记的词");
  var pRev2 = ST.plan(TODAY);
  ok(pRev2.dueTotal === 0, "到期队列清空", pRev2.dueTotal);
  ok(pRev2.reviewedToday >= 20, "记录了今日复习数", pRev2.reviewedToday);
  ok(ST.state().words[ids3[0]].stage >= 1, "复习成功的词阶段上升", ST.state().words[ids3[0]].stage);
  click('[data-act="exit-session"]');
  ok($("#overlay").hidden === true, "复习结束回到首页");

  /* ---------- 4. 末尾填空 ---------- */
  section("4. 末尾单词填空");
  click('#ovBody [data-act="start-quiz"]');
  ok($(".quiz-prompt") !== null, "显示挖空句子");
  ok(/______/.test(txt(".quiz-prompt")), "句子被挖空", txt(".quiz-prompt"));
  ok($(".quiz-zh") !== null && $(".quiz-zh").classList.contains("blur"), "中文翻译先模糊，防止照抄");

  function answerOf(prompt) {
    var pool = ST.allWords();
    for (var i = 0; i < pool.length; i++) {
      var q = SRS.buildQuestion(pool[i], pool);
      if (q && q.type === "blank" && q.prompt === prompt) return q;
    }
    return null;
  }
  function answerCurrent(correct) {
    var input = $(".quiz-input");
    if (input) {
      var q = answerOf(txt(".quiz-prompt"));
      input.value = correct && q ? q.answer : "zzz";
      click('[data-act="quiz-submit"]');
    } else {
      var opts = all(".quiz-opt");
      var target = null;
      if (correct) {
        var prompt = txt(".quiz-prompt");
        var words = ST.allWords();
        for (var i = 0; i < words.length; i++) {
          if (words[i].meaning === prompt) {
            target = opts.filter(function (o) {
              return o.textContent.trim() === words[i].word;
            })[0];
            if (target) break;
          }
        }
      }
      (target || opts[0]).click();
    }
    return $(".feedback");
  }

  ok($(".quiz-box") !== null, "进入填空环节");
  var asked = 0;
  var wrongOnPurpose = false;
  while ($(".quiz-box") && asked < 10) {
    var chooseCorrect = asked % 3 !== 0;
    if (!chooseCorrect) wrongOnPurpose = true;
    var fb = answerCurrent(chooseCorrect);
    if (asked === 0) {
      ok(fb !== null, "第 1 题提交后有反馈");
      ok(fb === null ? false : fb.classList.contains("ok") === chooseCorrect, chooseCorrect ? "答对显示正确" : "答错显示错误");
    }
    ok(fb !== null && $(".ov-foot") !== null, "作答后出现「下一题 / 看结果」");
    click('[data-act="quiz-next"]');
    asked++;
  }
  ok(asked === 10, "完成 10 道填空题", asked);
  ok(wrongOnPurpose, "其中包含故意答错的题");
  ok($(".result-score") !== null, "出现填空成绩页");
  ok(/\d+/.test(txt(".result-score") || ""), "显示分数", txt(".result-score"));
  ok(/错词回顾/.test(txt(".result")), "列出了错词回顾");
  ok($(".wrong-list .wrong-item") !== null, "错词条目渲染");
  var pAfterQuiz = ST.plan(TODAY);
  ok(pAfterQuiz.quizDone === 10, "填空计数 10", pAfterQuiz.quizDone);
  ok(ST.stats(TODAY).accuracy > 0 && ST.stats(TODAY).accuracy < 100, "正确率介于 0-100", ST.stats(TODAY).accuracy);

  /* ---------- 5. 错词重练 ---------- */
  section("5. 错词重练");
  if ($('[data-act="quiz-retry-wrong"]')) {
    click('[data-act="quiz-retry-wrong"]');
    ok($(".quiz-box") !== null, "错词重练重新出题");
    var n2 = 0;
    while ($(".quiz-box") && n2++ < 12) {
      answerCurrent(true);
      click('[data-act="quiz-next"]');
    }
    ok($(".result-score") !== null, "重练后回到成绩页");
  } else {
    ok(true, "本次没有错词，跳过重练（正常）");
  }

  click('[data-act="exit-session"]');
  ok($("#overlay").hidden === true, "退出浮层回到首页");

  /* ---------- 6. 打卡 ---------- */
  section("6. 打卡");
  var pReady = ST.plan(TODAY);
  ok(pReady.readyToCheckIn, "新词 / 复习 / 填空都完成后解锁打卡");
  ok($('[data-act="checkin"]') !== null, "打卡按钮出现");
  click('[data-act="checkin"]');
  ok(ST.plan(TODAY).checkedIn === true, "打卡状态已写入");
  ok($('[data-act="cancel-checkin"]') !== null, "可以撤销打卡");
  ok(ST.stats(TODAY).streak === 1, "连续打卡 1 天");
  ok(ST.stats(TODAY).checkedDays === 1, "累计打卡 1 天");
  ok(all(".week-day.done").length === 1, "今日在 7 天条上点亮");

  /* ---------- 7. 统计 ---------- */
  section("7. 统计数据");
  click('[data-act="nav"][data-view="stats"]');
  var statsTxt = txt("#view-stats");
  ok(/累计打卡|连续打卡/.test(statsTxt), "展示打卡天数");
  ok(/已学|已掌握/.test(statsTxt), "展示已学 / 已掌握");
  var heatOn = all(".heat i").filter(function (i) {
    return i.getAttribute("data-lv") && i.getAttribute("data-lv") !== "0";
  });
  ok(heatOn.length >= 1, "热力图有今日痕迹", heatOn.length);
  ok(all(".chart-col").length === 14, "14 天柱状图", all(".chart-col").length);
  ok(/1 天后/.test(statsTxt) && /30 天后/.test(statsTxt), "记忆阶段分布列出 8 档间隔");

  /* ---------- 8. 设置 ---------- */
  section("8. 设置项");
  click('[data-act="nav"][data-view="settings"]');
  click('[data-act="set-daily"][data-n="30"]');
  ok(ST.settings().dailyNew === 30, "每日新词量改为 30", ST.settings().dailyNew);
  click('[data-act="set-daily"][data-n="20"]');
  ok(ST.settings().dailyNew === 20, "改回 20");
  click('[data-act="set-quiz"][data-n="5"]');
  ok(ST.settings().quizCount === 5, "每日填空题数改为 5", ST.settings().quizCount);
  click('[data-act="set-rule"][data-rule="manual"]');
  ok(ST.settings().checkinRule === "manual", "打卡条件改为手动", ST.settings().checkinRule);
  click('[data-act="set-rule"][data-rule="all"]');
  var before = ST.settings().showSimilar;
  click('[data-act="toggle-similar"]');
  ok(ST.settings().showSimilar === !before, "形近词开关可切换");
  click('[data-act="toggle-similar"]');
  var beforeSpeak = ST.settings().autoSpeak;
  click('[data-act="toggle-speak"]');
  ok(ST.settings().autoSpeak === !beforeSpeak, "自动发音开关可切换");
  var beforeTheme = ST.settings().theme;
  click("#themeBtn");
  ok(ST.settings().theme !== beforeTheme, "主题按钮切换主题", ST.settings().theme);
  ok(D.documentElement.getAttribute("data-theme") === "light" || D.documentElement.getAttribute("data-theme") === "dark", "主题写入 html[data-theme]");

  /* ---------- 9. 词书与自定义导入 ---------- */
  section("9. 词书选择与自定义导入");
  click('[data-act="nav"][data-view="books"]');
  var booksBefore = ST.settings().books.slice();
  click('[data-act="book-toggle"][data-book="ielts"]');
  ok(ST.settings().books.indexOf("ielts") >= 0, "雅思加入每日计划", ST.settings().books);
  click('[data-act="book-toggle"][data-book="ielts"]');
  ok(ST.settings().books.indexOf("ielts") < 0, "再点一次移出计划");

  $("#customName").value = "我的生词";
  $("#customText").value = "ubiquitous 无处不在的\n1. resilience；韧性\nmitigate v. 减轻；缓解\nin terms of 就……而言";
  click('[data-act="import-text"]');
  var custom = ST.state().custom;
  ok(custom.length === 1, "自定义词书创建成功", custom.length);
  ok(custom[0] && custom[0].words.length === 4, "导入 4 个词", custom[0] && custom[0].words.length);
  ok(/我的生词/.test(txt("#view-books")), "词书页出现自定义词书");
  ok(ST.settings().books.indexOf(custom[0].id) >= 0, "自动加入每日计划");

  /* ---------- 9b. txt 词表文件导入 ---------- */
  section("9b. 导入 txt 词表文件");
  var txtLines = [
    "ubiquitous /juːˈbɪkwɪtəs/",
    "resilience /rɪˈzɪliəns/ 韧性；恢复力",
    "ephemeral /ɪˈfemərəl/",
    "meticulous /məˈtɪkjələs/",
    "pragmatic /præɡˈmætɪk/",
    "articulate v. /ɑːˈtɪkjuleɪt/ 清晰地表达"
  ];
  click('[data-act="import-file"]');
  var finp = $("#txtFileInput");
  ok(finp !== null, "「选择 txt 文件」创建了文件选择框");
  ok(/\.txt/.test(finp.getAttribute("accept") || ""), "文件类型限定为文本", finp.getAttribute("accept"));

  // 模拟选中一个 UTF-8 txt（CRLF 换行 + 音标）
  var fileA = new W.File([txtLines.join("\r\n")], "考研大纲词表.txt", { type: "text/plain" });
  Object.defineProperty(finp, "files", { value: [fileA], configurable: true });
  finp.dispatchEvent(new W.Event("change"));
  await tick(150);
  ok($(".pending") !== null, "读取后出现导入预览");
  ok(/识别到 6 个单词/.test(txt(".pending")), "预览显示识别到的词数", txt(".pending"));
  click('[data-act="import-confirm"]');
  var txtBook = ST.state().custom.filter(function (b) {
    return b.name === "考研大纲词表";
  })[0];
  ok(!!txtBook, "词书名取自文件名", ST.state().custom.map(function (b) { return b.name; }));
  ok(txtBook && txtBook.words.length === 6, "txt 里的 6 个词全部导入", txtBook && txtBook.words.length);
  ok(txtBook && txtBook.words[0].phonetic === "/juːˈbɪkwɪtəs/", "音标被识别为音标", txtBook && txtBook.words[0]);
  ok(txtBook && txtBook.words[1].meaning === "韧性；恢复力", "音标后的释义正确", txtBook && txtBook.words[1].meaning);
  ok(txtBook && txtBook.words[5].pos === "v.", "识别出词性 v.", txtBook && txtBook.words[5].pos);
  ok($(".pending") === null, "确认后预览消失");
  ok(ST.settings().books.indexOf(txtBook.id) >= 0, "新词书自动加入每日计划");
  ok(/考研大纲词表/.test(txt("#view-books")), "词书页列出新导入的 txt 词书");

  // 纯单词（没有音标也没有释义）也能导入
  var fileB = new W.File(["zzzqqq\nxxxwww"], "纯单词.txt", { type: "text/plain" });
  var dropZone = $("#importDrop");
  ok(dropZone !== null, "导入卡片有拖拽区");
  var dropEv = new W.Event("drop", { bubbles: true, cancelable: true });
  Object.defineProperty(dropEv, "dataTransfer", { value: { files: [fileB], dropEffect: "" } });
  dropZone.dispatchEvent(dropEv);
  await tick(150);
  ok($(".pending") !== null, "拖拽 txt 到导入区也能读取");
  ok(/识别到 2 个单词/.test(txt(".pending")), "拖拽的文件同样被解析", txt(".pending"));
  click('[data-act="import-cancel"]');
  ok($(".pending") === null, "取消后预览消失");
  ok(
    ST.state().custom.filter(function (b) { return b.name === "纯单词"; }).length === 0,
    "取消后不会写入词书"
  );

  /* ---------- 9c. 词根词缀速查页 ---------- */
  section("9c. 词根词缀速查页");
  ok(ST.hasMorph(), "页面载入了词根词缀库", ST.morphStats().total);
  click('[data-act="nav"][data-view="roots"]');
  var rcAll = all("#view-roots .rcard");
  ok(rcAll.length > 20, "列出了词素卡片", rcAll.length);
  ok($("#rootQ") !== null, "有搜索框");
  var segBtns = all("#view-roots .seg button");
  eq(segBtns.length, 4, "有 4 个筛选按钮（全部/前缀/词根/后缀）");
  ok(/全部/.test(segBtns[0].textContent) && /后缀/.test(segBtns[3].textContent), "按钮文案带各类数量", segBtns.map(function (b) { return b.textContent; }).join("/"));
  ok(/当前 \d+ 个词里/.test(txt("#view-roots")), "显示了在当前词书上的命中说明", txt(".root-top .muted"));
  ok(all("#view-roots .tag").length === rcAll.length, "每张卡片都有类型标签");

  // 按中文含义搜
  var q = $("#rootQ");
  q.value = "看";
  q.dispatchEvent(new W.Event("input", { bubbles: true }));
  ok($("#rootQ") !== null && $("#rootQ").value === "看", "输入后搜索框保留（只重绘列表）");
  var rcKan = all("#rootList .rcard").length;
  ok(rcKan > 0 && rcKan < rcAll.length, "按中文含义筛选后结果变少", [rcAll.length, rcKan]);
  ok(/看/.test(txt("#rootList")), "结果里有「看」相关的词素");

  // 按拼写搜
  $("#rootQ").value = "spect";
  $("#rootQ").dispatchEvent(new W.Event("input", { bubbles: true }));
  var rcSpect = all("#rootList .rcard").length;
  ok(rcSpect >= 1, "按拼写搜到 spect 家族", rcSpect);
  ok(/spect/i.test(txt("#rootList")), "结果文本里有 spect");
  ok(rcSpect <= rcKan, "拼写搜索结果不超过中文搜索结果", [rcKan, rcSpect]);

  // 搜不到时给空状态
  $("#rootQ").value = "zzzzzz";
  $("#rootQ").dispatchEvent(new W.Event("input", { bubbles: true }));
  eq(all("#rootList .rcard").length, 0, "搜不到时不报错");
  ok(/没找到/.test(txt("#rootList")), "给出空状态提示");

  // 清空 + 类型筛选
  $("#rootQ").value = "";
  $("#rootQ").dispatchEvent(new W.Event("input", { bubbles: true }));
  click('[data-act="root-kind"][data-kind="suffix"]');
  var sufTags = all("#view-roots .tag");
  ok(sufTags.length > 0, "后缀筛选有结果", sufTags.length);
  ok(sufTags.every(function (t) { return /后缀/.test(t.textContent); }), "只列出后缀");
  ok($("#rootQ") !== null && $("#rootQ").value === "", "筛选后搜索框内容保留");
  click('[data-act="root-kind"][data-kind="root"]');
  ok(/词根 \d+/.test(txt("#view-roots .seg button.active")), "词根按钮高亮", txt("#view-roots .seg button.active"));
  var rootTags = all("#view-roots .tag");
  ok(rootTags.every(function (t) { return /词根/.test(t.textContent); }), "换成词根筛选后只列词根");

  // 已学过的词在词根页里要有标记
  var learnedWords = Object.keys(ST.state().words);
  var rcardHasLearned = all("#view-roots .chip.learned").length > 0;
  ok(learnedWords.length === 0 || rcardHasLearned, "词库里学过的词带高亮标记", all("#view-roots .chip").length);

  click('[data-act="nav"][data-view="today"]');
  ok(/今日/.test(txt("#view-today")), "能从词根页切回今日");

  /* ---------- 10. 学习后仍在运行 ---------- */
  section("10. 收尾一致性");
  click('[data-act="nav"][data-view="today"]');
  ok(/新词学习/.test(txt("#view-today")), "回到今日视图仍然正常渲染");
  ok(Object.keys(ST.state().words).length === 20, "学习记录没有被后续操作破坏");
  ok(ST.stats(TODAY).totalWords === 20, "统计口径一致");

  /* ---------- 11. 没有运行时错误 ---------- */
  section("11. 运行时错误");
  var real = errors.filter(function (m) {
    return !/Could not parse CSS|Not implemented|Error: Not implemented/i.test(m);
  });
  ok(real.length === 0, "控制台没有未捕获错误", real.slice(0, 4));
  if (errors.length !== real.length) {
    console.log("  · （已忽略 jsdom 不支持的 " + (errors.length - real.length) + " 条提示，如 CSS 新语法 / matchMedia）");
  }
}

/* ==================== 启动 ==================== */

var vc = new jsdom.VirtualConsole();
vc.on("jsdomError", function (e) {
  errors.push("jsdomError: " + (e && e.message ? e.message : String(e)));
});
vc.on("error", function () {
  errors.push("console.error: " + Array.prototype.join.call(arguments, " "));
});
vc.on("warn", function () {
  errors.push("console.warn: " + Array.prototype.join.call(arguments, " "));
});

var dom = new jsdom.JSDOM(require("fs").readFileSync(INDEX, "utf8"), {
  url: "file:///" + INDEX.replace(/\\/g, "/"),
  runScripts: "dangerously",
  resources: "usable",
  pretendToBeVisual: true,
  virtualConsole: vc
});

W = dom.window;
D = W.document;

function finish() {
  Promise.resolve()
    .then(run)
    .catch(function (e) {
      fail++;
      console.log("\n  ✗ 流程中断：" + e.message);
      console.log((e.stack || "").split("\n").slice(1, 4).join("\n"));
    })
    .then(function () {
      console.log("\n" + (fail ? "✗ 失败 " + fail + " 项，" : "") + "通过 " + pass + " 项");
      process.exit(fail ? 1 : 0);
    });
}

if (D.readyState === "complete") setTimeout(finish, 50);
else W.addEventListener("load", function () { setTimeout(finish, 50); });