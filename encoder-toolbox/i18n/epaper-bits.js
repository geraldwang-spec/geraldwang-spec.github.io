/* epaper-bits.html English dictionary */
(function () {
  var COLOR = { "黑": "black", "白": "white", "黃": "yellow", "紅": "red" };
  var colorName = function (s) {
    if (COLOR[s]) return COLOR[s];
    var m = s.match(/^灰階 (\d+)(?:（(.)）)?$/);
    return m ? "grey " + m[1] + (m[2] ? " (" + COLOR[m[2]] + ")" : "") : s;
  };
  I18N.add({
    "點陣編碼示範": "Bitmap Encoding Demo",
    "← 回到病床電子紙系統架構": "← Back to Bedside E-paper Architecture",
    "Layer 4 · 裝置層": "Layer 4 · Device",
    "可以設定寬、高（最大 2048）與每點 bit 數，或直接套用常見面板尺寸。在畫布上點擊或拖曳來上色，下方會即時顯示目前位置附近的二進位與十六進位。「床頭卡範例」先用中文字型排版，再依每點 bit 數轉成點陣，模擬中介伺服器產生畫面的過程。編碼對應以常見控制 IC 為例，實際要以面板規格書為準。": "Set the width, height (up to 2048) and bits per pixel, or apply a common panel size. Click or drag on the canvas to paint; the binary and hex around the current position update live below. The “Bed card” example lays out text with a font first, then converts it to a bitmap at the chosen bits per pixel — mimicking how the middleware server renders a screen. Encodings follow common controller ICs; always check your panel's datasheet.",
    "寬（px）": "Width (px)",
    "高（px）": "Height (px)",
    "常見尺寸": "Common sizes",
    "每點 bit 數": "Bits per pixel",
    "1 · 黑白": "1 · B/W",
    "2 · 四色": "2 · 4-colour",
    "4 · 16 階灰": "4 · 16 greys",
    "極性": "Polarity",
    "1 = 白": "1 = white",
    "0 = 白": "0 = white",
    "畫筆": "Brush colour",
    "畫筆顏色": "Brush colour",
    "黑 00": "Black 00",
    "白 01": "White 01",
    "黃 10": "Yellow 10",
    "紅 11": "Red 11",
    "畫筆灰階": "Brush grey level",
    "筆刷": "Brush size",
    "縮放": "Zoom",
    "符合寬度": "Fit width",
    "範例": "Examples",
    "床頭卡範例": "Bed card",
    "字母 H": "Letter H",
    "方向測試圖": "Orientation test",
    "四色範例": "4-colour sample",
    "灰階漸層": "Grey gradient",
    "清空": "Clear",
    "點陣畫布：方向鍵移動位置，Enter 或空白鍵上色": "Bitmap canvas: arrow keys move, Enter or Space paints",
    "傳給 8720 的資料（依序）": "Data sent to the 8720 (in order)",
    "複製完整資料（十六進位）": "Copy full data (hex)",
    "瀏覽器不允許複製": "The browser didn't allow copying",
    "。": "."
  });
  I18N.rules([
    [/^顯示全部 (\d+) 列 × (\d+) bytes$/, "Showing all $1 rows × $2 bytes"],
    [/^顯示第 (\d+)～(\d+) 列、每列第 (\d+)～(\d+) 個 byte（共 (.+) 列 × (\d+) bytes），移動游標可切換顯示範圍$/, "Showing rows $1–$2, bytes $3–$4 of each row (of $5 rows × $6 bytes). Move the cursor to change the range"],
    [/^(.+) …（共 (.+) bytes）$/, "$1 … ($2 bytes total)"],
    [/^每列 (.+) bits，補到 (.+) bits = (\d+) bytes；共 (.+) bytes(?:（約 (.+)）)?$/, function (_, a, b, c, d, e) { return "Each row " + a + " bits, padded to " + b + " bits = " + c + " bytes; total " + d + " bytes" + (e ? " (about " + e + ")" : ""); }],
    [/^(.+ bit ÷ 8 = .+ bytes)（(?:約 (.+?)，)?每列 (\d+) bytes）$/, function (_, a, kb, rb) { return a + " (" + (kb ? "about " + kb + ", " : "") + rb + " bytes per row)"; }],
    [/^→ byte (.+)（從 0 起算：(.+) 取整數）的 (.+)。目前是(.+)，寫成$/, function (_, i, f, pos, n) { pos = pos.replace(/（/g, " (").replace(/）/g, ")").replace(/～/g, "–"); return "→ byte " + i + " (0-based: floor(" + f + ")), " + pos + ". Currently " + colorName(n) + ", written as"; }],
    [/^寬、高請輸入 1～(\d+)$/, "Width and height must be 1–$1"],
    [/^已複製 (.+) bytes$/, "Copied $1 bytes"]
  ]);
  I18N.frags([
    [/寬度 (\d+) 不是 (\d+) 的倍數，每列最後一個 byte 有 (\d+) 個補齊用的 0（淡色顯示），面板不會顯示這些位元。/g, "Width $1 is not a multiple of $2, so the last byte of each row has $3 padding zeros (shown faded); the panel doesn't display these bits."],
    ["黑白以 1 = 白、0 = 黑為例。", "B/W shown as 1 = white, 0 = black."],
    ["目前設定 0 = 白、1 = 黑，所有位元會反過來。", "Currently set to 0 = white, 1 = black, so every bit is inverted."],
    ["四色以 00 黑、01 白、10 黃、11 紅為例。", "4-colour shown as 00 black, 01 white, 10 yellow, 11 red."],
    ["16 階灰以 0 = 黑、15 = 白為例，每個 byte 存 2 個點。", "16 greys shown as 0 = black, 15 = white, 2 pixels per byte."],
    ["實際編碼請以面板規格書為準。", "Check your panel's datasheet for the actual encoding."],
    ["～bit ", "–bit "]
  ]);
})();
