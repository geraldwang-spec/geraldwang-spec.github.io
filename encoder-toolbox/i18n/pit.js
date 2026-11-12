/* pit.html English dictionary */
I18N.add({
  "KL27 PIT LDVAL 計算": "KL27 PIT LDVAL Calculator",
  "NXP Kinetis KL27 的 PIT（Periodic Interrupt Timer）要多久觸發一次，LDVAL 就填多少。也可以反過來，從 LDVAL 算回週期。": "How often the NXP Kinetis KL27 PIT (Periodic Interrupt Timer) should fire, and what value goes into LDVAL. You can also go the other way, from LDVAL back to the period.",
  "PIT 時脈（bus clock）": "PIT clock (bus clock)",
  "觸發週期": "Trigger period",
  "週期單位": "Period unit",
  "常用": "Presets",
  "整數": "Exact integer",
  "已四捨五入": "Rounded",
  "週期太短": "Period too short",
  "超過 32 bit": "Exceeds 32 bit",
  "十進位": "Decimal",
  "一個 tick": "One tick",
  "實際週期": "Actual period",
  "週期誤差": "Period error",
  "最長週期（32 bit）": "Longest period (32 bit)",
  "反過來：LDVAL → 週期": "Reverse: LDVAL → period",
  "LDVAL（十六進位或十進位，0x 開頭視為十六進位）": "LDVAL (hex or decimal; a 0x prefix means hex)",
  "週期": "Period",
  "頻率": "Frequency",
  "請輸入 0 ~ 0xFFFFFFFF": "Enter 0 ~ 0xFFFFFFFF",
  "PIT 從 LDVAL 往下數到 0 才觸發，所以總共數了 LDVAL + 1 個 tick，公式要減 1。": "The PIT counts down from LDVAL and fires at 0, so it counts LDVAL + 1 ticks in total — hence the − 1 in the formula."
});
I18N.rules([
  [/^LDVAL = 週期 ÷ \(1 ÷ 時脈\) − 1 = (.*)$/, "LDVAL = period ÷ (1 ÷ clock) − 1 = $1"],
  [/^(.+?)（(.+?)）$/, "$1 ($2)"]
]);
I18N.frags({
  "// 開 PIT 時脈": "// enable PIT clock",
  "// 啟用 PIT": "// enable PIT",
  "// 週期超出範圍": "// period out of range"
});
