// テキスト「配列を使った描画」練習問題：折れ線グラフ

function setup(){
  createCanvas(400, 400);
  background(240);

  // 配列をランダムに初期化する
  let scores = [];

  // 横線を引く
  const n = 10;
  for(let i = 0; i < n; i++){
    line(0, height * i / n, width, height * i / n);
    //line(1点目のx,1点目のy,2点目のx,2点目のy)
    scores[i] = random(60, 100); // 60以上100未満のランダムな数を代入
  }

  for(let i = 0; i < scores.length; i++){
    //点をプロット
    const dx = width / scores.length;
    let x = dx * (i + 1 / 2);
    let y = height * (1 - scores[i] / 100);
    strokeWeight(5); // ?
    fill(0);
    ellipse(x, y, 2);
    
    //テキストを挿入
    stroke(255, 0, 0);
    strokeWeight(1);
    noFill();
    text(scores[i].toPrecision(3), x - 10, y + 20);

    //折れ線を描く
    if(i >= 1){
      let px = dx * (i - 1 /2);
      let py = height * (1 - scores[i - 1] / 100);
      stroke(0);
      strokeWeight(3);
      line(px, py, x, y);
    }
  }
}