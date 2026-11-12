/* battery.html English dictionary */
(function () {
  function dur(s) {
    var m = s.match(/^(?:(\d+) 天 )?(?:(\d+) 小時 )?(\d+) 分$/);
    if (m) return (m[1] ? m[1] + " d " : "") + (m[2] ? m[2] + " h " : "") + m[3] + " min";
    m = s.match(/^(.+) 秒$/);
    return m ? m[1] + " s" : s;
  }
  I18N.add({
    "電池續航計算": "Battery Life Calculator",
    "輸入電池容量、耗電流、滿電和斷電電壓，算出可以用多久，並列出每個電量 % 對應的電壓和剩餘時間。": "Enter the battery capacity, current draw, full and cut-off voltage to get the run time, plus a table of the voltage and remaining time at each % of charge.",
    "電池容量": "Battery capacity",
    "平均耗電流": "Average current draw",
    "電流單位": "Current unit",
    "滿電電壓（100%）": "Full voltage (100%)",
    "斷電電壓（0%）": "Cut-off voltage (0%)",
    "常用電池": "Common batteries",
    "鋰電 4.2 / 3.0": "Li-ion 4.2 / 3.0",
    "鋰電 4.2 / 3.3": "Li-ion 4.2 / 3.3",
    "磷酸鐵鋰 3.65 / 2.5": "LiFePO4 3.65 / 2.5",
    "鹼性 2×AA 3.0 / 1.6": "Alkaline 2×AA 3.0 / 1.6",
    "可用容量（老化、溫度、轉換效率）": "Usable capacity (ageing, temperature, conversion efficiency)",
    "電壓與電量的關係": "Voltage vs charge",
    "線性": "Linear",
    "鋰電池放電曲線": "Li-ion discharge curve",
    "電壓從斷電到滿電平均分配，適合先粗估。": "Voltage spread evenly from cut-off to full — good for a first rough estimate.",
    "鋰電池中段電壓很平、頭尾掉得快，比線性更接近實際。": "Li-ion voltage is flat in the middle and drops fast at both ends — closer to reality than linear.",
    "可以用": "Run time",
    "換算": "Also",
    "可用容量": "Usable capacity",
    "每 1% 電量": "Per 1% of charge",
    "電量百分比與電池電壓的關係圖": "Chart of charge percentage versus battery voltage",
    "電量": "Charge",
    "每個 % 的電壓與剩餘時間": "Voltage and remaining time at each %",
    "間隔": "Step",
    "電壓 (V)": "Voltage (V)",
    "剩餘容量 (mAh)": "Remaining (mAh)",
    "剩餘時間": "Remaining time",
    "已使用時間": "Elapsed time",
    "公式與注意事項在下方。實際電池的電壓會隨負載電流和溫度變動，這裡是估算。": "Formulas and caveats are below. A real battery's voltage varies with load current and temperature; these are estimates.",
    "計算公式": "Formulas",
    "= 滿電電壓、V": "= full voltage, V",
    "= 斷電電壓。": "= cut-off voltage.",
    "1. 可以用多久": "1. How long it lasts",
    "t (小時) = C × η ÷ I": "t (hours) = C × η ÷ I",
    "例：1000 mAh × 100% ÷ 50 mA = 20 小時": "e.g. 1000 mAh × 100% ÷ 50 mA = 20 hours",
    "mAh 的定義就是「以 1 mA 放電可以撐幾小時」，所以容量除以電流就是時間。電流選 µA 時先 ÷ 1000 換成 mA，選 A 時 × 1000。這和 C-rate 的定義相同：1 Ah 的電池以 1C（1 A）放電可用 1 小時，以 0.5C（500 mA）可用 2 小時〔1〕。": "mAh literally means “how many hours it lasts at 1 mA”, so capacity divided by current is time. For µA, divide by 1000 to get mA first; for A, multiply by 1000. This matches the definition of C-rate: a 1 Ah battery discharged at 1C (1 A) lasts 1 hour, and at 0.5C (500 mA) lasts 2 hours [1].",
    "2. 每個 % 的剩餘容量與時間": "2. Remaining capacity and time at each %",
    "每 1% 容量 = C × η ÷ 100": "Capacity per 1% = C × η ÷ 100",
    "剩餘容量 = C × η × SoC ÷ 100": "Remaining capacity = C × η × SoC ÷ 100",
    "喚醒": "wake",
    "休眠": "sleep",
    ")，再填進上面的「平均耗電流」。": "), then enter that as the “Average current draw” above.",
    "3. 電量 % 對應的電壓：線性": "3. Voltage at each %: linear",
    "例：3.0 + (4.2 − 3.0) × 50 ÷ 100 = 3.6 V": "e.g. 3.0 + (4.2 − 3.0) × 50 ÷ 100 = 3.6 V",
    "把斷電到滿電的電壓平均分成 100 份。算法簡單，適合先粗估或設定電量顯示的門檻，但和真實電池的放電曲線有落差。": "Split the range from cut-off to full voltage into 100 equal parts. Simple, and fine for a rough estimate or for setting charge-indicator thresholds, but it differs from a real battery's discharge curve.",
    "4. 電量 % 對應的電壓：鋰電池放電曲線": "4. Voltage at each %: Li-ion discharge curve",
    "典型": "typ",
    "(SoC) − 3.0) ÷ (4.2 − 3.0)，兩個點之間用線性內插": "(SoC) − 3.0) ÷ (4.2 − 3.0), linearly interpolated between points",
    "典型電壓 (V)": "Typical voltage (V)",
    "這是一般 4.2 V 鋰電池（鈷酸鋰、三元）靜置後的典型開路電壓（OCV），先換成 0 ~ 1 的比例 f，再套到你輸入的滿電 / 斷電電壓。鋰電池中段電壓很平、頭尾變化很快〔2〕，所以中段用電壓判斷電量誤差會比較大。表中數值是常見電芯的典型值，不是特定型號的量測結果；要更準，應該用自己的電芯照〔4〕的方法量一份 OCV 表。": "This is the typical rested open-circuit voltage (OCV) of an ordinary 4.2 V Li-ion cell (LCO, NMC), converted to a 0 ~ 1 ratio f and then mapped onto the full / cut-off voltages you entered. Li-ion voltage is flat in the middle and changes fast at both ends [2], so estimating charge from voltage is less accurate mid-range. The values are typical for common cells, not measurements of a specific model; for better accuracy, measure an OCV table for your own cell using the method in [4].",
    "注意事項": "Caveats",
    "電壓要靜置後才準。": "Voltage is only accurate after resting.",
    "用電壓判斷電量時，電池要開路靜置一段時間（Battery University 建議至少 4 小時），充放電中的電壓會偏移；溫度高電壓偏高，溫度低電壓偏低〔2〕。": "To judge charge from voltage, the battery must rest open-circuit for a while (Battery University suggests at least 4 hours); voltage shifts while charging or discharging. Higher temperature reads higher, lower temperature reads lower [2].",
    "負載大，會提早斷電。": "Heavy loads cut off early.",
    "大電流時電池內阻造成的壓降會讓電壓提早掉到斷電點，冷天更明顯〔3〕。鋰電池放到 3.0 V 時通常還剩約 5% 的電量〔3〕。": "At high current, the drop across the internal resistance pulls the voltage down to cut-off early, more so in the cold [3]. A Li-ion cell discharged to 3.0 V usually still has about 5% left [3].",
    "放電越快，能放出的容量越少。": "The faster the discharge, the less capacity you get.",
    "C-rate 越高，量到的容量越低〔1〕。可以用 Peukert 公式修正：t = H × (C ÷ (I × H))": "The higher the C-rate, the lower the measured capacity [1]. Peukert's law corrects for this: t = H × (C ÷ (I × H))",
    "，H 是容量標稱時的放電小時數，鋰電池的 n 約 1.0 ~ 1.05，鉛酸約 1.05 ~ 1.6〔5〕。一般小電流的鋰電池產品，直接用「可用容量 %」打個折就夠了。": ", where H is the discharge time in hours the capacity is rated at; n is about 1.0 ~ 1.05 for Li-ion and 1.05 ~ 1.6 for lead-acid [5]. For typical low-current Li-ion products, simply discounting with “Usable capacity %” is enough.",
    "老化和轉換效率。": "Ageing and conversion efficiency.",
    "電池循環次數多了容量會下降，經過 DC-DC 轉換也有損耗，這些都可以用「可用容量 %」一起扣掉，例如填 80 ~ 90%。": "Capacity falls as the battery cycles, and DC-DC conversion loses some too; account for both with “Usable capacity %”, e.g. 80 ~ 90%.",
    "常用電池預設值的出處": "Sources for the battery presets",
    "電池": "Battery",
    "滿電": "Full",
    "斷電": "Cut-off",
    "出處": "Source",
    "鋰電（鈷酸鋰 / 三元）": "Li-ion (LCO / NMC)",
    "手機、筆電等可攜裝置多在 3.00 V/cell 關機〔3〕": "Phones, laptops and other portables mostly shut down at 3.00 V/cell [3]",
    "鋰電（保守斷電）": "Li-ion (conservative cut-off)",
    "提高斷電點保留電量、減少深放電，常見於韌體自訂的低電量關機": "A higher cut-off keeps some charge in reserve and avoids deep discharge; common in firmware-defined low-battery shutdown",
    "磷酸鐵鋰 LiFePO4": "Lithium iron phosphate LiFePO4",
    "PSL IFR18650EC 規格書：Charge Cut-off 3.65 V、Recommended Discharge Cut-off 2.5 V〔6〕": "PSL IFR18650EC datasheet: Charge Cut-off 3.65 V, Recommended Discharge Cut-off 2.5 V [6]",
    "鹼性電池 2×AA": "Alkaline 2×AA",
    "Energizer E91 規格書：標稱 1.5 V、容量以連續放電到 0.8 V 計算〔7〕，兩顆串聯即 3.0 V / 1.6 V": "Energizer E91 datasheet: nominal 1.5 V, capacity rated for continuous discharge to 0.8 V [7]; two in series give 3.0 V / 1.6 V",
    "參考資料": "References",
    "PSL IFR18650EC LiFePO4 Data Sheet（Digi-Key）": "PSL IFR18650EC LiFePO4 Data Sheet (Digi-Key)"
  });
  I18N.rules([
    [/^(?:\d+ 天 )?(?:\d+ 小時 )?\d+ 分$|^[\d.,]+ 秒$/, function (s) { return dur(s); }],
    [/^例：(.+) 小時$/, "e.g. $1 hours"],
    [/^(.+) 小時$/, "$1 h"],
    [/^(.+) 分鐘 · (.+) 天$/, "$1 min · $2 days"],
    [/^(.+) mAh，約 (.+)$/, function (_, a, b) { return a + " mAh, about " + dur(b); }],
    [/^(\d+)% 時電壓$/, "Voltage at $1%"]
  ]);
  I18N.frags({
    "符號：C = 電池容量 (mAh)、η = 可用容量比例、I = 平均耗電流 (mA)、SoC = 電量 (0 ~ 100%)、V": "Symbols: C = battery capacity (mAh), η = usable-capacity ratio, I = average current (mA), SoC = state of charge (0 ~ 100%), V",
    "剩餘時間 = t × SoC ÷ 100": "Remaining time = t × SoC ÷ 100",
    "已使用時間 = t × (100 − SoC) ÷ 100": "Elapsed time = t × (100 − SoC) ÷ 100",
    "這裡假設耗電流固定，所以電量和時間是正比關係。如果裝置有休眠和喚醒兩種狀態，平均電流 = (I": "This assumes a constant current draw, so charge and time are proportional. If the device alternates between sleep and wake, average current = (I",
    " 小時</b>": " h</b>",
    "〔": "[", "〕": "]"
  });
})();
/* meta description */
I18N.add({
  "輸入電池容量、耗電流、滿電和斷電電壓，算出可以用多久，以及每個電量 % 對應的電壓。": "Enter capacity, current draw, full and cut-off voltage to get run time, plus the voltage for each % of charge."
});
