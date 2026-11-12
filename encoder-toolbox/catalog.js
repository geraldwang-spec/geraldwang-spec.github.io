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
        id: "capacitive",
        name: "電容式編碼器",
        href: "capacitive.html",
        summary: "不用磁鐵改用電場：四相激勵怎麼合成出隨角度改變相位的訊號，同步解調後得到 sin、cos，再用粗 / 細通道組出絕對角度。",
        tags: ["四相激勵", "同步解調", "粗 / 細通道"],
        points: ["轉子圖案與發射電極的耦合動畫", "接收訊號相位落後 = 轉子角度", "粗 / 細組合與 Nonius 對照、與霍爾比較"]
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
  },
  {
    id: "life",
    name: "生活",
    icon: "box",
    summary: "日常會用到的小工具。",
    tools: [
      {
        id: "bus",
        name: "公車直達查詢",
        href: "bus.html",
        summary: "輸入上車、下車地點，找出兩邊步行範圍內的公車站之間能直達的路線，和指定日期的班表、即時到站。",
        tags: ["TDX", "新北 / 臺北 / 客運", "附近站牌"],
        points: ["依站名找位置，納入步行 150–800 公尺內的站牌", "排除反方向的車，標出上下車站與步行距離", "依日期星期幾列出班次；當天可查即時到站"]
      }
    ]
  }
];

/*
 * 英文版目錄（語言切到 English 時使用）。
 * 鍵："大項id" 或 "大項id/工具id"；沒寫的欄位會沿用上面的中文。
 */
window.CATALOG_EN = {
  "encoder": {
    name: "Encoder Toolbox",
    summary: "Learning and calculation tools for magnetic encoders in robot joints: from analog Hall-sensor signals and ADC sampling to absolute angle from a dual-track Nonius design."
  },
  "encoder/sensors": {
    name: "Read Head & Track Sensors",
    summary: "Unroll the magnetic ring and see how the 8 Hall sensors are laid out, what each one reads, and how pairs are subtracted into the ADC's 4 channels.",
    tags: ["8 sensors", "Differential", "Peak at S pole"],
    points: ["Animated read head over the main and Nonius tracks", "Live sin+ / sin− / cos+ / cos− readings", "Readings at S centre, N centre and pole boundary"]
  },
  "encoder/atan2": {
    name: "atan2 Unit Circle",
    summary: "Drag a point on the unit circle to see how atan2 turns sin and cos into an angle, and where atan(s ÷ c) goes wrong.",
    tags: ["atan2(s, c)", "Quadrants", "−180 ~ 180°"],
    points: ["Draggable unit circle with live angle", "atan vs atan2, and the divide-by-zero case", "Angle straight from ADC readings, with C example"]
  },
  "encoder/nonius": {
    name: "Nonius Absolute Angle",
    summary: "A dual-track design from ADC readings all the way to absolute angle, with theoretical and measured values side by side.",
    tags: ["32/31 · 64/63", "sin / cos", "atan2 → θ"],
    points: ["Rotating ring animation, ADC scope and Lissajous plot", "Add noise, offset and gain error to watch k go wrong", "MCU firmware flow and C example"]
  },
  "encoder/capacitive": {
    name: "Capacitive Encoder",
    summary: "Electric field instead of magnets: how four-phase excitation builds a signal whose phase follows the angle, how synchronous demodulation yields sin and cos, and how coarse / fine channels combine into absolute angle.",
    tags: ["Four-phase excitation", "Synchronous demod", "Coarse / fine"],
    points: ["Animated coupling between rotor pattern and transmit electrodes", "Receive-signal phase lag = rotor angle", "Coarse / fine vs Nonius, and vs Hall sensing"]
  },
  "encoder/adc": {
    name: "ADC Voltage Converter",
    summary: "Voltage to ADC code and code back to voltage: see the size of one step and the quantization error.",
    tags: ["8 ~ 16 bit", "Vin · Vref", "LSB"],
    points: ["Binary, hex, range ruler and transfer staircase", "Clipping beyond full scale", "Centre value of a ratiometric Hall sensor"]
  },
  "bench": {
    name: "Bench Calculations",
    summary: "Everyday calculations for hardware validation and firmware work: frequency error, voltage tolerance, measurement statistics, RF cable loss, image ROI coordinates, MCU timer settings and battery life."
  },
  "bench/freq": {
    name: "Frequency Trim & PPM",
    summary: "How far the measured frequency is from target, converted to a 2^20-based trim value, plus PPM error over multiple measurements.",
    tags: ["trim value", "PPM", "2^20"],
    points: ["trim = (measured ÷ target − 1) × 2^20", "PPM for many frequencies at once", "Set a ±ppm spec for automatic PASS / FAIL"]
  },
  "bench/voltage": {
    name: "Voltage Tolerance",
    summary: "High / low limits of a rail at ±%, and the max / min range when the voltage drops to a given percentage.",
    tags: ["±5%", "High / Low", "Voltage drop"],
    points: ["Limits and formula for one voltage", "Several rails in one table", "Drop-percentage table you can copy into Excel"]
  },
  "bench/stats": {
    name: "Measurement Stats 3σ",
    summary: "Paste a list of measurements to get max, min, mean, standard deviation and mean ± 3σ limits.",
    tags: ["STDEV", "±3σ", "Outliers"],
    points: ["Paste a whole column straight from Excel", "Adjustable k, with out-of-range points flagged", "Scatter plot of every measurement"]
  },
  "bench/cable": {
    name: "RF Cable Loss",
    summary: "Total loss at each frequency from cable attenuation spec, length, connectors and assembly loss.",
    tags: ["dB/m", "Connector 0.06√f", "Volken cables"],
    points: ["Four combinations: 1–2 connectors × 1–2 assemblies", "Any frequency, interpolated from the spec table", "Editable spec table, add your own rows"]
  },
  "bench/roi": {
    name: "ROI Coordinates",
    summary: "Square sampling boxes on an image: centre and top-left coordinates from resolution, box size and position ratio.",
    tags: ["1920×1080", "ROI", "Top-left"],
    points: ["Five boxes: centre and four corners", "Frame preview, boxes outside the frame flagged", "Near / far focus limits recorded together"]
  },
  "bench/pit": {
    name: "KL27 PIT LDVAL",
    summary: "How often the NXP KL27 PIT timer should fire and what to put in LDVAL; or work back from LDVAL to the period.",
    tags: ["KL27", "PIT", "LDVAL hex"],
    points: ["LDVAL = period × clock − 1", "Actual period and error after rounding", "C initialization example"]
  },
  "bench/battery": {
    name: "Battery Life",
    summary: "Enter capacity, current draw, full and cut-off voltage to get run time, plus the voltage for each % of charge.",
    tags: ["mAh", "Run time", "Charge % ↔ voltage"],
    points: ["Capacity ÷ current = run time", "Voltage and remaining time at 1% / 5% / 10% steps", "Linear or Li-ion discharge curve"]
  },
  "dev": {
    name: "Software Design",
    summary: "Small tools for planning a system: sketch the tables, relationships and ideas before you write code."
  },
  "dev/design-board": {
    name: "Design Sketchboard",
    summary: "Edit tables, columns and relationships in a form and watch the ER diagram draw itself; also mind maps and discussion notes.",
    tags: ["ER diagram", "Mind map", "Mermaid"],
    points: ["PK / FK / UK, one-to-many and many-to-many", "Wheel to zoom, Space to pan; download PNG / SVG / Mermaid", "Saved in the browser, export / import JSON"]
  },
  "learn": {
    name: "Learning",
    summary: "Interactive notes from studying new topics: how a system is layered, how data flows and how the numbers work out — click around to understand it."
  },
  "learn/epaper-arch": {
    name: "Bedside E-paper Architecture",
    summary: "Four-layer architecture from the hospital HIS to a bedside RTL8720DN e-paper display. Click blocks and arrows to see responsibilities, protocols, open questions and sources.",
    tags: ["RTL8720DN", "HL7 / FHIR", "Wi‑Fi"],
    points: ["Four layers and the links between them (standard / custom)", "Image pipeline, data size and SPI transfer-time estimates", "Checklist grouped by who to ask, plus references"]
  },
  "learn/epaper-bits": {
    name: "Bitmap Encoding Demo",
    summary: "How a screen becomes the bytes sent to an e-paper panel: set width, height and bits per pixel, then hover any pixel to see which bit of which byte it lands in.",
    tags: ["1 / 2 / 4 bpp", "960×640", "MSB first"],
    points: ["Black/white, 4-colour and 16-level grey encodings with polarity switch", "Bed-card example: laid-out text turned into a bitmap", "Padding bits, bytes per row, and copy the full data"]
  },
  "life": {
    name: "Everyday",
    summary: "Small tools for daily life."
  },
  "life/bus": {
    name: "Direct Bus Finder",
    summary: "Enter where you get on and off to find bus routes that run directly between stops within walking distance of each, with timetables for a chosen date and live arrivals.",
    tags: ["TDX", "New Taipei / Taipei / intercity", "Nearby stops"],
    points: ["Finds the place by name and includes stops within 150–800 m walk", "Drops buses going the wrong way; shows boarding / alighting stops and walk distance", "Trips for the chosen weekday; live arrivals for today"]
  }
};
