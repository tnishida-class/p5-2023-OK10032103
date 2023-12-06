let observe, duplicate, random, press, explain;
let basic_color, observe_color;
let n, margin, d, count;
let d2, black10_abc2, black10_num2, black30_abc2, black30_num2, black70_abc2, black70_num2, black90_abc2, black90_num2, count2, board_observe2;
let p10, p30, p70, p90;
let txt, txt_arr;
let enter, esc, Delete, rightArrow, leftArrow, esc2, shift, startGame;
let abc = [];
for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {abc.push(String.fromCharCode(i));}//アルファベットの配列を作る(実はこれ二度手間)
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
let board, board_observe, checkboard, MASU;
let txt_explain, txt_explain_English, txt_title;
let count_black, count_white;


function setup(){
    createCanvas(900, 700);
    colorMode(RGB);
    basic_color = color(255, 215, 0);
    observe_color = color(50, 205, 50);


    observe = false; random = false; duplicate = false; press = false; explain = true;
    n = boardSize / 10;//1ます分の幅(高さ)
    margin = n * 3/4;
    d = []; txt_arr = [];
    count = 0; count2 = 0;
    p10 = 0; p30 = 0; p70 = 0; p90 = 0;
    black10 = []; black30 = []; black70 = []; black90 = [];
    black10_split = []; black30_split = []; black70_split = []; black90_split = [];
    MASU = int(boardSize /(n * (2/5 + 3/4))) + 1;//マスの数
    board = Array(MASU+1).fill().map(() => Array(MASU+1).fill(null));//判定用の2次元配列を作成
    board_observe = Array(MASU+1).fill().map(() => Array(MASU+1).fill(null));//5目並んだ判定をする配列を作成
    //ボタンを作る
    startGame =createButton("'ENTER' or click HERE to PLAY!").position(310, 490).mousePressed(start_Game);
    startGame.style('background-color', 'white').style('width', '220px').style('height', '40px').style('font-size', '14px');
    shift = createButton("'Shift'" + "\n" + "送信").position(260, 415).mousePressed(send);//シフトで送信ボタン
    shift.style('background-color', '#DDDDDD').style('width', '60px').style('height', '40px').style('font-size', '13px');
    enter      = createButton("'ENTER'・・・・観測(observe)").position(0, 500).mousePressed(startObserve);
    enter.style('background-color', 'black').style('width', '400px').style('height', '40px').style('font-size', '15px').style('color', 'white').style('text-align', 'left');
    esc        = createButton("'esc'・・・・・遊び方を見る(How to Play)").position(0, 540).mousePressed(showExplain);
    esc.style('background-color', 'black').style('width', '400px').style('height', '40px').style('font-size', '15px').style('color', 'white').style('text-align', 'left');
    Delete     = createButton("'DELETE'・・・ 戻る(BACK)").position(0, 500).mousePressed(stopObserve);
    Delete.style('background-color', 'black').style('width', '400px').style('height', '40px').style('font-size', '15px').style('color', 'white').style('text-align', 'left');
    rightArrow = createButton("'→'・・・・・・盤面をコピー(COPY)").position(0, 540).mousePressed(rightArrow_Copy);
    rightArrow.style('background-color', 'black').style('width', '400px').style('height', '40px').style('font-size', '15px').style('color', 'white').style('text-align', 'left');
    leftArrow  = createButton("'←'・・・・・・コピーを消す(DELETE COPY)").position(0, 580).mousePressed(leftArrow_DeleteCopy);
    leftArrow.style('background-color', 'black').style('width', '400px').style('height', '40px').style('font-size', '15px').style('color', 'white').style('text-align', 'left');
    esc2       = createButton("'esc'・・・・・遊び方を見る(How to Play)").position(0, 620).mousePressed(showExplain);
    esc2.style('background-color', 'black').style('width', '400px').style('height', '40px').style('font-size', '15px').style('color', 'white').style('text-align', 'left');
    //最初の設定と説明(日・英)
    txt_explain = "遊び方" + "\n" + "\n" +
                  "この世界の石は量子的な動きをします." + "\n" +
                  "90%, 70%, 30%, 10%で黒になる4種類の石があります." + "\n" + "\n" +
                  "黒の人と白の人は交互に石を置きますが," + "\n" +
                  "黒の人は90%と70%の石を交互に置き," + "\n" +
                  "白の人は10%と30%の石を交互に置きます." + "\n" +
                  "10%, 30%の黒というのはそれぞれ90%, 70%で白という意味です." + "\n" + "\n" +
                  "プレイヤーは自分の石を置いた後に「観測(observe)」を行えます." + "\n" +
                  "観測をすると, 石はそれぞれの数字の確率に従います." + "\n" + "\n" +
                  "観測時点で, 自分の石が縦, 横, 斜めのいずれかの方向に" + "\n" +
                  "石が5個以上並んでいるプレイヤーの勝利です." + "\n" + "\n" +
                  "もし観測時点で両プレイヤーとも石が5個以上並んでいた場合," + "\n" +
                  "「観測」を宣言したプレイヤーの勝利です." + "\n" + "\n" +
                  "'ENTER'を押してゲームスタート！";
    txt_explain_English ="How to play" + "\n" + "\n" +
                          "Stones in this world move in a quantum way."+ "\n" +
                          "Four types of stones that turn black"+ "\n" +
                          "at 90%, 70%, 30%, and 10%."+ "\n" + "\n" +
                          "The black player and the white player place stones alternately."+ "\n" +
                          "The black player alternates between 90% and 70% stones. "+ "\n" +
                          "White alternates between 10% and 30% stones. "+ "\n" +
                          "10% and 30% black means 90% and 70% white, respectively." + "\n" + "\n" +
                          "After placing their stone, the player can 'observe'." + "\n" +
                          "When observing, the stone follows the probability of each number."+ "\n" + "\n" +
                          "At the time of observation,"+ "\n" +
                          "if the player's stones are placed vertically, horizontally or diagonally"+ "\n" +
                          "The winner is the player whose stones are lined up"+ "\n" +
                          "vertically, horizontally, or sideways in a row of 5 or more."+ "\n" + "\n" +
                          "If both players have 5 or more stones in a row at the time of observation,"+ "\n" +
                          "The player who declared 'observe' wins. "+ "\n" + "\n" +
                          "Press 'ENTER' to start the game!";
    //タイトル
    txt_title = "量子五目並べ (Quantum Gomoku)";
}
function draw(){
  //ボタンの表示設定
  if(!explain){
    if(!observe){
      Delete.hide(); rightArrow.hide(); leftArrow.hide(); esc2.hide(); startGame.hide();
      enter.show(); esc.show(); shift.show();
    }
    else{
      Delete.show(); rightArrow.show(); leftArrow.show(); esc2.show();
      enter.hide(); esc.hide(); shift.show(); startGame.hide();
    }
  }
  else{
    startGame.show(); enter.hide(); esc.hide(); Delete.hide(); rightArrow.hide(); leftArrow.hide(); esc2.hide(); shift.hide();
  }
  //最初の説明
  if(explain){
    background(200);
    //文章(日・英)
    textAlign(CENTER, CENTER); noStroke(); fill(0); textSize(13);
    text(txt_explain, width/4, (height-70)/2);
    text(txt_explain_English, 3 * width / 4 - 10, (height-70)/2);
    textAlign(CENTER, CENTER); noStroke(); fill(0); textSize(50);
    text(txt_title, width/2, 70);
    //説明に図を追加
    explainPicture();
  }
  else{
    background(255);
    //文字入力画面
    noFill(); stroke(0); strokeWeight(1);
    rect(150, 410, 100, 50);
    noStroke(); fill(80); textSize(15); textAlign(CENTER, CENTER);
    text("ex) 'A-1', 'B-2'", 200, 470);
    //次の石の表示画面
    stroke(0); noFill();
    rect(15, 405, 70, 75);
    textAlign(CENTER, CENTER); fill(0); textSize(15);
    text("next", 50, 415);
    //ボード絵画
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
    }
    //現在置くコマと次のコマを表示
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
    //入力に応じて座標を表示???????????????????
    fill(255); stroke(0); strokeWeight(1);
    rect(150, 410, 100, 50);
    txt = txt_arr.join("");
    //送信されたコマを絵画
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
    //非観測時に石を絵画
    if(!observe){
      for(let i = 0; i < black10_abc.length; i++){
        put(black10_abc[i], black10_num[i], 255 * (100 - 10)/100, 10);
        into_board(black10_abc[i], black10_num[i], 10);}
      for(let i = 0; i < black30_abc.length; i++){
        put(black30_abc[i], black30_num[i], 255 * (100 - 30)/100, 30);
        into_board(black30_abc[i], black30_num[i], 30);}
      for(let i = 0; i < black70_abc.length; i++){
        put(black70_abc[i], black70_num[i], 255 * (100 - 70)/100, 70);
        into_board(black70_abc[i], black70_num[i], 70);}
      for(let i = 0; i < black90_abc.length; i++){
        put(black90_abc[i], black90_num[i], 255 * (100 - 90)/100, 90);
        into_board(black90_abc[i], black90_num[i], 90);}
    }
    //観測時に石を絵画
    else{
      //ランダムな数字を石の個数分追加
      if(random){
        for(let i = 0; i < black10_abc.length + black30_abc.length + black70_abc.length + black90_abc.length; i++){
           d.push(Math.random(0, 1) * 100 + 1);
        }
        random = false;
      }
      //ランダムに追加した数字の配列の先頭から数字を抽出し、石の色を判定し絵画
      let num = 0;
      for(let i = 0; i < black10_abc.length; i++){
        put(black10_abc[i], black10_num[i], observeColor(10, i), 10);
        into_board_observe(black10_abc[i], black10_num[i], observeColor(10, i));
      }
      num += black10_abc.length;
      for(let i = num; i < num + black30_abc.length; i++){
        put(black30_abc[i - num], black30_num[i - num], observeColor(30, i), 30);
        into_board_observe(black30_abc[i - num], black30_num[i - num], observeColor(30, i));
      }
      num += black30_abc.length;
      for(let i = num; i < num + black70_abc.length; i++){
        put(black70_abc[i - num], black70_num[i - num], observeColor(70, i), 70);
        into_board_observe(black70_abc[i - num], black70_num[i - num], observeColor(70, i));
      }
      num += black70_abc.length;
      for(let i = num; i < num + black90_abc.length; i++){
        put(black90_abc[i - num], black90_num[i - num], observeColor(90, i), 90);
        into_board_observe(black90_abc[i - num], black90_num[i - num], observeColor(90, i));
      }
      //観測中に「observing」を追加
      stroke(observe_color); noFill();
      rect(330, 410, 70, 50);
      noStroke(); fill(observe_color); textAlign(CENTER, CENTER); textSize(13);
      text("observing" + "\n" + "観測中", 365, 435);
    }
    //盤の複製
    if(duplicate){
      Duplicate_board(500);
    }
    //マウスの位置に応じて半透明な円を描画
    if(!observe){
      let x = floor((mouseX - margin) / n);
      let y = floor((mouseY - margin) / n) +1;
      if (x >= 0 && x < MASU && y >= 1 && y <= MASU && board[x][y] === null) {
        let r, c;
        if(count % 4 == 0){r = 90; c = 255 * (100 - 90)/100;}
        if(count % 4 == 1){r = 10; c = 255 * (100 - 10)/100;}
        if(count % 4 == 2){r = 70; c = 255 * (100 - 70)/100;}
        if(count % 4 == 3){r = 30; c = 255 * (100 - 30)/100;}
        put_transparent(x, y, c, r);//rは透明度
        txt = abc[x] + "-" + y;
        textAlign(CENTER, CENTER); textSize(30); fill(0); stroke(0); strokeWeight(1);
        text(txt, 200, 435);
      }
    }
    else{
      txt_arr = [];
      //並びを赤枠をチェックし描画
      count_black = 0;
      count_white = 0;
      checkAndDrawRedFrames();
      JudgeWinner(count_black, count_white);
    }
    //マウスの位置を座標で表示
    let x = floor((mouseX - margin) / n );
    let y = floor(((mouseY - margin) / n ) + 1);
    if(x < 0 || x >= MASU || y < 1 || y > MASU || board[x][y] != null){
      textAlign(CENTER, CENTER); textSize(30); fill(0); stroke(0); strokeWeight(1);
      text(txt, 200, 435);
    }
  }
}
//キーが押されたときの実行内容を指定する関数
function keyPressed(){
  let x = floor((mouseX - margin) / n );
  let y = floor(((mouseY - margin) / n ) + 1);
  if(keyCode === ENTER){
    start_Game();
    startObserve();
  }
  if(keyCode === 8){backspace();}//バックスペース
  if(keyCode === DELETE){stopObserve();}
  if(keyCode === 39){rightArrow_Copy()}//右矢印
  if(keyCode ===37){leftArrow_DeleteCopy()}//左矢印
  if(keyCode === 16){send();}//シフトキー  
  if(keyCode === 27 && !explain){showExplain();}//esc


  if(!explain && !observe){
    //アルファベットを入力
    if(keyCode >= 65 && keyCode <= 90){
      if(x < 0 || x >= MASU || y < 1 || y > MASU)
      txt_arr.push(String.fromCharCode(keyCode));
    }
    //数字を入力
    if(keyCode >= 49 && keyCode <= 57){
      txt_arr.push(String.fromCharCode(keyCode));
    }
    //ハイフンを入力
    if(keyCode === 189){
      txt_arr.push("-");
    }
  }        
}
//マウスで石を置けるようにする関数
function mousePressed() {
  // 裏モードの場合は何もしない
  if (observe || explain){return;}
  // マウスの位置の位置から座標を計算
  let x = floor((mouseX - margin) / n );
  let y = floor(((mouseY - margin) / n ) + 1);
  // 座標がマス目の範囲外の場合は何もしない
  if (x < 0 || x >= MASU || y < 1 || y > MASU){return;}
  // マス目に駒がない（何もない）の場合に駒を置く
  let r;
  if (board[x][y] === null){
    if(count % 4 == 0){
      black90_abc.push(x);
      black90_num.push(y);
      r = 90;
    }
    if(count % 4 == 1){
      black10_abc.push(x);
      black10_num.push(y);
      r = 10;
    }
    if(count % 4 == 2){
      black70_abc.push(x);
      black70_num.push(y);
      r = 70;
    }
    if(count % 4 == 3){
      black30_abc.push(x);
      black30_num.push(y);
      r = 30;
    }
    // 駒を置く(配列の中にオブジェクトを入れる)
    //（駒は{プレイヤーの色、数値（黒になる確率）、表モードの色}）
    board[x][y] = r;
    count += 1;
  }
}
//テキストが送信できるかどうか判定する関数
function txt_check(){
  let txt_num = txt_arr.slice(2).join("");//入力文字の数字の部分を抽出
  let q1_sum = 0;
  let q2_sum = 0;
  //入力文字の1文字目が英字、2文字目がハイフンかどうかを判定
  for(let i = 0; i < MASU; i++){
    let q1 = (txt_arr[0] == abc[i] && txt_arr[1] == "-") ? 1 : 0;
    q1_sum += q1;
  }
  //入力文字の3文字目以降が1以上MASU以下の数字かどうかを判定
  for(let i = 1; i <= MASU; i++){
    let q2 = (txt_num == i.toString()) ? 1 : 0;
    q2_sum += q2;
  }
  //入力座標にすでに石がないかどうかを判定
  let q3 = (board[convertToInt(txt_arr[0])][Number(txt_num)] == null) ? 1 : 0;
  //入力文字が全ての条件をクリアしていたら1を返す
  if(q1_sum > 0 && q2_sum > 0 && q3 > 0){return 1;}
  else{return 0;}
}
//送信を行う関数
function send(){
  if(txt_check() == 1 && !explain){
    if(count % 4 == 0){black90.push(txt);}
    if(count % 4 == 1){black10.push(txt);}
    if(count % 4 == 2){black70.push(txt);}
    if(count % 4 == 3){black30.push(txt);}
    txt = "";
    txt_arr = [];
    fill(255); stroke(0); strokeWeight(1);
    rect(180, 410, 100, 50);
    count += 1;
  }
}
//ゲームを開始する関数
function start_Game(){
  if(explain){explain = false;}
}
//観測を開始する関数
function startObserve(){
  if(!observe){
    observe = true;
    random = true;
    d = [];
  }
}
//観測を終了する関数
function stopObserve(){
  if(!explain && observe){
    observe = false;
    random = false;
    board_observe = Array(MASU).fill().map(() => Array(MASU).fill(null));
  }
}
//最初の説明を表示する関数
function showExplain(){
  if(!explain){explain = true;}
}
//入力文字の最後の一文字を消す関数
function backspace(){
  if(!explain && !observe){
    txt_arr.pop();
  }
}
//右矢印で盤面をコピーする関数
function rightArrow_Copy(){
  if(!explain){
    if(observe && duplicate){
      Copy();
    }
    if(observe && !duplicate){
      duplicate = true;
      Copy();
    }
  }
}
//左矢印でコピー盤面を消す関数
function leftArrow_DeleteCopy(){
  if(!explain && observe){duplicate = false;}
}
//メイン盤面に石を絵画する関数
function put(x, y, c, r){
    noStroke(); fill(c);
    ellipse(n * (x + 2/5 + 3/4), n * (y - 1 + 2/5 + 3/4), n * 4/5, n * 4/5);
    let c2 = (r <= 30) ? 0 : 255;
    fill(c2); stroke(255 - c2); strokeWeight(2); textSize(20); textAlign(CENTER, CENTER);
    text(r, n * (x + 2/5 + 3/4), n * (y - 1 + 2/5 + 3/4));
}
//座標情報をboardに格納
function into_board(x, y, r){
  board[x][y] = r;//別にrを配列に入れる必要はない
}
//座標情報と色をboard_observeに格納
function into_board_observe(x, y, c){
  board_observe[x][y] = c;
}
//コピー盤面に石を絵画する関数
function put2(x, y, c, m){
  noStroke(); fill(c);
  ellipse(m + n * (x + 2/5 + 3/4), n * (y - 1 + 2/5 + 3/4), n * 4/5, n * 4/5);
}
//マウスの位置に応じてちょい透明な石を描く関数
function put_transparent(x, y, c, r){
  noStroke(); fill(c, 200);//fill()の第2引数が透明度を表す
  ellipse(n * (x + 2/5 + 3/4), n * (y - 1 + 2/5 + 3/4), n * 4/5, n * 4/5);
  let c2 = (r <= 30) ? 0 : 255;
  fill(c2); stroke(255 - c2); strokeWeight(2); textSize(20); textAlign(CENTER, CENTER);
  text(r, n * (x + 2/5 + 3/4), n * (y - 1 + 2/5 + 3/4));
}
//メイン盤面の観測時の石の色を判定する関数
function observeColor(x, i){
  return (d[i] <= x) ? 0 : 255;
}
//コピー盤面の観測時の石の色を判定する関数
function observeColor2(x, i){
  return (d2[i] <= x) ? 0 : 255;
}
//アルファベット文字列を数値(0～)に変換する関数
function convertToInt(a) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabet.indexOf(a);
}
//盤面をコピーする関数(引数はメイン盤面との距離)
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
    text(abc[i], m + n * (i + 2/5 + 3/4), n * 3/8);
    text(i + 1, m + n * 3/8, n * (i + 2/5 + 3/4));
  }
    let num = 0;
    for(let i = num; i < black10_abc2.length; i++){
      put2(black10_abc2[i], black10_num2[i], observeColor2(10, i), m);
    }
    num += black10_abc2.length;
    for(let i = num; i < num + black30_abc2.length; i++){
      put2(black30_abc2[i - num], black30_num2[i - num], observeColor2(30, i), m);
    }
    num += black30_abc2.length;
    for(let i = num; i < num + black70_abc2.length; i++){
      put2(black70_abc2[i - num], black70_num2[i - num], observeColor2(70, i), m);
    }
    num += black70_abc2.length;
    for(let i = num; i < num + black90_abc2.length; i++){
      put2(black90_abc2[i - num], black90_num2[i - num], observeColor2(90, i), m);
    }
    noStroke(); fill(0); textSize(10); textAlign(LEFT, CENTER);
    text(count2 + "手目の観測", 500, 410);
    checkAndDrawRedFrames2(m);
}
//盤面コピー時にメイン盤面の値をコピーし、メイン盤面の値が変化しても保持し続けるようにする関数
function Copy() {
  d2 = d.slice();
  black10_abc2 = black10_abc.slice();
  black10_num2 = black10_num.slice();
  black30_abc2 = black30_abc.slice();
  black30_num2 = black30_num.slice();
  black70_abc2 = black70_abc.slice();
  black70_num2 = black70_num.slice();
  black90_abc2 = black90_abc.slice();
  black90_num2 = black90_num.slice();
  count2 = count;
  /*board_observe2 = new Array(MASU+1);
  for(let i = 0; i < MASU+1; i++){
    board_observe2[i] = board_observe[i].slice();}*/
  board_observe2 = JSON.parse(JSON.stringify(board_observe));
}
//説明の際に図を追加する関数
function explainPicture(){
  const o = 10;


    fill(basic_color);
    rect(100, 550 - o, 150, 150);


    fill(observe_color);
    rect(650, 550 - o, 150, 150);


    for(m = 0; m < 4; m++){
      stroke(0); strokeWeight(1);
      line(100, 550 + (50 * m) - o, 250, 550 + (50 * m) - o);
    }
    for(s = 0; s < 4; s++){
      stroke(0); strokeWeight(1);
      line(100 + (50 * s), 550 - o, 100 + (50 * s), 700 - o);
    }
    for(p = 0; p < 4; p++){
      stroke(0); strokeWeight(1);
      line(650, 550 + (50 * p) - o, 800, 550 + (50 * p) - o);
    }
    for(q = 0; q < 4; q++){
      stroke(0); strokeWeight(1);
      line(650 + (50 * q), 550 - o, 650 + (50 * q), 700 - o);
    }


    stroke(0); strokeWeight(1);
    fill(255 * ((100- 90) /100));
    ellipse(150, 600 - o, 40, 40);


    fill(255 * ((100- 70) /100));
    ellipse(200, 600 - o, 40, 40);


    fill(255 * ((100- 30) /100));
    ellipse(200, 650 - o, 40, 40);


    fill(255 * ((100- 10) /100));
    ellipse(150, 650 - o, 40, 40);


    fill(255 * ((100- 100) /100));
    ellipse(700, 600 - o, 40, 40);
    ellipse(750, 600 - o, 40, 40);
    ellipse(750, 650 - o, 40, 40);


    fill(255 * ((100- 0) /100));
    ellipse(700, 650 - o, 40, 40);


    fill(255); stroke(0); strokeWeight(2); textSize(20);
    text(90, 150, 600 - o);
    text(70, 200, 600 - o);
    text(90, 700, 600 - o);
    text(70, 750, 600 - o);


    fill(0); stroke(255); strokeWeight(2); textSize(20);
    text(30, 200, 650 - o);
    text(10, 150, 650 - o);
    text(30, 750, 650 - o);
    text(10, 700, 650 - o);
   
    noStroke(); fill(255, 0, 0);
    rect(250 + 5 * o, 600 - 2 * o, 250, 70);
    triangle(520, 550 - o, 520, 700 - o, 650 - 5 * o, 625 - o);


    stroke(0); strokeWeight(1);
    line(250 + 5 * o, 600 - 2 * o, 520, 600 - 2 * o);
    line(250 + 5 * o, 650, 520, 650);
    line(250 + 5 * o, 650, 250 + 5 * o, 600 - 2 * o);
    line(520, 600 - 2 * o, 520, 550 - o);
    line(520, 650, 520, 700 - o);
    line(520, 550 - o, 650 - 5 * o, ((600 - 2 * o) + 650) / 2);
    line(520, 700 - o, 650 - 5 * o, ((600 - 2 * o) + 650) / 2);


    fill(255); textSize(40);
    text("Observing!", (((250 + 5 * o) + 520) / 2) + 1.5 * o, ((600 - 2 * o) + 650) / 2);
}
//5目以上並んだ時の判定→長方形を絵画
function checkAndDrawRedFrames(){
  checkAndDrawRedFramesXXX(1, 0);//水平方向
  checkAndDrawRedFramesXXX(0, 1);//垂直方向
  checkAndDrawRedFramesXXX(1, 1);//右下がりの斜め
  checkAndDrawRedFramesXXX(-1, 1);//左下がりの斜め
}
function checkAndDrawRedFramesXXX(dx, dy) {
  let s = 0;
  checkboard = Array(MASU+1).fill().map(() => Array(MASU+1).fill(null));
  for(let x = 0; x < MASU; x++){
    for(let y = 1; y <= MASU; y++){
      if(board_observe[x][y] != null && checkboard[x][y] == null){
        checkLine(x, y, dx, dy); // 水平方向
      }
    }
  }
  //checkboardの中身をチェックして、5以上連続している場合は赤枠を描画
  for(let x = 0; x < MASU; x++){
    for(let y = 1; y <= MASU; y++){
      if(checkboard[x][y] != null){
        s = checkboard[x][y];
        if(s >= 5){
          drawRedFrame(x, y, x + (s-1)*dx, y + (s-1)*dy);
          if(board_observe[x][y] == 0){
            count_black += 1;
          }
          else if(board_observe[x][y] == 255){count_white += 1;}
        }
      }
    }
  }
}
function checkLine(x, y, dx, dy) {
  let color = board_observe[x][y];
  let count3 = 1;
  //指定された方向に沿って、同じ色の駒が連続している数をカウント
  for(let i = 1; i < MASU; i++){
    if(x + i*dx < MASU  && y + i*dy <= MASU  &&
        x + i*dx >= 0 && y + i*dy >= 1 &&
        board_observe[x + i*dx][y + i*dy] != null &&
        board_observe[x + i*dx][y + i*dy] === color){
      count3 += 1;
    }
    else{break;}
  }
  //連続していればcheckboardに連続数を格納、起点のマスには連続数を格納、他のマスには0を格納
  if(count3 >= 5){
    checkboard[x][y] = count3;
    for(let i = 1; i < count3; i++){
      checkboard[x + i*dx][y + i*dy] = 0;
    }
  }
}
function drawRedFrame(x1, y1, x2, y2) {
  stroke(255, 0, 0); strokeWeight(3); noFill();
  //垂直方向
  if(x1 === x2){
    rect(margin + x1*n, margin + (y1-1)*n, n, n*(y2 -y1 + 1));
  }
  //水平方向
  else if(y1 === y2){
    rect(margin + x1*n, margin + (y1-1)*n, n*(x2 - x1 + 1), n);
  }
  else{
    //斜め
    let vertices;
    //右下がりの斜め
    if(x1 < x2){
      vertices = [
        { x: margin +  x1      * n + (n / 2), y: margin + (y1 - 1) * n - (n / 4)},
        { x: margin + (x2 + 1) * n + (n / 4), y: margin + (y2 - 1) * n + (n / 2)},
        { x: margin +  x2      * n + (n / 2), y: margin +  y2      * n + (n / 4)},
        { x: margin +  x1      * n - (n / 4), y: margin + (y1 - 1) * n + (n / 2)}
      ];
    }
    else{
      // 左下がりの斜め
      vertices = [
        { x: margin + (x1 + 1) * n - (n / 2), y: margin + (y1 - 1) * n - (n / 4)},
        { x: margin +  x2      * n - (n / 4), y: margin +  y2      * n - (n / 2)},
        { x: margin +  x2      * n + (n / 2), y: margin +  y2      * n + (n / 4)},
        { x: margin + (x1 + 1) * n + (n / 4), y: margin + (y1 - 1) * n + (n / 2)}
      ];
    }
    beginShape();
    vertices.forEach(v => vertex(v.x, v.y));
    endShape(CLOSE);
  }
}
function JudgeWinner(cx, cy){
  noStroke(); fill(0); textAlign(CENTER, CENTER); textSize(20);
  if((cx > cy) || (cx == cy && count % 2 == 1)){text("黒の勝ちです", 700, 550);}
  else if((cx < cy) || (cx == cy && count % 2 == 0)){text("白の勝ちです", 700, 550);}
  text(`黒: ${cx}, 白: ${cy}`, 700, 580);
}
//以下コピー用
function checkAndDrawRedFrames2(m){
  checkAndDrawRedFramesXXX2(1, 0, m);//水平方向
  checkAndDrawRedFramesXXX2(0, 1, m);//垂直方向
  checkAndDrawRedFramesXXX2(1, 1, m);//右下がりの斜め
  checkAndDrawRedFramesXXX2(-1, 1, m);//左下がりの斜め
}
function checkAndDrawRedFramesXXX2(dx, dy, m) {
  let s2 = 0;
  checkboard2 = Array(MASU+1).fill().map(() => Array(MASU+1).fill(null));
  for (let x = 0; x < MASU; x++) {
    for (let y = 1; y <= MASU; y++) {
      if (board_observe2[x][y] != null && checkboard2[x][y] == null) {
        checkLine2(x, y, dx, dy); //水平方向
      }
    }
  }
  //checkboardの中身をチェックして、5以上連続している場合は赤枠を描画
  for(let x = 0; x < MASU; x++){
    for(let y = 1; y <= MASU; y++){
      if(checkboard2[x][y] != null){
        s2 = checkboard2[x][y];
        if(s2 >= 5){
          drawRedFrame2(x, y, x + (s2-1)*dx, y + (s2-1)*dy, m);
        }
      }
    }
  }
}
function checkLine2(x, y, dx, dy) {
  let color = board_observe2[x][y];
  let count3_2 = 1;
  //指定された方向に沿って、同じ色の駒が連続している数をカウント
  for(let i = 1; i < MASU; i++){
    if(x + i*dx < MASU  && y + i*dy <= MASU  &&
        x + i*dx >= 0 && y + i*dy >= 1 &&
        board_observe2[x + i*dx][y + i*dy] != null &&
        board_observe2[x + i*dx][y + i*dy] === color){
      count3_2 += 1;
    }
    else{break;}
  }
  //連続していればcheckboardに連続数を格納、起点のマスには連続数を格納、他のマスには0を格納
  if(count3_2 >= 5){
    checkboard2[x][y] = count3_2;
    for(let i = 1; i < count3_2; i++){
      checkboard2[x + i*dx][y + i*dy] = 0;
    }
  }
}
function drawRedFrame2(x1, y1, x2, y2, m) {
  stroke(255, 0, 0); strokeWeight(3); noFill();
  //垂直方向
  if(x1 === x2){
    rect(margin + x1*n + m, margin + (y1-1)*n, n, n*(y2 -y1 + 1));
  }
  //水平方向
  else if(y1 === y2){
    rect(margin + x1*n + m, margin + (y1-1)*n, n*(x2 - x1 + 1), n);
  }
  else{
    //斜め
    let vertices;
    //右下がりの斜め
    if(x1 < x2){
      vertices = [
        { x: margin +  x1      * n + (n / 2) + m, y: margin + (y1 - 1) * n - (n / 4)},
        { x: margin + (x2 + 1) * n + (n / 4) + m, y: margin + (y2 - 1) * n + (n / 2)},
        { x: margin +  x2      * n + (n / 2) + m, y: margin +  y2      * n + (n / 4)},
        { x: margin +  x1      * n - (n / 4) + m, y: margin + (y1 - 1) * n + (n / 2)}
      ];
    }
    else{
      // 左下がりの斜め
      vertices = [
        { x: margin + (x1 + 1) * n - (n / 2) + m, y: margin + (y1 - 1) * n - (n / 4)},
        { x: margin +  x2      * n - (n / 4) + m, y: margin +  y2      * n - (n / 2)},
        { x: margin +  x2      * n + (n / 2) + m, y: margin +  y2      * n + (n / 4)},
        { x: margin + (x1 + 1) * n + (n / 4) + m, y: margin + (y1 - 1) * n + (n / 2)}
      ];
    }
    beginShape();
    vertices.forEach(v => vertex(v.x, v.y));
    endShape(CLOSE);
  }
}



