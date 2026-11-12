/* cable.html English dictionary */
I18N.add({
  "RF Cable Loss 計算": "RF Cable Loss Calculator",
  "依線材規格書的衰減值（dB/m），加上接頭和組裝損耗，算出整條線在各頻率的總 loss。預設值是沃肯線材的規格。": "From the cable datasheet's attenuation (dB/m) plus connector and assembly loss, get the total loss of the whole cable at each frequency. Defaults are Volken cable specs.",
  "線長": "Cable length",
  "使用頻率": "Operating frequency",
  "接頭 loss 係數（loss = 係數 × √f）": "Connector loss coefficient (loss = coefficient × √f)",
  "組裝 loss（每處）": "Assembly loss (each)",
  "線材衰減（內插）": "Cable attenuation (interpolated)",
  "線材 loss": "Cable loss",
  "接頭 loss（每個）": "Connector loss (each)",
  "接頭 ×1 + 組裝 ×1": "Connector ×1 + assembly ×1",
  "接頭 ×1 + 組裝 ×2": "Connector ×1 + assembly ×2",
  "接頭 ×2 + 組裝 ×1": "Connector ×2 + assembly ×1",
  "接頭 ×2 + 組裝 ×2": "Connector ×2 + assembly ×2",
  "線材衰減在規格表兩點之間用線性內插。": "Cable attenuation is linearly interpolated between two points of the spec table.",
  "線材規格表": "Cable spec table",
  "頻率 (GHz)": "Frequency (GHz)",
  "衰減 (dB/m)": "Attenuation (dB/m)",
  "平均功率 (W)": "Average power (W)",
  "接頭1+組裝1": "Conn1+Asm1",
  "接頭1+組裝2": "Conn1+Asm2",
  "接頭2+組裝1": "Conn2+Asm1",
  "接頭2+組裝2": "Conn2+Asm2",
  "＋ 新增一列": "+ Add row",
  "接頭 loss 改用各列自己的頻率計算": "Compute connector loss at each row's own frequency",
  "線材 loss = 衰減 (dB/m) ÷ 100 × 線長 (cm)。預設接頭 loss 都用上方的使用頻率計算（和原本 Excel 相同）；勾選後每一列用該列頻率。單位都是 dB。": "Cable loss = attenuation (dB/m) ÷ 100 × length (cm). By default connector loss uses the operating frequency above (same as the original Excel); tick the box to use each row's frequency instead. All values in dB."
});
I18N.rules([
  [/^第 (\d+) 列$/, "Row $1"],
  [/^刪除第 (\d+) 列$/, "Delete row $1"],
  [/^(.+) GHz、(.+) cm 的總 loss$/, "Total loss at $1 GHz, $2 cm"]
]);
I18N.frags({
  "只有一列規格。": "Only one spec row. ",
  "超出規格表範圍，用最後兩列外插。": "Beyond the spec table, extrapolated from the last two rows. ",
  "低於規格表範圍，用前兩列外插。": "Below the spec table, extrapolated from the first two rows. ",
  "線材衰減在規格表兩點之間用線性內插。": "Cable attenuation is linearly interpolated between two points of the spec table."
});
/* meta description */
I18N.add({
  "依線材衰減規格、線長、接頭和組裝損耗，算出各頻率的總 loss。": "Total loss at each frequency from cable attenuation spec, length, connectors and assembly loss."
});
