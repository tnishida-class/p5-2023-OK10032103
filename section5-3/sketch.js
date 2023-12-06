function setup(){
  createCanvas(400, 400);
  calendar(2023, 11);

  // isLeapYear の動作確認のため console に出力しています
  /*for(let i = 2000; i <= 2100; i++){
    if(isLeapYear(i)){
      console.log(i + "年はうるう年です");
    }
    else{
      console.log(i + "年はうるう年ではありません");
    }
  }*/
}

function calendar(y, m){
  //カレンダーの設定
  let dow = dayOfWeek(y, m, 1);
  const w = width / 7;
  let num_h;
  if(daysInMonth(y, m) == 28 && dow == 0){
    num_h = 4;
  }
  else if((dayOfWeek(y, m, 1) == 6 && m != 2) || (dayOfWeek(y, m, 1) == 5 && daysInMonth(y, m) == 31)){
    num_h = 6;
  }
  else{
    num_h = 5;
  }
  let h =  (height - 100) / num_h;

  //区切り線を描く
  stroke(0);
  strokeWeight(1);
  noFill();
  for(let i = 0; i <= 7; i++){
    line(i * w, 100, i * w, height + 100);
  }
  for(let i = 0; i <= num_h; i++){
    line(0, i * h + 100, width, i * h + 100);
  }
  
  //カレンダーの数字を描く
  let num_row = 1;
  for(let d = 1; d <= daysInMonth(y, m); d++){
    
    let textcolor;
    if(dayOfWeek(y, m, d) == 0){
      textcolor = color(255, 0, 0);
    }
    else if(dayOfWeek(y, m, d) == 6){
      textcolor = color(0, 0, 255);
    }
    else{textcolor = color(0);}
    stroke(textcolor);
    strokeWeight(2);
    fill(textcolor);
    textAlign(CENTER, CENTER);
    textSize(30);
    text(d, (w * (dayOfWeek(y, m, d) + 1 / 2)), 100 + h * (num_row - 1 / 2));
    if(dayOfWeek(y, m, d) === 6){
      num_row += 1;
    }
  }

  //テキスト「〇年」を追加
  stroke(2);
  strokeWeight(2);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(30);
  text(y + "年", width / 7, 50);

  //テキスト「〇月」を追加
  stroke(2);
  strokeWeight(2);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(60);
  text(m + "月", width / 2, 50);
}

function isLeapYear(y){ //y年が閏年かどうかを判定する条件
  return (y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0);
}

function daysInYear(y){ //y年が何日あるかを返す
    return isLeapYear(y) ? 366 : 365;
}

function daysInMonth(y, m){ //y年m月が何日まであるかを返す
  if(m == 2){
    return isLeapYear(y) ? 29 : 28;
  }
  else if(m == 4 || m == 6 || m == 9 || m == 11){
    return 30;
  }
  else{
    return 31;
  }
}

function dayOfYear(y, m, d){ //y年m月d日が1年のうち何日目かを返す
  let count = 0;
  for(let i = 1; i < m; i++){
    count += daysInMonth(y, i);
  }
  return count + d;
}

function dayOfWeek(y, m, d){ //y年m月d日が何曜日かを数字で返す
  if(y >= 1900){ //1900年1月1日(月)を基準にする
    let count = 0;
    for(let i = 0; i + 1900 < y; i++){
      count += daysInYear(i + 1900);
    }
    count += dayOfYear(y, m, d);
    let num = count % 7;
    return num;
  }
  else{
    let count = 0;
    for(let i = 0; y + i < 1900; i++){
      count += daysInYear(y + i);
    }
    count -= dayOfYear(y, m, d);
  }
  let num = count % 7;
  return (7 - num);
}

function dayOfWeekAsString(dow){ //数字入力で曜日のテキストに変換
  const a = ["日", "月", "火", "水", "木", "金", "土", "日"];
  return a[dow];
}