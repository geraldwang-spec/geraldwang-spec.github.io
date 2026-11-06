/*
 * 工具站目錄：左側選單和首頁內容都由這份資料產生。
 *
 * 新增一個「大項」：在 CATALOG 陣列加一個物件
 *   { id, name, icon, summary, tools: [...] }
 *   id      網址用的代號（英文、數字、-），例如 "motor"
 *   icon    圖示名稱，可用：encoder、chip、motor、gear、wave、ruler、box、diagram、book
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
        id: "sensors",
        name: "讀頭與磁軌感測器",
        href: "sensors.html",
        summary: "把磁環攤平，看 8 顆霍爾感測器怎麼排、各自讀到多少，再兩兩相減成 ADC 的 4 個通道。",
        tags: ["8 顆感測器", "差動", "S 極最大"],
        points: ["主軌與 Nonius 軌的讀頭動作動畫", "sin+ / sin− / cos+ / cos− 即時讀值", "S 中間、N 中間、交界的讀值對照表"]
      },
      {
        id: "atan2",
        name: "atan2 單位圓",
        href: "atan2.html",
        summary: "拖動單位圓上的點，看 sin、cos 怎麼用 atan2 變成角度，以及 atan(s ÷ c) 在哪裡會算錯。",
        tags: ["atan2(s, c)", "象限", "−180 ~ 180°"],
        points: ["可拖動的單位圓，即時顯示角度", "atan 與 atan2 對照、除以零的情況", "從 ADC 讀值直接算角度、C 範例"]
      },
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
  },
  {
    id: "bench",
    name: "硬體量測計算",
    icon: "chip",
    summary: "硬體驗證和韌體開發常用的小計算：頻率誤差、電壓容差、量測統計、RF 線損、影像取樣框座標、MCU 計時器設定、電池續航。",
    tools: [
      {
        id: "freq",
        name: "頻率 Trim 與 PPM",
        href: "freq.html",
        summary: "量測頻率和目標頻率差多少，換成 2^20 基準的 trim value，以及多筆量測的 PPM 誤差。",
        tags: ["trim value", "PPM", "2^20"],
        points: ["trim =（量測 ÷ 目標 − 1）× 2^20", "多筆頻率一次算 PPM", "設定 ±ppm 規格自動判定 PASS / FAIL"]
      },
      {
        id: "voltage",
        name: "電壓容差計算",
        href: "voltage.html",
        summary: "電源軌 ±% 的上下限，以及電壓降到某個百分比時的 max / min 範圍。",
        tags: ["±5%", "High / Low", "電壓下降"],
        points: ["單一電壓上下限與公式", "多個電源軌一次列表", "下降百分比對照表，可複製到 Excel"]
      },
      {
        id: "stats",
        name: "量測統計 3σ",
        href: "stats.html",
        summary: "貼上一串量測值，算最大、最小、平均、標準差和平均 ± 3σ 上下限。",
        tags: ["STDEV", "±3σ", "異常值"],
        points: ["直接從 Excel 貼上一整欄", "k 倍數可調，標出超出範圍的點", "散佈圖看每一筆量測"]
      },
      {
        id: "cable",
        name: "RF Cable Loss 計算",
        href: "cable.html",
        summary: "依線材衰減規格、線長、接頭和組裝損耗，算出各頻率的總 loss。",
        tags: ["dB/m", "接頭 0.06√f", "沃肯線材"],
        points: ["接頭 1~2 個 × 組裝 1~2 處的四種組合", "任意頻率用規格表內插", "規格表可編輯、新增"]
      },
      {
        id: "roi",
        name: "取樣範圍座標計算",
        href: "roi.html",
        summary: "影像上的正方形取樣框：從解析度、框大小和位置比例算出中心點與左上角座標。",
        tags: ["1920×1080", "ROI", "左上座標"],
        points: ["中間、四角五個取樣框", "畫面預覽，標出超出畫面的框", "近焦 / 遠焦上下限一起記錄"]
      },
      {
        id: "pit",
        name: "KL27 PIT LDVAL 計算",
        href: "pit.html",
        summary: "NXP KL27 的 PIT 計時器要多久觸發一次，LDVAL 填多少；也能從 LDVAL 算回週期。",
        tags: ["KL27", "PIT", "LDVAL hex"],
        points: ["LDVAL = 週期 × 時脈 − 1", "四捨五入後的實際週期與誤差", "附 C 初始化範例"]
      },
      {
        id: "battery",
        name: "電池續航計算",
        href: "battery.html",
        summary: "輸入電池容量、耗電流、滿電和斷電電壓，算出可以用多久，以及每個電量 % 對應的電壓。",
        tags: ["mAh", "續航時間", "電量 % ↔ 電壓"],
        points: ["容量 ÷ 電流 = 可用時間", "1% / 5% / 10% 電壓與剩餘時間表", "線性或鋰電池放電曲線"]
      }
    ]
  },
  {
    id: "dev",
    name: "軟體設計",
    icon: "diagram",
    summary: "規劃系統時用的小工具：先把資料表、關係和想法畫出來，再開始寫程式。",
    tools: [
      {
        id: "design-board",
        name: "設計草稿板",
        href: "design-board.html",
        summary: "用表單編輯資料表、欄位和關係，右邊即時畫出 ER 圖；也能畫心智圖、記討論筆記。",
        tags: ["ER 圖", "心智圖", "Mermaid"],
        points: ["PK / FK / UK 與一對多、多對多關係", "滾輪縮放、空白鍵拖曳；下載 PNG / SVG / Mermaid", "存在瀏覽器，可匯出 / 匯入 JSON"]
      }
    ]
  },
  {
    id: "learn",
    name: "學習",
    icon: "book",
    summary: "研究新主題時整理的互動筆記：系統怎麼分層、資料怎麼流、數字怎麼算，邊點邊看懂。",
    tools: [
      {
        id: "epaper-arch",
        name: "病床電子紙系統架構",
        href: "epaper-architecture.html",
        summary: "醫院 HIS 到床邊 RTL8720DN 電子紙的四層架構，點區塊和箭頭看職責、通訊方式、需要確認的事項與出處。",
        tags: ["RTL8720DN", "HL7 / FHIR", "Wi‑Fi"],
        points: ["四層架構與層間通訊方式（標準 / 自訂）", "圖片處理流程與資料量、SPI 傳輸時間試算", "依詢問對象整理的確認清單與參考資料"]
      },
      {
        id: "epaper-bits",
        name: "點陣編碼示範",
        href: "epaper-bits.html",
        summary: "畫面怎麼變成傳給電子紙的 bytes：自訂寬、高與每點 bit 數，滑過任一點看它在哪個 byte 的哪個 bit。",
        tags: ["1 / 2 / 4 bpp", "960×640", "MSB 在左"],
        points: ["黑白、四色、16 階灰三種編碼與極性切換", "床頭卡範例：中文排版後轉成點陣", "補齊位元、每列 bytes 與完整資料複製"]
      }
    ]
  }
];
