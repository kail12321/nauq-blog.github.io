/* 简词 · 评论区 —— 复用 WorkBuddy 云服务（独立表 jianci_comments，公开读 / 限长写） */
(function () {
  var ENDPOINT = 'https://xinghe-guestbook.app.workbuddy.host';
  var PK = 'wbpk_4ZIhceXcDU8edbXAC18P3N_lsxfdQFQ1ejJAMhUXfGuNctaJt1CS2gO';
  var TABLE = 'jianci_comments';

  var listEl = document.getElementById('cmtList');
  var totalEl = document.getElementById('cmtTotal');
  var tipEl = document.getElementById('cmtTip');
  var btn = document.getElementById('cmtPost');
  var textEl = document.getElementById('cmtText');
  var nickEl = document.getElementById('cmtNick');
  var cntEl = document.getElementById('cmtCnt');
  if (!listEl || !btn) return;

  var cloud = null;
  try {
    if (typeof WorkBuddyCloud !== 'undefined') {
      cloud = WorkBuddyCloud.createWorkBuddyCloud({ endpoint: ENDPOINT, publishableKey: PK });
    }
  } catch (e) { cloud = null; }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fmtTime(iso) {
    var d = new Date(iso);
    var p = function (n) { return (n < 10 ? '0' : '') + n; };
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
  }
  var COLORS = ['#4f6ef7', '#8b5cf6', '#0ea5a4', '#e879a0', '#f59e0b', '#3aa675'];
  function avaColor(name) {
    var h = 0;
    for (var i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
    return COLORS[h % COLORS.length];
  }
  function showTip(text, ok) {
    tipEl.textContent = text;
    tipEl.className = 'cmt-tip ' + (ok ? 'ok' : 'err');
    if (text) setTimeout(function () { if (tipEl.textContent === text) tipEl.textContent = ''; }, 4000);
  }
  function render(rows) {
    if (!rows || !rows.length) {
      listEl.innerHTML = '<div class="cmt-empty">还没有评论，来抢沙发吧 ✨</div>';
      return;
    }
    listEl.innerHTML = rows.map(function (m) {
      var name = m.nickname || '匿名同学';
      return '<div class="cmt">'
        + '<div class="cmt-head">'
        + '<div class="cmt-ava" style="background:' + avaColor(name) + '">' + escapeHtml(name.slice(0, 1)) + '</div>'
        + '<span class="cmt-name">' + escapeHtml(name) + '</span>'
        + '<span class="cmt-time">' + fmtTime(m.created_at) + '</span>'
        + '</div>'
        + '<div class="cmt-body">' + escapeHtml(m.content) + '</div>'
        + '</div>';
    }).join('');
  }
  function load() {
    if (!cloud) {
      listEl.innerHTML = '<div class="cmt-empty">评论服务暂时不可用，稍后再试试～</div>';
      return;
    }
    listEl.innerHTML = '<div class="cmt-empty">正在加载评论…</div>';
    cloud.database.from(TABLE)
      .select('id, nickname, content, created_at')
      .order('created_at', { ascending: false })
      .limit(50)
      .then(function (res) {
        if (res.error) {
          listEl.innerHTML = '<div class="cmt-empty">评论加载失败：' + escapeHtml(res.error.message || '未知错误') + '</div>';
          return;
        }
        render(res.data);
        totalEl.textContent = '大家的评论（' + ((res.data && res.data.length) || 0) + '）';
      });
  }

  btn.addEventListener('click', function () {
    if (!cloud) { showTip('评论服务暂时不可用，稍后再试试～', false); return; }
    var text = textEl.value.trim();
    if (!text) { showTip('评论内容不能为空哦～', false); return; }
    if (text.length > 300) { showTip('评论超过 300 字了', false); return; }
    var nick = nickEl.value.trim();
    if (nick.length > 20) { showTip('昵称最多 20 个字', false); return; }
    btn.disabled = true;
    cloud.database.from(TABLE)
      .insert({ nickname: nick || '匿名同学', content: text })
      .then(function (res) {
        btn.disabled = false;
        if (res.error) { showTip('发表失败：' + (res.error.message || '请稍后再试'), false); return; }
        textEl.value = '';
        cntEl.textContent = '0';
        showTip('✅ 已发表，感谢你的反馈！', true);
        load();
      });
  });
  textEl.addEventListener('input', function () { cntEl.textContent = String(textEl.value.length); });
  document.getElementById('cmtRefresh').addEventListener('click', load);

  load();
})();
