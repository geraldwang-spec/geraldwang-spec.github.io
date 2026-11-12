/* freq.html English dictionary */
I18N.add({
  "頻率 Trim 與 PPM": "Frequency Trim & PPM",
  "量到的頻率和目標頻率差多少：換成 2<sup>20</sup> 為基準的 trim value，以及多筆量測的 PPM 誤差。": "How far the measured frequency is from the target: converted to a trim value based on 2<sup>20</sup>, plus PPM error across multiple measurements.",
  "量測頻率": "Measured frequency",
  "目標頻率": "Target frequency",
  "兩個頻率單位相同就好（Excel 裡兩邊都乘 10<sup>6</sup>，會互相抵消）。": "Both frequencies just need the same unit (the Excel sheet multiplies both by 10<sup>6</sup>, which cancels out).",
  "取整數": "Rounded",
  "頻率差": "Difference",
  "誤差": "Error",
  "方向": "Direction",
  "量測<span class=\"h\">偏低</span>，trim 為負": "Measured <span class=\"h\">low</span>, trim is negative",
  "量測<span class=\"h\">偏高</span>，trim 為正": "Measured <span class=\"h\">high</span>, trim is positive",
  "剛好": "Exact",
  "PPM 誤差（多筆）": "PPM error (multiple)",
  "規格 ±": "Spec ±",
  "實際頻率（Hz）": "Actual freq (Hz)",
  "標準頻率（Hz）": "Reference freq (Hz)",
  "差（Hz）": "Diff (Hz)",
  "判定": "Result",
  "＋ 新增一筆": "+ Add row",
  "PPM = (實際 − 標準) ÷ 標準 × 10<sup>6</sup>。正值代表頻率偏高。": "PPM = (actual − reference) ÷ reference × 10<sup>6</sup>. Positive means the frequency is high."
});
I18N.rules([
  [/^第 (\d+) 筆實際頻率$/, "Row $1 actual frequency"],
  [/^第 (\d+) 筆標準頻率$/, "Row $1 reference frequency"],
  [/^刪除第 (\d+) 筆$/, "Delete row $1"]
]);
I18N.frags({ " 32-bit 補數)": " 32-bit two's complement)" });
/* meta description */
I18N.add({
  "量測頻率和目標頻率差多少，換成 2^20 基準的 trim value，以及多筆量測的 PPM 誤差。": "How far the measured frequency is from target, converted to a 2^20-based trim value, plus PPM error over multiple measurements."
});
