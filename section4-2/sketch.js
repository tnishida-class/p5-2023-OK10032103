//　テキスト「オブジェクト」
// 練習問題：ボールのサイズをランダムに変更してみよう
// 練習問題：何も操作しなくてもボールが湧いてくる機能を追加しよう

let balls, cycle, count;
let colors;

function setup(){
  createCanvas(windowWidth, windowHeight);
  balls = [];
  cycle = 300;
  count = 0;
  const white = color(255);
  const red = color(255, 0, 0);
  colors = [white, red];
}

function draw(){
  background(160, 192, 255);

  for(let i = 0; i < balls.length; i++){
    let b1 = balls[i];
    
    // ★ここで判定★　移動後の位置と半径を考慮する。また、等号ではなく大きいか小さいかで判定する。ピッタリ０になるわけではないので。
    //壁にぶつかった時の反発
    if(b1.x + b1.vx - (b1.size / 2) < 0 || b1.x + b1.vx + (b1.size / 2) > windowWidth){
        b1.vx = -b1.vx;
    }
    if(b1.y + b1.vy - (b1.size / 2) < 0  || b1.y + b1.vy + (b1.size / 2) > windowHeight){
      b1.vy = -b1.vy;
    } 

    for(let j = i + 1; j < balls.length; j++){
      let b2 = balls[j];

      //★あたり判定は移動後の位置で行うため、距離は移動後の位置を使う
      let d = dist(b1.x + b1.vx, b1.y + b1.vy, b2.x + b2.vx , b2.y + b2.vy);
      if(d <= b1.size / 2 + b2.size / 2){
        //質量を円の長さの2乗に設定
        let m1 = b1.size ** 2;
        let m2 = b2.size ** 2;
        //その時の速度を定数化
        let vx1 = b1.vx;
        let vy1 = b1.vy;
        let vx2 = b2.vx;
        let vy2 = b2.vy;

        //運動量保存則・エネルギー保存則をもとに弾性衝突した場合の速度
        b1.vx = (vx1 * (m1 - m2) / (m1 + m2)) + (vx2 * 2 * m2 / (m1 + m2));
        b2.vx = (vx2 * (m2 - m1) / (m1 + m2)) + (vx1 * 2 * m1 / (m1 + m2));
        b1.vy = (vy1 * (m1 - m2) / (m1 + m2)) + (vy2 * 2 * m2 / (m1 + m2));
        b2.vy = (vy2 * (m2 - m1) / (m1 + m2)) + (vy1 * 2 * m1 / (m1 + m2));
      }
    }

    //リストに追加されたボールを描く
    b1.x += b1.vx;
    b1.y += b1.vy;

    // ★半径を考慮した範囲にする
    b1.x = constrain(b1.x, b1.size / 2, windowWidth - (b1.size / 2));
    b1.y = constrain(b1.y, b1.size / 2, windowHeight - (b1.size / 2));
    fill(b1.color);
    ellipse(b1.x, b1.y, b1.size);
  }


    //何もしなくてもランダムな位置に、ランダムな速度でボールが発生
    count += 1;
    let num = count % cycle;
    if(num == 10){const b = {
      x: random(0, windowWidth), 
      y: random(0, windowHeight), 
      size: random(50, 70), 
      vx: random(-20, 20), 
      vy: random(-20, 20), 
      color: colors[Math.floor(Math.random() * colors.length)]}; 
      //Math.floor() は小数点を切り捨てて整数にする関数
      //Math.random() は0以上1未満の数をランダムで生成する関数
      //colors[Math.floor(Math.random()*colors.length] は colors の配列の中の要素からどれかを選ぶ
      balls.push(b);
    }
}
  

//マウスをドラッグするとボールをリストに追加
function mouseDragged(){
  const dx = mouseX - pmouseX;
  const dy = mouseY - pmouseY;
  if(mag(dx, dy) > 5){
    const b = {
      x: mouseX, 
      y: mouseY, 
      size: random(50, 70), 
      vx: dx, 
      vy: dy, 
      color: colors[Math.floor(Math.random() * colors.length)]};
    balls.push(b);
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}