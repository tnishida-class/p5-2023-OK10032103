// テキスト「配列を受け取る関数」
function setup(){
  createCanvas(400, 400);
  background(240);

  let scores = [];
  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }
  console.log(scores);
  barchart(scores);
}

// テキスト「配列と繰り返し」
function sum(arr){
  let n = 0;
  for(let i = 0; i < arr.length; i++){ n += arr[i]; }
  return n;
}

function average(arr){
  return sum(arr) / arr.length;
}

function largest(arr){
  let n = 0;
  for(let i = 0; i < arr.length; i++){
    n = max(n, arr[i]);
  }
  return n;
}

function smallest(arr){
  let n = 100;
  for(let i = 0; i < arr.length; i++){
    n = min(n, arr[i]);
  }
  return n;
}

// テキスト「配列を使った描画」棒グラフ
function barchart(scores){
  scaleY(10);
  const maxscore = largest(scores);
  const minscore = smallest(scores);
  const averagescore = average(scores);

  noStroke();

  for(let i = 0; i < scores.length; i++){
    const dx = width / scores.length;
    const h = height * scores[i] / 100;

    if(scores[i] == maxscore){ fill(255, 0, 0); }
    else if(scores[i] == minscore){ fill(0, 0, 255); }
    else{ fill(128); }

    rect(i * dx + 2, height - h, dx - 4, h);
    fill(0);
    text(scores[i].toPrecision(3), i * dx, height - h);
  }

  const ay = height - height * averagescore / 100;
  fill(0);
  text(averagescore.toPrecision(3), 0, ay);
  stroke(0, 255, 0);
  line(0, ay, width, ay);
}

function scaleY(n){
  for(let i = 0; i < n; i++){ line(0, height * i / n, width, height * i / n); }
}

function scaleX(n){
  for(let i = 0; i < n; i++){ line(width * i / n, 0, width * i / n, height); }
}
