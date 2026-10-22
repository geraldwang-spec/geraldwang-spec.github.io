/*
 * 工具站目錄：左側選單和首頁內容都由這份資料產生。
 *
 * 新增一個「大項」：在 CATALOG 陣列加一個物件
 *   { id, name, icon, summary, tools: [...] }
 *   id      網址用的代號（英文、數字、-），例如 "motor"
 *   icon    圖示名稱，可用：encoder、chip、motor、gear、wave、ruler、box
 *
 * 在大項裡新增一個「工具」：在它的 tools 陣列加一個物件
 *   { id, name, href, summary, tags: [...], points: [...] }
 *   href    工具頁面的路徑（放在同一個資料夾裡的 .html）
 *   tags    卡片上方的小標籤
 *   points  卡片上的重點條列
 */
window.CATALOG = [
  {
    id: "encoder",
    name: "編碼器工具箱",
    icon: "encoder",
    summary: "機器人關節磁性編碼器的學習與計算工具：從霍爾感測器的類比訊號、ADC 取樣，到 Nonius 雙磁軌算出絕對角度。",
    tools: [
      {
        id: "nonius",
        name: "Nonius 絕對角度計算",
        href: "nonius.html",
        summary: "雙磁軌從 ADC 讀值一路算到絕對角度，理論值和實測值並排比較。",
        tags: ["32/31 · 64/63", "sin / cos", "atan2 → θ"],
        points: ["磁環轉動動畫、ADC 示波器、李薩如圖", "加入雜訊、偏移、增益誤差，觀察 k 判錯", "MCU 韌體流程與 C 範例"]
      },
      {
        id: "adc",
        name: "ADC 電壓換算器",
        href: "adc.html",
        summary: "電壓換成 ADC 數字、數字換回電壓，看一格多大、量化誤差多少。",
        tags: ["8 ~ 16 bit", "Vin · Vref", "LSB"],
        points: ["二進位、十六進位、量程尺、轉換階梯圖", "超過量程的截斷", "比例式霍爾感測器的中心值"]
      }
    ]
  }
];
