// テキスト「配列を使った描画」練習問題：円グラフ

function setup(){
  createCanvas(400, 400);
  background(240);
  const cx = width / 2;
  const cy = height / 2;
  let r = 360;

  // 配列をランダムに初期化する
  let scores = [];
  for(let i = 0; i < 10; i++){
    scores[i] = random(60, 100); // 60以上100未満のランダムな数を代入
  }

  // 円グラフを描くには割合が必要なので合計を計算しておく
  let total = 0;
  for(let i = 0; i < scores.length; i++){
    total += scores[i];
  }

  // BLANK[1]
  let start = -TWO_PI / 4;
  for(let i = 0; i < scores.length; i++){
    let proportion = scores[i] / total;
    let proportion_percent = proportion * 100;
    let angle = TWO_PI * proportion;
    let stop = start + angle;
    fill(255);
    stroke(0);
    strokeWeight(2);
    arc(cx, cy, r, r, start, stop, PIE); //arc(中心x座標, 中心y座標, 半径, 円弧の開始角, 円弧の終了角, 描画の方向)

    //テキストを配置
    let textX = cx + 0.75 * r / 2 * cos((start + stop) / 2);
    let textY = cy + 0.75 * r / 2 * sin((start + stop) / 2);
    stroke(0);
    strokeWeight(1);
    noFill();
    textAlign(CENTER, CENTER);//テキストの基準点をテキストボックスの中心に変更
    text(scores[i].toPrecision(3) + "\n" + "(" + proportion_percent.toPrecision(3) + "%)", textX, textY);

    start += angle;
  }
}