# 機器人關節工具站

機器人關節相關的學習與計算工具，純 HTML，不需要建置。

- `index.html`：工具站首頁（左側選單 + 工具卡片，工具直接在頁面內開啟）
- `catalog.js`：工具目錄。新增大項或工具只要改這個檔案
- `sensors.html`：讀頭與磁軌感測器（8 顆差動霍爾的排列與讀值）
- `nonius.html`：Nonius 雙磁軌絕對角度計算
- `adc.html`：ADC 電壓換算器

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

工具頁面可在 `<head>` 加入讀取 `?embed=1&theme=dark` 的小段 script（參考 `nonius.html`），在工具站內嵌時會自動換成深色並隱藏返回連結。

線上版：https://geraldwang-spec.github.io/encoder-toolbox/

## 更新目錄後

改完 `catalog.js` 後，把 `index.html` 裡 `catalog.js?v=...` 的版本號改成新的（例如日期加時間），瀏覽器才會抓到新目錄。
