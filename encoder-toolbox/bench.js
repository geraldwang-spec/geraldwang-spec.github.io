/* 硬體量測計算：共用小工具 */
const $ = id => document.getElementById(id);
const num = el => { const v = parseFloat((typeof el === 'string' ? $(el) : el).value); return isNaN(v) ? NaN : v; };
/* 去掉尾端多餘的 0：fmt(1.2500, 4) → "1.25" */
function fmt(x, d = 4) {
  if (!isFinite(x)) return '—';
  let s = x.toFixed(d);
  if (s.includes('.')) s = s.replace(/\.?0+$/, '');
  if (s === '-0') s = '0';
  return s.replace(/^-/, '−');
}
const sgn = (x, d) => (x > 0 ? '+' : '') + fmt(x, d);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
async function copyText(text, btn) {
  try { await navigator.clipboard.writeText(text); }
  catch (e) { const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch (_) {} t.remove(); }
  if (btn) { const o = btn.textContent; btn.textContent = '已複製'; setTimeout(() => btn.textContent = o, 1200); }
}
