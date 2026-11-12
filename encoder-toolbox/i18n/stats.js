/* stats.html English dictionary */
I18N.add({
  "量測統計 3σ": "Measurement Stats 3σ",
  "貼上一串量測值，算出最大、最小、平均、標準差，以及平均 ± 3σ 的上下限，並標出落在範圍外的點。": "Paste a list of measurements to get the max, min, mean, standard deviation and mean ± 3σ limits, with out-of-range points flagged.",
  "量測值（換行、逗號、空白或 Tab 分隔，可直接從 Excel 貼上）": "Measurements (separated by newlines, commas, spaces or tabs — paste straight from Excel)",
  "倍數 k": "Multiplier k",
  "清空": "Clear",
  "載入範例": "Load example",
  "平均": "Mean",
  "標準差（STDEV，樣本）": "Std dev (STDEV, sample)",
  "標準差（STDEV.P，母體）": "Std dev (STDEV.P, population)",
  "超出範圍": "Out of range",
  "無": "None",
  "每一筆量測值": "Every measurement",
  "每筆量測值與平均、上下限的散佈圖": "Scatter plot of each measurement against the mean and limits",
  "第幾筆": "Sample #",
  "至少需要 2 筆資料": "Need at least 2 values",
  "實線是平均，虛線是 ±kσ 上下限。紅點是落在上下限外的量測值。": "The solid line is the mean; dashed lines are the ±kσ limits. Red dots are measurements outside the limits."
});
I18N.rules([
  [/^共 (\d+) 筆$/, "$1 values"],
  [/^(\d+) 筆：$/, "$1 value(s):\u00a0"]
]);
I18N.frags({ "、": ", " });
/* meta description */
I18N.add({
  "貼上一串量測值，算最大、最小、平均、標準差和平均 ± 3σ 上下限。": "Paste a list of measurements to get max, min, mean, standard deviation and mean ± 3σ limits."
});
