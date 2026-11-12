/* roi.html English dictionary */
I18N.add({
  "取樣範圍座標計算": "ROI Coordinate Calculator",
  "影像上放幾個正方形取樣框：給解析度、框的大小和位置比例，算出框的中心點和左上角座標。點表格的一列，下方預覽會用那一列的解析度畫出所有框。": "Place square sampling boxes on an image: from resolution, box size and position ratio, get each box's centre and top-left coordinates. Click a table row and the preview below draws all boxes at that row's resolution.",
  "取樣框": "Sampling boxes",
  "套用 1920×1080 五點": "Apply 1920×1080 five-point preset",
  "名稱": "Name",
  "長 (px)": "Length (px)",
  "寬 (px)": "Width (px)",
  "取樣範圍": "ROI size",
  "X 比例": "X ratio",
  "Y 比例": "Y ratio",
  "中間點 X": "Centre X",
  "中間點 Y": "Centre Y",
  "左上 X": "Top-left X",
  "左上 Y": "Top-left Y",
  "近焦下限": "Near focus min",
  "近焦上限": "Near focus max",
  "遠焦下限": "Far focus min",
  "遠焦上限": "Far focus max",
  "＋ 新增一列": "+ Add row",
  "中間點 = 長（寬）× 比例，左上 = 中間點 − 取樣範圍 ÷ 2。比例 0.5 是畫面正中央，0.2 / 0.8 是靠近四個角。近焦、遠焦上下限只是一起記錄，不參與計算。": "Centre = length (width) × ratio; top-left = centre − ROI size ÷ 2. A ratio of 0.5 is the exact centre; 0.2 / 0.8 are near the four corners. Near / far focus limits are only recorded alongside and aren't used in the calculation.",
  "預覽": "Preview",
  "影像畫面與取樣框位置預覽": "Preview of the image frame and box positions"
});
I18N.rules([
  [/^刪除第 (\d+) 列$/, "Delete row $1"],
  [/^預覽：(.+)$/, "Preview: $1"],
  [/^超出畫面：(.+)$/, function (_, s) { return "Outside the frame: " + s.split("、").join(", "); }]
]);
I18N.frags({ "座標 (": " (" });
/* meta description */
I18N.add({
  "影像上的正方形取樣框：從解析度、框大小和位置比例算出中心點與左上角座標。": "Square sampling boxes on an image: centre and top-left coordinates from resolution, box size and position ratio."
});
