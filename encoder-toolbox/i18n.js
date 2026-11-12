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
    try { walk(root || document.documentElement); var tt = lookup(document.title); if (tt != null) document.title = val(tt); }
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

  /* 獨立開啟的工具頁（非內嵌）右下角的語言切換鈕 */
  function addToggle() {
    var embed = false;
    try { embed = new URLSearchParams(location.search).get('embed') === '1'; } catch (e) {}
    if (embed || window.I18N_NO_TOGGLE || document.getElementById('i18nToggle')) return;
    var st = document.createElement('style');
    st.textContent = '#i18nToggle{position:fixed;right:max(14px,env(safe-area-inset-right,0px));bottom:max(14px,env(safe-area-inset-bottom,0px));z-index:9999;display:flex;gap:2px;padding:3px;border-radius:999px;' +
      'background:rgba(20,27,36,.86);border:1px solid rgba(255,255,255,.14);box-shadow:0 4px 14px rgba(0,0,0,.18);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);font:500 12.5px/1 system-ui,sans-serif}' +
      '#i18nToggle button{border:0;background:none;color:#b9cadb;padding:6px 10px;border-radius:999px;cursor:pointer;font:inherit}' +
      '#i18nToggle button[aria-pressed="true"]{background:#4a9ee8;color:#0a1a2c}' +
      '#i18nToggle button:focus-visible{outline:2px solid #4a9ee8;outline-offset:1px}@media print{#i18nToggle{display:none}}';
    document.head.appendChild(st);
    var box = document.createElement('div');
    box.id = 'i18nToggle'; box.setAttribute('role', 'group'); box.setAttribute('aria-label', 'Language / 語言'); box.setAttribute('data-no-i18n', '');
    [['zh', '中文'], ['en', 'EN']].forEach(function (p) {
      var b = document.createElement('button');
      b.type = 'button'; b.textContent = p[1]; b.lang = p[0] === 'zh' ? 'zh-Hant' : 'en';
      b.setAttribute('aria-pressed', String(lang === p[0]));
      b.addEventListener('click', function () { setLang(p[0]); });
      box.appendChild(b);
    });
    document.body.appendChild(box);
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
