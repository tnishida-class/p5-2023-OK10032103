let observe, duplicate, random, press, explain;
let basic_color, observe_color;
let n, d, count;
let d2, black10_abc2, black10_num2, black30_abc2, black30_num2, black70_abc2, black70_num2, black90_abc2, black90_num2, count2;
let p10, p30, p70, p90;
let txt, txt_arr;
let abc = [];
for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {abc.push(String.fromCharCode(i));}
let black10, black30, black70, black90;
let black10_split, black30_split, black70_split, black90_split;
let black10_abc = [];
let black10_num = [];
let black30_abc = [];
let black30_num = [];
let black70_abc = [];
let black70_num = [];
let black90_abc = [];
let black90_num = [];
const boardSize = 400;

let txt_explain = "遊び方" + "\n" + "\n" + 
"この世界の石は量子的な動きをします." + "\n" + 
"90%, 70%, 30%, 10%で黒になる4種類の石があります." + "\n" + "\n" + 
"黒の人と白の人は交互に石を置きますが," + "\n" + 
"黒の人は90%と70%の石を交互に置き," + "\n" + 
"白の人は10%と30%の石を交互に置きます." + "\n" + 
"10%, 30%の黒というのはそれぞれ90%, 70%で白になるという意味です." + "\n" + "\n" + 
"プレイヤーは自分の石を置いた後に「観測(observe)」を行えます." + "\n" + 
"観測をすると, 石はそれぞれの数字の確率に従います." + "\n" + "\n" + 
"観測時点で, 自分の石が縦, 横, 斜めのいずれかの方向に" + "\n" + 
"石が5個以上並んでいるプレイヤーの勝利です." + "\n" + "\n" + 
"もし観測時点で両プレイヤーとも石が5個以上並んでいた場合," + "\n" + 
"「観測」を宣言したプレイヤーの勝利です." + "\n" + "\n" + 
"'ENTER'を押してゲームスタート！";

//##########英語での説明##########

function setup(){
    createCanvas(900, 700);

    colorMode(RGB);
    basic_color = color(255, 215, 0);
    observe_color = color(50, 205, 50);

    observe = false; random = false; duplicate = false; press = false; explain = true;
    n = boardSize / 10;
    d = []; txt_arr = [];
    count = 0; count2 = 0;

    p10 = 0; p30 = 0; p70 = 0; p90 = 0;

    black10 = []; black30 = []; black70 = []; black90 = [];

    black10_split = []; black30_split = []; black70_split = []; black90_split = [];
}

function draw(){
  if(explain){
    background(150);

    textAlign(CENTER, CENTER); noStroke(); fill(0); textSize(15)
    text(txt_explain, width/2, height/2);

    //##########説明に図を追加##########
  }
  else{
    background(255);

    noFill(); stroke(0); strokeWeight(1);//文字入力画面
    rect(150, 410, 100, 50);
    noStroke(); fill(80); textSize(10); textAlign(CENTER, CENTER);
    text("ex) 'A-1', 'B-2'", 200, 470);

    noStroke(); fill(160);
    rect(260, 415, 60, 40);
    textAlign(CENTER, CENTER); fill(0); textSize(13);
    text("'Shift'" + "\n" + "送信", 290, 435);

    stroke(0); noFill();//次の石の表示画面
    rect(15, 405, 70, 75);
    textAlign(CENTER, CENTER); fill(0); textSize(15);
    text("next", 50, 415);

    stroke(255); strokeWeight(1); fill(0);
    let k = (observe) ? 4 : 2;
    for(let i = 0; i < k; i++){
      rect(0, 500 + i*40, 400, 40);
    }
    noStroke(); fill(255); textAlign(LEFT, CENTER); textSize(15);
    if(!observe){
      text("'ENTER'         観測(observe)", 20, 520);
      text("'esc'           遊び方を見る(How to Play)", 20, 560);
    }
    else{
      text("'DELETE'        戻る(BACK)", 20, 520);
      text("'→'             盤面をコピー(COPY)", 20, 560);
      text("'←'             コピーを消す(DELETE COPY)", 20, 600);
      text("'esc'           遊び方を見る(How to Play)", 20, 640);

      stroke(observe_color); noFill();
      rect(330, 410, 70, 50);
      noStroke(); fill(observe_color); textAlign(CENTER, CENTER); textSize(13);
      text("observing" + "\n" + "観測中", 365, 435);
    }

    if(observe){fill(observe_color);}
    else{fill(basic_color);}
    noStroke();
    rect(0, 0, boardSize, boardSize);

    for(let i = 0; n * (i + 2/5 + 3/4) < boardSize; i++){
        stroke(0); strokeWeight(1);
        line(n * (i + 2/5 + 3/4), n * 3/4, n * (i + 2/5 + 3/4), boardSize);
        line(n * 3/4, n * (i + 2/5 + 3/4), boardSize, n * (i + 2/5 + 3/4));

        textSize(n * 3/8); fill(0); textAlign(CENTER, CENTER);
        text(abc[i], n * (i + 2/5 + 3/4), n * 3/8);
        text(i + 1, n * 3/8, n * (i + 2/5 + 3/4));
    }//board絵画終了

    let r = [90, 10, 70, 30];
    stroke(0); strokeWeight(1); fill(255*(100-r[count % 4])/100);
    ellipse(125, 435, n * 4/5, n * 4/5);
    stroke(0); strokeWeight(1); fill(255*r[count % 4]/100);
    ellipse(50, 450, n * 3/4, n * 3/4);

    let c = (r[count % 4] == 90 || r[count % 4] == 70) ? 0 : 255;
    fill(255-c); stroke(c); strokeWeight(2); textSize(20);
    text(r[count % 4], 125, 435);
    fill(c); stroke(255 - c); strokeWeight(2); textSize(20);
    text(r[(count + 1) % 4], 50, 450);

      //if(press){
        fill(255); stroke(0); strokeWeight(1);
        rect(150, 410, 100, 50);
        txt = txt_arr.join("");
        textAlign(CENTER, CENTER); textSize(30); fill(0);
        text(txt, 200, 435);
      //}


    if(p10 < black10.length){
      let black10_split_hyphen = black10[p10].split('-');
      black10_split.push(black10_split_hyphen[0], black10_split_hyphen[1]);
      black10_abc.push(convertToInt(black10_split[2*p10]));
      black10_num.push(Number(black10_split[2*p10 +1]));
      p10 += 1;
    }
    if(p30 < black30.length){
      let black30_split_hyphen = black30[p30].split('-');
      black30_split.push(black30_split_hyphen[0], black30_split_hyphen[1]);
      black30_abc.push(convertToInt(black30_split[2*p30]));
      black30_num.push(Number(black30_split[2*p30 +1]));
      p30 += 1;
    }
    if(p70 < black70.length){
      let black70_split_hyphen = black70[p70].split('-');
      black70_split.push(black70_split_hyphen[0], black70_split_hyphen[1]);
      black70_abc.push(convertToInt(black70_split[2*p70]));
      black70_num.push(Number(black70_split[2*p70 +1]));
      p70 += 1;
    }
    if(p90 < black90.length){
      let black90_split_hyphen = black90[p90].split('-');
      black90_split.push(black90_split_hyphen[0], black90_split_hyphen[1]);
      black90_abc.push(convertToInt(black90_split[2*p90]));
      black90_num.push(Number(black90_split[2*p90 +1]));
      p90 += 1;
    }

    if(!observe){
      for(let i = 0; i < black10_abc.length; i++){
        put(black10_abc[i], black10_num[i], 255 * (100 - 10)/100, 10);}
      for(let i = 0; i < black30_abc.length; i++){
        put(black30_abc[i], black30_num[i], 255 * (100 - 30)/100, 30);}
      for(let i = 0; i < black70_abc.length; i++){
        put(black70_abc[i], black70_num[i], 255 * (100 - 70)/100, 70);}
      for(let i = 0; i < black90_abc.length; i++){
        put(black90_abc[i], black90_num[i], 255 * (100 - 90)/100, 90);}
    }
    else{
      if(random){
        for(let i = 0; i < black10_abc.length + black30_abc.length + black70_abc.length + black90_abc.length; i++){
           d.push(Math.random(0, 1) * 100 + 1);
        }
        random = false;
      }

      let num = 0;
      for(let i = 0; i < black10_abc.length; i++){
        put(black10_abc[i], black10_num[i], observeColor(10, i), 10);
      }
      num += black10_abc.length;
      for(let i = num; i < num + black30_abc.length; i++){
        put(black30_abc[i - num], black30_num[i - num], observeColor(30, i), 30);
      }
      num += black30_abc.length;
      for(let i = num; i < num + black70_abc.length; i++){
        put(black70_abc[i - num], black70_num[i - num], observeColor(70, i), 70);
      }
      num += black70_abc.length;
      for(let i = num; i < num + black90_abc.length; i++){
        put(black90_abc[i - num], black90_num[i - num], observeColor(90, i), 90);
      }
    }

    if(duplicate){Duplicate_board(500);}
  }
}

function keyPressed(){
    if(keyCode === ENTER){
      if(explain){explain = false;}
      else{
        if(!observe){
          observe = true;
          random = true;
          d = [];
        }
      }
    }
    if(!explain){
      if(keyCode === DELETE && observe){
          observe = false;
          random = false;
      }
      if(keyCode === 39){//右矢印
        if(observe && duplicate){
          Copy();
        }
        if(observe && !duplicate){
          duplicate = true;
          Copy();
        }
      }
      if(keyCode ===37){//左矢印
        duplicate = false;
      }
      if(keyCode === 16){//シフト
        if(count % 4 == 0){black90.push(txt);}
        if(count % 4 == 1){black10.push(txt);}
        if(count % 4 == 2){black70.push(txt);}
        if(count % 4 == 3){black30.push(txt);}
        txt = "";
        txt_arr = [];
        press = true;
        fill(255); stroke(0); strokeWeight(1);
        rect(150, 410, 100, 50);
        count += 1;
      }
      if(!observe){
        if(keyCode === 8){txt_arr.pop();press = true;}//バックスペース
        if (keyCode >= 65 && keyCode <= 90) { // アルファベット
          txt_arr.push(String.fromCharCode(keyCode));press = true;
        }
        if(keyCode >= 49 && keyCode <= 57){//数字
          txt_arr.push(String.fromCharCode(keyCode));press = true;
        }
        if(keyCode === 189){//"-"
          txt_arr.push("-");press = true;
        }
      }
      if(keyCode === 27){//esc
        explain = true;
      }
    }
}

function put(x, y, c, r){
    n = boardSize / 10;
    noStroke();
    fill(c);
    ellipse(n * (x + 2/5 + 3/4), n * (y - 1 + 2/5 + 3/4), n * 4/5, n * 4/5);
    
    let c2 = (r <= 30) ? 0 : 255;
    fill(c2);
    stroke(255 - c2);
    strokeWeight(2);
    textSize(20);
    text(r, n * (x + 2/5 + 3/4), n * (y - 1 + 2/5 + 3/4));
}

function put2(x, y, c, m){
  n = boardSize / 10;
  noStroke();
  fill(c);
  ellipse(m + n * (x + 2/5 + 3/4), n * (y - 1 + 2/5 + 3/4), n * 4/5, n * 4/5);
}

function observeColor(x, i){return (d[i] <= x) ? 0 : 255;}

function observeColor2(x, i){return (d2[i] <= x) ? 0 : 255;}

function convertToInt(a) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabet.indexOf(a);
}

function Duplicate_board(m){
  n = boardSize / 10;
  observe_color = color(50, 205, 50);

  noStroke();
  fill(observe_color);
  rect(m, 0, boardSize, boardSize);

  for(let i = 0; n * (i + 2/5 + 3/4) < boardSize; i++){
    stroke(0); strokeWeight(1);
    line(m + n * (i + 2/5 + 3/4), n * 3/4, m + n * (i + 2/5 + 3/4), boardSize);
    line(m + n * 3/4, n * (i + 2/5 + 3/4), m + boardSize, n * (i + 2/5 + 3/4));
    textSize(n * 3/8); fill(0); textAlign(CENTER, CENTER);
    text(abc[i], m + n * (i + 2/5 + 3