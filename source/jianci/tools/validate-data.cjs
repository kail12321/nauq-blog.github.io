/*!
 * 词库校验：字段完整性、唯一性、例句可用性、可出题率
 * 用法：node tools/validate-data.cjs
 */
"use strict";

var path = require("path");
var ROOT = path.join(__dirname, "..");
var SRS = require(path.join(ROOT, "js", "srs.js"));

var BOOKS = [
  { id: "kaoyan", label: "考研核心词汇", prefix: "ky-" },
  { id: "cet6", label: "六级核心词汇", prefix: "c6-" },
  { id: "ielts", label: "雅思核心词汇", prefix: "il-" }
];

var POS_RE = /^(n|v|adj|adv|prep|conj|pron|num|phr)(\.\/(n|v|adj|adv|prep|conj|pron|num|phr))*\.$/;
var problems = [];
var notes = [];
var allWords = {};
var totalWords = 0;

function bad(book, word, msg) {
  problems.push("[" + book + "] " + (word ? word + " · " : "") + msg);
}

BOOKS.forEach(function (meta) {
  var file = path.join(ROOT, "js", "data", meta.id + ".js");
  var words;
  try {
    words = require(file);
  } catch (e) {
    bad(meta.id, "", "无法加载：" + e.message);
    return;
  }
  if (!Array.isArray(words) || !words.length) {
    bad(meta.id, "", "没有导出词条数组");
    return;
  }
  totalWords += words.length;

  var ids = {};
  var seen = {};
  var blankable = 0;
  var choiceOnly = 0;
  var looseOnly = 0;

  words.forEach(function (w, i) {
    var tag = w && w.id ? w.id : "#" + i;

    if (!w || typeof w !== "object") return bad(meta.id, tag, "不是对象");
    if (!w.id || typeof w.id !== "string") bad(meta.id, tag, "缺少 id");
    else {
      if (ids[w.id]) bad(meta.id, tag, "id 重复");
      ids[w.id] = 1;
      if (w.id.indexOf(meta.prefix) !== 0) bad(meta.id, tag, "id 前缀不是 " + meta.prefix);
    }
    if (!w.word || !/^[A-Za-z][A-Za-z'\-\. ]*$/.test(w.word)) bad(meta.id, tag, "word 缺失或含非法字符：" + w.word);
    if (w.word) {
      var low = w.word.toLowerCase();
      if (seen[low]) bad(meta.id, tag, "word 重复");
      seen[low] = 1;
      if (allWords[low]) notes.push("跨词书重复：" + w.word + "（" + allWords[low] + " 与 " + meta.id + "）");
      allWords[low] = meta.id;
    }
    if (!w.phonetic || w.phonetic.charAt(0) !== "/" || w.phonetic.charAt(w.phonetic.length - 1) !== "/")
      bad(meta.id, tag, "phonetic 未用斜杠包裹：" + w.phonetic);
    if (!w.pos || !POS_RE.test(w.pos)) bad(meta.id, tag, "pos 不合法：" + w.pos);
    if (!w.meaning || typeof w.meaning !== "string") bad(meta.id, tag, "meaning 缺失");
    else {
      if (/[A-Za-z]/.test(w.meaning)) bad(meta.id, tag, "meaning 含英文字母：" + w.meaning);
      if (w.meaning.length > 30) bad(meta.id, tag, "meaning 超过 30 字");
    }

    var ex = w.example;
    if (!ex || !ex.en || !ex.zh) bad(meta.id, tag, "example.en / example.zh 缺失");
    else {
      if (/["\\]/.test(ex.en)) bad(meta.id, tag, "例句含双引号或反斜杠");
      var wc = ex.en.trim().split(/\s+/).length;
      if (wc < 6 || wc > 24) bad(meta.id, tag, "例句词数异常：" + wc + " → " + ex.en);
      var lower = ex.en.toLowerCase();
      var strictHit = [w.word].concat((w.forms || []).map(function (f) {
        return f.word;
      })).some(function (c) {
        return c && lower.indexOf(String(c).toLowerCase()) >= 0;
      });
      if (!strictHit) {
        if (SRS.findToken(ex.en, w)) looseOnly++;
        else bad(meta.id, tag, "例句中找不到该词或其变形：" + ex.en);
      }
    }

    if (!Array.isArray(w.similar) || !w.similar.length || w.similar.length > 3)
      bad(meta.id, tag, "similar 必须是 1-3 条");
    else
      w.similar.forEach(function (s, k) {
        if (!s || !s.word || !s.meaning || !s.note) bad(meta.id, tag, "similar[" + k + "] 字段不完整");
      });

    if (!Array.isArray(w.forms) || !w.forms.length || w.forms.length > 3)
      bad(meta.id, tag, "forms 必须是 1-3 条");
    else
      w.forms.forEach(function (f, k) {
        if (!f || !f.word || !f.meaning) bad(meta.id, tag, "forms[" + k + "] 字段不完整");
        else if (f.pos && !POS_RE.test(f.pos)) bad(meta.id, tag, "forms[" + k + "].pos 不合法：" + f.pos);
      });

    // 可出题性：优先例句填空
    var q = SRS.buildQuestion(w, words);
    if (!q) bad(meta.id, tag, "无法生成题目");
    else if (q.type === "blank") {
      blankable++;
      if (q.prompt.indexOf("______") < 0) bad(meta.id, tag, "填空题没有挖空");
      if (!SRS.checkAnswer(q.answer, w, q.answer)) bad(meta.id, tag, "正确答案无法被判对：" + q.answer);
      if (SRS.checkAnswer("zzzzzz", w, q.answer)) bad(meta.id, tag, "任意输入被判对");
    } else choiceOnly++;
  });

  console.log(
    [
      pad(meta.label, 14),
      "词条 " + pad(words.length, 4),
      "例句填空 " + pad(blankable, 4),
      "选择题 " + pad(choiceOnly, 4),
      "仅词根兜底 " + pad(looseOnly, 4)
    ].join(" | ")
  );
});

function pad(s, n) {
  s = String(s);
  while (s.length < n) s += " ";
  return s;
}

console.log("\n合计词条：" + totalWords);
if (notes.length) {
  var uniq = {};
  notes.forEach(function (n) {
    uniq[n] = 1;
  });
  var list = Object.keys(uniq);
  console.log("跨词书重复（正常现象，最多 5 条示例）：");
  list.slice(0, 5).forEach(function (n) {
    console.log("  · " + n);
  });
  console.log("  共 " + list.length + " 条");
}

if (problems.length) {
  console.log("\n发现问题 " + problems.length + " 处：");
  problems.slice(0, 40).forEach(function (p) {
    console.log("  ✗ " + p);
  });
  if (problems.length > 40) console.log("  ... 其余 " + (problems.length - 40) + " 条省略");
  process.exit(1);
} else {
  console.log("\n✓ 全部词库校验通过");
}