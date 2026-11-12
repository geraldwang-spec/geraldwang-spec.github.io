# 工程師工具站

硬體、韌體與軟體開發用的學習與計算工具，純 HTML，不需要建置。

- `index.html`：工具站首頁（左側選單 + 工具卡片，工具直接在頁面內開啟）
- `catalog.js`：工具目錄。新增大項或工具只要改這個檔案
- `sensors.html`：讀頭與磁軌感測器（8 顆差動霍爾的排列與讀值）
- `atan2.html`：atan2 單位圓（sin、cos 怎麼變成角度）
- `nonius.html`：Nonius 雙磁軌絕對角度計算
- `capacitive.html`：電容式編碼器（四相激勵、同步解調、粗 / 細通道）
- `adc.html`：ADC 電壓換算器

硬體量測計算（大項 `bench`，由原本的 Excel 小工具改寫，共用 `bench.css`、`bench.js`）：

- `freq.html`：頻率 Trim value 與 PPM
- `voltage.html`：電壓容差 ±% 與電壓下降對照表
- `stats.html`：量測統計（Max / Min / 平均 / 標準差 / ±3σ）
- `cable.html`：RF Cable Loss（線材 + 接頭 + 組裝）
- `roi.html`：影像取樣範圍座標
- `pit.html`：KL27 PIT LDVAL 計算
- `battery.html`：電池續航（容量、耗電流、每個 % 的電壓）

軟體設計（大項 `dev`）：

- `design-board.html`：設計草稿板（用表單畫 ER 圖與心智圖，Mermaid 出圖；資料存在瀏覽器 localStorage，可匯出／匯入 JSON）

學習（大項 `learn`）：

- `epaper-architecture.html`：病床電子紙系統架構（HIS → 中介伺服器 → Wi‑Fi → RTL8720DN 電子紙，含通訊方式、確認清單、圖片處理流程、資料量與 SPI 試算、參考資料）
- `epaper-bits.html`：點陣編碼示範（自訂寬、高與 1 / 2 / 4 bpp，看每個點落在哪個 byte 的哪個 bit）

## 語言設定（中文 / English）

- 預設依瀏覽器（作業系統）語言：`zh-*` 顯示中文，其他語言一律顯示英文。
- 首頁右上角、獨立開啟的工具頁右下角有「中文 / EN」切換鈕，選過的語言存在 localStorage（`lang`），之後都用它。
- 網址可加 `?lang=zh` 或 `?lang=en` 指定語言；首頁內嵌工具時會自動帶上。
- `i18n.js`：共用的語言判斷與翻譯程式。頁面本身照樣用中文寫，英文放在 `i18n/<頁面名稱>.js`：
  - `I18N.add({ "中文": "English" })`：完全相符的文字、屬性（title、placeholder、aria-label）或整段 innerHTML
  - `I18N.rules([[/^共 (\d+) 筆$/, "$1 values"]])`：含數字等變動內容的文字
  - `I18N.frags({ "// 中文註解": "// English comment" })`：程式碼區塊裡的片段
  - JS 裡要直接選字串（例如複製到剪貼簿的表頭、canvas 文字）用 `I18N.pick("中文", "English")`
- 目錄的英文在 `catalog.js` 下方的 `CATALOG_EN`。

新增工具頁時，在 `<meta charset>` 後面加上：

```html
<script src="i18n.js"></script><script src="i18n/新頁面.js"></script>
```

## 新增大項

在 `catalog.js` 的 `CATALOG` 陣列加一個物件：

```js
{ id: "motor", name: "馬達選型", icon: "motor", summary: "說明", tools: [] }
```

## 新增工具

把工具頁面（.html）放進這個資料夾，再到對應大項的 `tools` 加一筆：

```js
{ id: "torque", name: "力矩計算", href: "torque.html", summary: "說明", tags: ["N·m"], points: ["重點"] }
```

英文版在 `CATALOG_EN` 加一筆（鍵是 `"大項id/工具id"`，沒寫的欄位會沿用中文）：

```js
"bench/torque": { name: "Torque", summary: "...", tags: ["N·m"], points: ["..."] }
```

工具頁面可在 `<head>` 加入讀取 `?embed=1&theme=dark` 的小段 script（參考 `nonius.html`），在工具站內嵌時會自動換成深色並隱藏返回連結。

線上版：https://geraldwang-spec.github.io/encoder-toolbox/

## 更新目錄後

改完 `catalog.js` 後，把 `index.html` 裡 `catalog.js?v=...` 的版本號改成新的（例如日期加時間），瀏覽器才會抓到新目錄。
