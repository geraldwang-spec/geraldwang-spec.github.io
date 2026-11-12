/*
 * 工具站語言設定（中文 / English）
 *
 * 決定語言的順序：
 *   1. 網址參數 ?lang=zh 或 ?lang=en（工具站內嵌頁面時會帶上）
 *   2. 使用者在切換鈕選過的語言（存在 localStorage 的 "lang"）
 *   3. 瀏覽器（作業系統）的語言：zh-* → 中文，其他語言一律 English
 *
 * 頁面本身用中文寫，英文翻譯放在 i18n/<頁面>.js：
 *   I18N.add({ "中文原文": "English", ... })      完全相符的文字（或元素的 innerHTML）
 *   I18N.rules([[/^(\d+) 個工具$/, "$1 tools"]])   有數字等變動內容的文字
 * 切到英文時，會把畫面上（包含之後用 JS 產生的）相符文字換成英文。
 * 在 JS 裡可以用 I18N.t("中文") 取得目前語言的字串，或 I18N.pick("中文", "English")。
 */
(function () {
  var KEY = 'lang';
  function fromNavigator() {
    var l = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || '';
    return /^zh\b/i.test(l) ? 'zh' : 'en';
  }
  function norm(l) { l = String(l || '').toLowerCase(); return l.indexOf('zh') === 0 ? 'zh' : l.indexOf('en') === 0 ? 'en' : null; }
  var param = null, stored = null;
  try { param = norm(new URLSearchParams(location.search).get('lang')); } catch (e) {}
  try { stored = norm(localStorage.getItem(KEY)); } catch (e) {}
  var lang = param || stored || fromNavigator();

  var dict = new Map(), rules = [], frags = [];
  var CJK = /[㐀-鿿豈-﫿　-〿＀-￯]/;
  var clean = function (s) { return String(s).replace(/\s+/g, ' ').trim(); };

  function lookup(s) {
    var k = clean(s);
    if (!k || !CJK.test(k)) return null;
    if (dict.has(k)) return dict.get(k);
    for (var i = 0; i < rules.length; i++) {
      var r = rules[i];
      if (r[0].test(k)) { r[0].lastIndex = 0; return k.replace(r[0], r[1]); }
    }
    // 片段替換（程式碼註解、多行文字）：保留原本的空白與換行
    if (frags.length) {
      var out = String(s), hit = false;
      for (var j = 0; j < frags.length; j++) {
        var f = frags[j];
        if (typeof f[0] === 'string') {
          if (out.indexOf(f[0]) >= 0) { out = out.split(f[0]).join(f[1]); hit = true; }
        } else {
          f[0].lastIndex = 0;
          if (f[0].test(out)) { f[0].lastIndex = 0; out = out.replace(f[0], f[1]); hit = true; }
        }
      }
      if (hit) return { raw: out };
    }
    return null;
  }
  function val(v, s) { return v && typeof v === 'object' ? v.raw : v; }
  function t(s) { if (lang !== 'en') return s; var v = lookup(s); return v == null ? s : val(v); }

  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1 };
  var LIVE = '[id],input,select,button,textarea,canvas,svg,output,img';
  var ATTRS = ['title', 'placeholder', 'aria-label', 'alt', 'data-tip', 'label'];
  function trAttrs(el) {
    for (var i = 0; i < ATTRS.length; i++) {
      var a = el.getAttribute && el.getAttribute(ATTRS[i]);
      if (a && CJK.test(a)) { var v = lookup(a); if (v != null) el.setAttribute(ATTRS[i], val(v)); }
    }
    if (el.tagName === 'INPUT' && /^(button|submit|reset)$/i.test(el.type) && CJK.test(el.value)) {
      var w = lookup(el.value); if (w != null) el.value = val(w);
    }
    if (el.tagName === 'OPTGROUP') { var g = el.getAttribute('label'); if (g) { var gv = lookup(g); if (gv != null) el.setAttribute('label', val(gv)); } }
  }
  function trText(n) {
    var s = n.nodeValue;
    if (!s || !CJK.test(s)) return;
    var v = lookup(s);
    if (v == null) return;
    if (typeof v === 'object') { if (v.raw !== s) n.nodeValue = v.raw; return; }
    var lead = s.match(/^\s*/)[0], tail = s.match(/\s*$/)[0];
    n.nodeValue = lead + v + tail;
  }
  function walk(node) {
    if (node.nodeType === 3) { trText(node); return; }
    if (node.nodeType !== 1 || SKIP[node.tagName] || (node.hasAttribute && node.hasAttribute('data-no-i18n'))) return;
    trAttrs(node);
    var txt = node.textContent;
    if (!txt || !CJK.test(txt)) {
      // 沒有中文文字，但屬性裡可能有
      if (node.querySelector && node.querySelector('[title],[placeholder],[aria-label],[alt],[data-tip],optgroup,input')) {
        var els = node.querySelectorAll('[title],[placeholder],[aria-label],[alt],[data-tip],optgroup,input');
        for (var j = 0; j < els.length; j++) trAttrs(els[j]);
      }
      return;
    }
    // 整個元素（含 <b>、<code> 等行內標籤）完全相符：一次換掉
    // （裡面有 id、表單元件、圖形的元素不整段換，以免 JS 抓著的元素被換掉）
    if (txt.length < 4000 && node.firstChild && (node.childNodes.length > 1 || node.firstChild.nodeType !== 3) && !node.querySelector(LIVE)) {
      // 整段比對只看字典（規則和片段只用在單純的文字上）
      var key = clean(node.innerHTML);
      if (dict.has(key)) { node.innerHTML = dict.get(key); return; }
    }
    var c = node.firstChild;
    while (c) { var next = c.nextSibling; walk(c); c = next; }
  }

  var observer = null, busy = false;
  function translateNow(root) {
    if (lang !== 'en') return;
    busy = true;
    try {
      walk(root || document.documentElement);
      var tt = lookup(document.title); if (tt != null) document.title = val(tt);
      // 搜尋結果用的頁面說明
      var md = document.querySelector('meta[name="description"]');
      if (md) { var mv = lookup(md.content); if (mv != null) md.content = val(mv); }
    }
    finally { busy = false; if (observer) observer.takeRecords(); }
  }
  function startObserver() {
    if (lang !== 'en' || observer || !window.MutationObserver) return;
    observer = new MutationObserver(function (list) {
      if (busy) return;
      busy = true;
      try {
        var targets = new Set();
        for (var i = 0; i < list.length; i++) {
          var m = list[i];
          if (m.type === 'characterData') trText(m.target);
          else if (m.type === 'attributes') trAttrs(m.target);
          else if (m.addedNodes.length) targets.add(m.target);
        }
        // 對「被加入內容的父元素」整個重看一次，才能比對含行內標籤的整段文字
        targets.forEach(function (el) {
          if (!el.isConnected) return;
          for (var p = el.parentElement; p; p = p.parentElement) if (targets.has(p)) return;
          walk(el);
        });
        var tt = lookup(document.title); if (tt != null) document.title = val(tt);
      } finally { busy = false; observer.takeRecords(); }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS.concat(['value']) });
  }

  function setLang(l) {
    l = norm(l) || 'en';
    try { localStorage.setItem(KEY, l); } catch (e) {}
    if (l === lang) return;
    var u = new URL(location.href);
    if (u.searchParams.has('lang')) { u.searchParams.set('lang', l); location.replace(u.href); }
    else location.reload();
  }

  /*
   * 設定鍵（齒輪）＋設定面板，目前面板裡有「語言」。
   *   I18N.settings(host)              放進 host 元素裡（首頁上方工具列用）
   *   沒有 host 時：固定在畫面右下角（獨立開啟的工具頁）
   * 之後要加其他設定，在 rows 裡多放一列即可。
   */
  var CSS = '.i18s{position:relative;display:inline-flex;font:400 14px/1.4 system-ui,-apple-system,"Segoe UI","Noto Sans TC","PingFang TC","Microsoft JhengHei",sans-serif}' +
    '.i18s.float{position:fixed;right:max(14px,env(safe-area-inset-right,0px));bottom:max(14px,env(safe-area-inset-bottom,0px));z-index:9999}' +
    '.i18s-btn{width:38px;height:38px;display:grid;place-items:center;border-radius:10px;cursor:pointer;color:#b9cadb;background:rgba(20,27,36,.86);border:1px solid rgba(255,255,255,.14);' +
      'box-shadow:0 4px 14px rgba(0,0,0,.18);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);transition:color .2s,border-color .2s}' +
    '.i18s-btn:hover,.i18s-btn[aria-expanded="true"]{color:#fff;border-color:#4a9ee8}' +
    '.i18s-btn svg{width:19px;height:19px;stroke:currentColor;fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;transition:transform .35s}' +
    '.i18s-btn[aria-expanded="true"] svg{transform:rotate(60deg)}' +
    '.i18s.inline .i18s-btn{width:36px;height:36px;border-radius:8px;background:none;box-shadow:none;-webkit-backdrop-filter:none;backdrop-filter:none;border-color:var(--line-2,rgba(255,255,255,.14));color:var(--text,#b9cadb)}' +
    '.i18s-panel{position:absolute;right:0;min-width:240px;padding:14px;border-radius:12px;background:#141b24;color:#e7eef6;border:1px solid #2a4060;box-shadow:0 12px 32px rgba(0,0,0,.35)}' +
    '.i18s.float .i18s-panel{bottom:calc(100% + 8px)}.i18s.inline .i18s-panel{top:calc(100% + 8px);z-index:50}' +
    '.i18s-panel[hidden]{display:none}' +
    '.i18s-title{font-weight:600;font-size:13px;letter-spacing:.04em;color:#9db7cc;margin:0 0 10px}' +
    '.i18s-row{display:flex;align-items:center;justify-content:space-between;gap:12px}' +
    '.i18s-row label{color:#e7eef6}' +
    '.i18s-row select{font:inherit;color:#e7eef6;background:#0f1319;border:1px solid #2a4060;border-radius:7px;padding:5px 8px;cursor:pointer;color-scheme:dark}' +
    '.i18s-hint{margin:10px 0 0;font-size:12px;color:#64809a}' +
    '.i18s :focus-visible{outline:2px solid #4a9ee8;outline-offset:2px}' +
    '@media print{.i18s{display:none}}';
  var GEAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
  var uid = 0;
  function settings(host) {
    if (!document.getElementById('i18sCss')) {
      var st = document.createElement('style'); st.id = 'i18sCss'; st.textContent = CSS; document.head.appendChild(st);
    }
    var en = lang === 'en', id = 'i18s' + (++uid);
    var box = document.createElement('div');
    box.className = 'i18s ' + (host ? 'inline' : 'float');
    box.setAttribute('data-no-i18n', '');
    box.innerHTML =
      '<button type="button" class="i18s-btn" aria-haspopup="true" aria-expanded="false" aria-controls="' + id + '" title="' + (en ? 'Settings' : '設定') + '" aria-label="' + (en ? 'Settings' : '設定') + '">' + GEAR + '</button>' +
      '<div class="i18s-panel" id="' + id + '" role="dialog" aria-label="' + (en ? 'Settings' : '設定') + '" hidden>' +
        '<p class="i18s-title">' + (en ? 'Settings' : '設定') + '</p>' +
        '<div class="i18s-row"><label for="' + id + '-lang">' + (en ? 'Language' : '語言') + '</label>' +
          '<select id="' + id + '-lang"><option value="zh" lang="zh-Hant">中文（繁體）</option><option value="en" lang="en">English</option></select></div>' +
        '<p class="i18s-hint">' + (en ? 'Default follows your browser language.' : '預設依瀏覽器語言，選過後會記住。') + '</p>' +
      '</div>';
    var btn = box.querySelector('.i18s-btn'), panel = box.querySelector('.i18s-panel'), sel = box.querySelector('select');
    sel.value = lang;
    function show(on) { panel.hidden = !on; btn.setAttribute('aria-expanded', String(on)); if (on) sel.focus(); }
    btn.addEventListener('click', function () { show(panel.hidden); });
    sel.addEventListener('change', function () { setLang(sel.value); });
    document.addEventListener('click', function (e) { if (!panel.hidden && !box.contains(e.target)) show(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) { show(false); btn.focus(); } });
    (host || document.body).appendChild(box);
    return box;
  }
  /* 獨立開啟的工具頁（非內嵌）：右下角放設定鍵；內嵌時由首頁的設定鍵控制 */
  function addToggle() {
    var embed = false;
    try { embed = new URLSearchParams(location.search).get('embed') === '1'; } catch (e) {}
    if (embed || window.I18N_NO_TOGGLE || document.querySelector('.i18s.float')) return;
    settings(null);
  }

  window.I18N = {
    lang: lang,
    isEn: lang === 'en',
    add: function (obj) { for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) dict.set(clean(k), obj[k]); },
    rules: function (arr) { for (var i = 0; i < arr.length; i++) rules.push(arr[i]); },
    frags: function (obj) {
      if (Array.isArray(obj)) { for (var i = 0; i < obj.length; i++) frags.push(obj[i]); return; }
      // 長的片段先換，避免被短的片段切開
      Object.keys(obj).sort(function (a, b) { return b.length - a.length; }).forEach(function (k) { frags.push([k, obj[k]]); });
    },
    t: t,
    pick: function (zh, en) { return lang === 'en' ? en : zh; },
    set: setLang,
    translate: translateNow,
    settings: settings,
    browserLang: fromNavigator
  };

  // 各頁共用的字串
  window.I18N.add({
    '← 回到工具站': '← Back to toolkit',
    '已複製': 'Copied',
    '複製': 'Copy',
    '複製結果': 'Copy results',
    '複製表格': 'Copy table',
    'C 範例': 'C example'
  });

  document.documentElement.lang = lang === 'en' ? 'en' : 'zh-Hant';
  if (lang === 'en') {
    // 翻譯完成前先藏起內容，避免閃一下中文
    var hide = document.createElement('style');
    hide.id = 'i18nHide'; hide.textContent = 'body{visibility:hidden}';
    (document.head || document.documentElement).appendChild(hide);
    var reveal = function () { var h = document.getElementById('i18nHide'); if (h) h.remove(); };
    setTimeout(reveal, 1500);
    startObserver();
    document.addEventListener('DOMContentLoaded', function () { translateNow(); reveal(); });
  }
  document.addEventListener('DOMContentLoaded', addToggle);
})();
