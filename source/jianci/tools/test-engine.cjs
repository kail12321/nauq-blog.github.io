/*!
 * 引擎端到端模拟：连续多天背诵 / 复习 / 打卡 / 填空 / 导入导出
 * 用法：node tools/test-engine.cjs
 */
"use strict";

var path = require("path");
var ROOT = path.join(__dirname, "..");

globalThis.WORDBOOK_DATA = {
  kaoyan: require(path.join(ROOT, "js", "data", "kaoyan.js")),
  cet6: require(path.join(ROOT, "js", "data", "cet6.js")),
  ielts: require(path.join(ROOT, "js", "data", "ielts.js"))
};

globalThis.MORPH_DATA = {
  prefix: require(path.join(ROOT, "js", "data", "morph-prefix.js")),
  suffix: require(path.join(ROOT, "js", "data", "morph-suffix.js")),
  rootA: require(path.join(ROOT, "js", "data", "morph-root-a.js")),
  rootM: require(path.join(ROOT, "js", "data", "morph-root-m.js"))
};

var SRS = require(path.join(ROOT, "js", "srs.js"));
var ST = require(path.join(ROOT, "js", "store.js"));

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

function eq(a, b, msg) {
  ok(a === b, msg, a === b ? undefined : { got: a, want: b });
}

function section(t) {
  console.log("\n" + t);
}

/* ---------- 0. 初始化 ---------- */
section("0. 初始化");
ST.reset();
ST.load();
var s = ST.settings();
eq(s.dailyNew, 20, "默认每日新词 20");
eq(s.quizCount, 10, "默认每日填空 10");
ok(ST.library().length >= 3, "内置词书 ≥ 3 本");
ok(ST.library()[0].words.length > 0, "考研词库已加载", ST.library()[0].words.length);

/* ---------- 1. 第一天：分配新词 ---------- */
section("1. 第一天：每日计划与新词分配");
var day0 = "2026-11-02"; // 周一
var p = ST.plan(day0);
eq(p.newTarget, 20, "今日新词目标 20");
eq(p.newPending, 20, "待学队列 20");
eq(p.dueTotal, 0, "第一天没有到期复习");
eq(p.quizTarget, 0, "还没学词，填空目标为 0");
ok(!p.readyToCheckIn, "任务未完成时不能打卡");

// 20 个新词：12 熟练 / 5 一般 / 3 忘记
var ratings = [];
for (var i = 0; i < 12; i++) ratings.push("know");
for (var j = 0; j < 5; j++) ratings.push("fuzzy");
for (var k = 0; k < 3; k++) ratings.push("forgot");

var learned = [];
while (true) {
  var pend = ST.plan(day0).pendingWords;
  if (!pend.length) break;
  var w = pend[0];
  learned.push(w);
  ST.learnWord(w.id, ratings[learned.length - 1], day0);
}
eq(learned.length, 20, "学完 20 个新词");
p = ST.plan(day0);
eq(p.newLearned, 20, "已学 20");
eq(p.newPending, 0, "队列清空");
eq(p.newTarget, 20, "目标保持 20（不会重复追加）");
eq(p.quizTarget, 10, "填空目标 = min(10, 今天学的 20)=10");

var st0 = ST.state().words[learned[0].id];
eq(st0.stage, 1, "「熟练」的新词进入阶段 1");
eq(st0.due, SRS.addDays(day0, 2), "阶段 1 的下次复习是 2 天后");
eq(ST.state().words[learned[19].id].stage, 0, "「忘记」的新词停在阶段 0");
eq(ST.state().words[learned[19].id].due, SRS.addDays(day0, 1), "阶段 0 的下次复习是 1 天后");

/* ---------- 2. 填空 ---------- */
section("2. 第一天：末尾填空巩固");
var pool = ST.plan(day0).quizPool;
eq(pool.length, 20, "填空词池 = 今天学过的词");
var qs = SRS.buildQuiz(pool, 10, ST.allWords());
eq(qs.length, 10, "生成 10 道题");
ok(qs.some(function (q) { return q.type === "blank"; }), "至少有例句填空题");
qs.forEach(function (q) {
  var right = ST.recordQuiz(q.id, true, day0);
});
eq(ST.plan(day0).quizDone, 10, "填空完成 10 题");
ok(ST.plan(day0).readyToCheckIn, "新词 + 复习 + 填空都完成后可以打卡");

// 一道错题要把阶段降下来（固定选第一个「熟练」词，避免随机导致断言不稳）
var wrongWord = learned[0];
var before = ST.state().words[wrongWord.id].stage;
eq(before, 1, "选的错词原本在阶段 1");
ST.recordQuiz(wrongWord.id, false, day0);
eq(ST.state().words[wrongWord.id].stage, 0, "答错的词退回阶段 0");
eq(ST.state().words[wrongWord.id].due, SRS.addDays(day0, 1), "答错的词明天就要复习");
eq(ST.stats(day0).accuracy, Math.round((10 / 11) * 100), "正确率统计 = 10/11");

/* ---------- 3. 打卡与连续天数 ---------- */
section("3. 打卡与连续天数");
ST.checkIn(day0);
ok(ST.plan(day0).checkedIn, "day0 已打卡");
eq(ST.stats(day0).streak, 1, "连续打卡 1 天");
eq(ST.stats(day0).checkedDays, 1, "累计打卡 1 天");

/* ---------- 4. 第二天：只复习，不学新词 ---------- */
section("4. 第二天：到期复习");
var day1 = SRS.addDays(day0, 1);
ST.settings().dailyNew = 0; // 测试用：压到最小值
ST.settings().dailyNew = 1;
p = ST.plan(day1);
eq(p.dueTotal, 9, "day1 到期 9 个（5 一般 + 3 忘记 + 1 个填空答错被降级）");
eq(p.newPending, 1, "每天仍有 1 个新词（配额下限）");
// 清掉新词
ST.learnWord(p.pendingWords[0].id, "know", day1);
p = ST.plan(day1);
eq(p.newPending, 0, "day1 新词已学");

var dueCount = ST.plan(day1).dueTotal;
var reviewed = 0;
while (true) {
  var due = ST.plan(day1).dueWords;
  if (!due.length) break;
  ST.reviewWord(due[0].id, "know", day1);
  reviewed++;
  if (reviewed > 50) break;
}
eq(reviewed, dueCount, "复习完全部 " + dueCount + " 个到期词");
eq(ST.plan(day1).dueTotal, 0, "到期队列清空");
eq(ST.plan(day1).quizTarget, Math.min(10, ST.plan(day1).quizPool.length), "填空目标跟随今天出现的词");

// 复习过的词阶段上升
var rw = ST.state().words[learned[12].id]; // 第一个 fuzzy 的词
eq(rw.stage, 1, "阶段 0 复习成功 → 阶段 1");

/* 复习时「忘记」要把阶段往回退 */
var keep = learned[0].id; // 阶段 1
var st1 = ST.state().words[keep];
st1.stage = 3;
st1.due = day1;
ST.reviewWord(keep, "forgot", day1);
eq(ST.state().words[keep].stage, 1, "阶段 3 忘记 → 退回阶段 1");
eq(ST.state().words[keep].due, SRS.addDays(day1, 2), "忘记后 2 天后再复习");

ST.checkIn(day1);
eq(ST.stats(day1).streak, 2, "连续打卡 2 天");

/* ---------- 5. 连续中断后的打卡天数 ---------- */
section("5. 中断与最长连续");
var day3 = SRS.addDays(day0, 3);
ST.checkIn(day3);
eq(ST.stats(day3).streak, 1, "跳过一天后连续天数归 1");
eq(ST.stats(day3).bestStreak, 2, "历史最长连续 2 天");

/* ---------- 6. 长间隔复习（阶段推进） ---------- */
section("6. 记忆曲线阶段推进");
var wid = learned[0].id;
ST.state().words[wid].stage = 0;
ST.state().words[wid].due = day0;
var expect = SRS.INTERVALS;
var curDay = day0;
for (var n = 0; n < expect.length - 1; n++) {
  ST.state().words[wid].due = curDay;
  ST.reviewWord(wid, "know", curDay);
  var stN = ST.state().words[wid];
  eq(stN.stage, n + 1, "第 " + (n + 1) + " 次成功复习 → 阶段 " + (n + 1));
  eq(stN.due, SRS.addDays(curDay, expect[n + 1]), "下次间隔 " + expect[n + 1] + " 天");
  curDay = stN.due;
}
ok(SRS.isMastered(ST.state().words[wid]), "阶段 ≥5 记为已掌握");
ST.state().words[wid].due = curDay;
ST.reviewWord(wid, "know", curDay);
eq(ST.state().words[wid].stage, expect.length - 1, "阶段封顶在 " + (expect.length - 1));
eq(ST.state().words[wid].due, SRS.addDays(curDay, expect[expect.length - 1]), "封顶后间隔 120 天");

/* ---------- 7. 打卡规则 ---------- */
section("7. 打卡规则切换");
var day4 = SRS.addDays(day0, 4);
ST.settings().checkinRule = "manual";
ok(ST.plan(day4).readyToCheckIn, "手动模式下随时可打卡");
ST.settings().checkinRule = "review";
ok(ST.plan(day4).readyToCheckIn === (ST.plan(day4).dueTotal === 0), "只完成复习模式下按到期数判断");
ST.settings().checkinRule = "all";
ST.settings().quizCount = 0;
ST.settings().dailyNew = 1;
var q0 = ST.plan(day4);
ok(q0.quizDoneFlag, "关闭填空后填空任务视为完成");

/* ---------- 8. 多词书 + 自定义词书 ---------- */
section("8. 多词书与自定义导入");
ST.settings().checkinRule = "all";
ST.settings().dailyNew = 20;
ST.settings().quizCount = 10;
ST.settings().books = ["kaoyan", "ielts"];
var p2 = ST.plan(day4);
var books = {};
p2.pendingWords.forEach(function (w) {
  books[ST.bookOfWord(w.id)] = (books[ST.bookOfWord(w.id)] || 0) + 1;
});
ok(books.kaoyan > 0 && books.ielts > 0, "两本词书轮流分配新词", books);
eq(p2.newPending, 20, "配额仍然是 20");

var entries = ST.parseWordLines(
  [
    "1. ubiquitous 无处不在的",
    "ephemeral, 短暂的",
    "resilience；韧性",
    "mitigate v. 减轻；缓解",
    "in terms of 就……而言",
    "!@#$%^&*",
    "   ",
    "ephemeral 重复项"
  ].join("\n")
);
eq(entries.length, 5, "解析出 5 条（忽略空行、纯符号行与重复项）", entries);
eq(entries[2].word, "resilience", "全角分号也能分隔");
eq(entries[3].pos, "v.", "识别词性标注 v.");
eq(entries[3].meaning, "减轻；缓解", "词性之后的释义正确");
eq(entries[4].word, "in terms of", "支持多词短语");
var cb = ST.addCustomBook("测试词书", entries);
eq(cb.words.length, 5, "自定义词书 5 词");
ok(ST.settings().books.indexOf(cb.id) >= 0, "导入后自动加入每日计划");
var customQuiz = SRS.buildQuiz(cb.words, 3, ST.allWords());
eq(customQuiz.length, 3, "自定义词（无例句）也能出选择题");
ok(customQuiz.every(function (q) { return q.type === "choice" && q.options.length >= 2; }), "选择题选项 ≥ 2");

/* ---------- 9. 导出 / 导入 ---------- */
section("9. 备份导出与导入");
var json = ST.exportJSON();
var snapshot = JSON.parse(json);
ok(snapshot.words && Object.keys(snapshot.words).length > 0, "导出内容包含学习记录", Object.keys(snapshot.words).length);
var wordsBefore = Object.keys(snapshot.words).length;
ST.reset();
eq(Object.keys(ST.state().words).length, 0, "重置后记录为空");
ST.importJSON(json);
eq(Object.keys(ST.state().words).length, wordsBefore, "导入后记录恢复");
ok(ST.state().custom.length > 0, "自定义词书一起恢复");

/* ---------- 10. 统计口径 ---------- */
section("10. 统计");
var stAll = ST.stats(day4);
eq(stAll.totalWords, wordsBefore, "已学词数一致");
ok(stAll.series.length === 14, "14 天曲线");
ok(stAll.heat.length === 119, "热力图 119 天 = 17 周 × 7");
ok(stAll.heat[0] !== undefined, "热力图首格存在");
ok(stAll.stageBuckets.length === 8, "记忆阶段 8 档");
ok(stAll.books.length >= 4, "统计包含全部词书", stAll.books.length);

/* ---------- 11. 边界 ---------- */
section("11. 边界情况");
ST.reset();
ST.settings().books = ["kaoyan"];
ST.settings().dailyNew = 500;
var pb = ST.plan(day0);
eq(pb.newTarget, Math.min(500, ST.library()[0].words.length), "每日 500 词不会超过词库总量", {
  target: pb.newTarget,
  total: ST.library()[0].words.length
});
ST.settings().dailyNew = 20;
// 词库学完后不再分配
ST.library().forEach(function (b) {
  b.words.forEach(function (w) {
    ST.learnWord(w.id, "know", day0);
  });
});
var pfin = ST.plan(day0);
eq(pfin.newTarget, ST.allWords().length, "词库学完后新词目标 = 已学总数");
eq(pfin.newPending, 0, "没有新词可分配时不报错");
ok(pfin.newDone, "新词任务自动完成");

/* ---------- 12. txt 大纲词表（可能只有单词 / 只有音标） ---------- */
section("12. txt 词表：音标识别与题型降级");
ST.reset();

var ipaList = ST.parseWordLines(
  [
    "ubiquitous /juːˈbɪkwɪtəs/",
    "resilience /rɪˈzɪliəns/ 韧性；恢复力",
    "ephemeral /ɪˈfemərəl/ 短暂的",
    "articulate v. /ɑːˈtɪkjuleɪt/ 清晰地表达",
    "meticulous /məˈtɪkjələs/",
    "pragmatic /præɡˈmætɪk/"
  ].join("\n")
);
eq(ipaList.length, 6, "6 行都能解析");
eq(ipaList[0].phonetic, "/juːˈbɪkwɪtəs/", "音标被放进 phonetic，而不是当成释义");
eq(ipaList[0].meaning, "（未填释义）", "只有音标时释义为占位符");
eq(ipaList[1].meaning, "韧性；恢复力", "音标后面的释义解析正确");
eq(ipaList[3].pos, "v.", "音标与词性同时出现时都能识别");
eq(ipaList[3].meaning, "清晰地表达", "词性后面的释义正确");

var cbIpa = ST.addCustomBook("音标词表", ipaList);
eq(cbIpa.words[0].phonetic, "/juːˈbɪkwɪtəs/", "自定义词条保留音标");
ST.settings().books = [cbIpa.id];
ST.settings().dailyNew = 6;
var pIpa = ST.plan(day0);
eq(pIpa.newPending, 6, "音标词表能排进每日计划");
while (ST.plan(day0).pendingWords.length) {
  var wIpa = ST.plan(day0).pendingWords[0];
  ST.learnWord(wIpa.id, "fuzzy", day0);
}
var pIpa2 = ST.plan(day0);
eq(pIpa2.quizTarget, 6, "填空目标 = 可出题词数", pIpa2.quizTarget);
var qIpa = SRS.buildQuiz(pIpa2.quizPool, pIpa2.quizTarget, ST.allWords());
eq(qIpa.length, 6, "音标词表能出 6 道题", qIpa.length);
function qOf(list, w) {
  return list.filter(function (q) {
    return q.id === w.id;
  })[0];
}
var spellOnes = cbIpa.words.filter(function (w) {
  return !SRS.hasMeaning(w);
});
var meanOnes = cbIpa.words.filter(function (w) {
  return SRS.hasMeaning(w);
});
eq(spellOnes.length, 3, "3 个词只有音标没有释义", spellOnes.length);
ok(
  spellOnes.every(function (w) {
    var q = qOf(qIpa, w);
    return q && q.type === "blank" && q.spell && q.prompt.indexOf("音标") === 0;
  }),
  "只有音标的词 → 以音标为提示的拼写题"
);
ok(
  meanOnes.every(function (w) {
    var q = qOf(qIpa, w);
    return q && q.type === "choice";
  }),
  "带释义的词 → 看释义选单词",
  meanOnes.map(function (w) {
    var q = qOf(qIpa, w);
    return q && q.type;
  })
);

// 有释义、没例句 → 选择题
var meanOnly = ST.addCustomBook("只有释义", ST.parseWordLines("ubiquitous 无处不在的\nresilience 韧性\nephemeral 短暂的\narticulate 清晰表达的"));
var qChoice = SRS.buildQuestion(meanOnly.words[0], meanOnly.words);
eq(qChoice && qChoice.type, "choice", "有释义无例句 → 看释义选单词");
ok(qChoice.options.length >= 2, "选择题有干扰项", qChoice.options.length);

// 什么信息都没有 → 不出题，也不会卡住打卡
var empty = ST.parseWordLines("zzzqqq\nxxxwww");
eq(empty[0].phonetic, "", "纯单词行没有音标");
eq(SRS.buildQuestion(empty[0], ST.allWords()), null, "无例句 / 释义 / 音标的词不出题");
eq(SRS.quizzable(empty, ST.allWords()).length, 0, "quizzable 过滤掉出不了题的词");
var cbEmpty = ST.addCustomBook("纯单词", empty);
ST.settings().books = [cbEmpty.id];
ST.settings().dailyNew = 2;
var dayN = SRS.addDays(day0, 1); // 换一天：day0 的新词配额已经用完了
var pEmpty0 = ST.plan(dayN);
eq(pEmpty0.newPending, 2, "纯单词词表仍然可以背");
eq(pEmpty0.quizTarget, 0, "出不了题时填空目标为 0");
while (ST.plan(dayN).pendingWords.length) {
  var wE = ST.plan(dayN).pendingWords[0];
  ST.learnWord(wE.id, "know", dayN);
}
// 顺手把上一批词的到期复习处理掉，好检验打卡是否被填空卡住
ST.plan(dayN).dueWords.forEach(function (w) {
  ST.reviewWord(w.id, "know", dayN);
});
var pEmpty = ST.plan(dayN);
eq(pEmpty.quizTarget, 0, "学完仍然是 0 道填空");
eq(pEmpty.quizPool.length, 2, "填空词池仍然记录今天学过的词", pEmpty.quizPool.length);
eq(pEmpty.dueTotal, 0, "到期复习已清空");
ok(pEmpty.readyToCheckIn, "填空目标为 0 不阻塞打卡（按「全部完成」规则）");

/* ---------- 13. 词根词缀 ---------- */
section("13. 词根词缀库与自动拆解");
var MLIB = ST.morphLib();
ok(MLIB.length > 300, "载入了词根词缀库", MLIB.length);
var kinds = { prefix: 0, root: 0, suffix: 0 };
MLIB.forEach(function (e) {
  kinds[e.kind]++;
});
ok(kinds.prefix >= 60 && kinds.root >= 180 && kinds.suffix >= 60, "三类词素都有足够条目", kinds);

/** 取拆解结果：拆不出来时给一个空壳，方便断言（store 层拆不出会返回 null） */
function anOf(w) {
  var a = ST.analysisOf(typeof w === "string" ? { id: "probe-" + w.trim(), word: w } : w);
  return a && a.parts ? a : { parts: [], rest: "", coverage: 0, complete: false, line: "" };
}

var aConduct = anOf("conduct");
eq(aConduct.parts.length, 3 - 1, "conduct = con- + duct", aConduct.line);
ok(aConduct.complete, "conduct 是完整拆解", aConduct.line);
ok(/duct/.test(aConduct.line) && /con-/.test(aConduct.line), "拆出了 con- 与 duct");

var aBio = anOf("biography");
eq(aBio.parts.length, 3, "biography = bio + graph + -y", aBio.line);
ok(/bio/.test(aBio.line) && /graph/.test(aBio.line), "没有把 bio 误拆成 bi-（二）");

var aMaint = anOf("maintain");
ok(/tain|ten|tent/.test(aMaint.line), "maintain 能认出词根 tain（拿住）", aMaint.line);

var aProd = anOf("produced");
eq(aProd.inflated, "produce", "produced 先还原成 produce 再拆");
ok(/duc|duct/.test(aProd.line), "还原后拆出词根 duc");

eq(anOf("person").parts.length, 0, "person 里不会硬拆出 son");
eq(anOf("month").parts.length, 0, "month 里不会硬拆出 mon");
eq(anOf("academic").parts.length, 0, "academic 这种词源不符的词不拆");
eq(anOf("in terms of").parts.length, 0, "词组不拆");
eq(anOf("  ").parts.length, 0, "空词不报错");
eq(ST.morphKindLabel("root"), "词根", "词素类型有中文名");

var hitSpect = ST.searchMorph("看", "root");
ok(hitSpect.length >= 1, "能按中文含义搜词根（看）", hitSpect.length);
var hitDuc = ST.searchMorph("duc");
ok(hitDuc.some(function (e) { return /duc/.test(e.text); }), "能按拼写搜词根（duc）");
ok(ST.searchMorph("transport").length >= 1, "能按例词搜（transport）");
var spectRoots = ST.searchMorph("spect", "root");
ok(spectRoots.length >= 1, "按拼写 + 类型筛选能搜到词根 spect", spectRoots.length);
ok(spectRoots.every(function (e) { return e.kind === "root"; }), "词根筛选只返回词根");
ok(ST.searchMorph("tion", "suffix").every(function (e) { return e.kind === "suffix"; }), "后缀筛选只返回后缀");
ok(ST.searchMorph("tion", "root").every(function (e) { return e.kind === "root"; }), "换成词根筛选就换一批结果");
ok(ST.searchMorph("zzzz", "root").length === 0, "搜不到时返回空数组");

var MS = ST.morphStats();
eq(MS.total, MLIB.length, "统计口径与词库一致");
ok(MS.covered > 100, "内置词书里能拆出词素的词够多", MS.covered);
ok(MS.hit > 50, "有足够多词素在词书里找到了词", MS.hit);
ok(MS.byKind.prefix === kinds.prefix, "统计里前缀数与词库一致");

// 反查：某个词素能查到哪些词
var topEntry = MLIB.filter(function (e) {
  return ST.morphWords(e.id, 99).length > 1;
})[0];
ok(!!topEntry, "至少有一个词素对应多个词");
if (topEntry) {
  var ws = ST.morphWords(topEntry.id, 99);
  ok(ws.length >= 2, "反查到多个词：" + topEntry.text, ws.length);
  ok(ws.every(function (w) { return w && w.word && w.id; }), "反查结果是完整词条");
  ok(ws.some(function (w) { return anOf(w).parts.some(function (p) { return p.id === topEntry.id; }); }), "反查结果确实含该词素");
}

// 同根词：自身不出现，且都能查出共同的词素
var sibWord = ST.allWords().filter(function (w) {
  return anOf(w).parts.length;
})[0];
var sibs = ST.siblingsOf(sibWord, 6);
ok(sibs.length >= 1, "同根词推荐非空：" + sibWord.word, sibs.length);
ok(sibs.every(function (x) { return x.word.id !== sibWord.id; }), "同根词不含自己");
ok(sibs.length <= 6, "同根词数量受限制", sibs.length);
ok(sibs.every(function (x) {
  return anOf(x.word).parts.some(function (p) {
    return p.id === x.via.id;
  });
}), "同根词确实共享该词素");

// 词书里每个词都能安全拆一遍
var crashed = 0;
ST.allWords().forEach(function (w) {
  try {
    ST.analysisOf(w);
  } catch (e) {
    crashed++;
  }
});
eq(crashed, 0, "303 个词全部拆解无异常");

console.log("\n" + (fail ? "✗ 失败 " + fail + " 项，" : "") + "通过 " + pass + " 项");
process.exit(fail ? 1 : 0);