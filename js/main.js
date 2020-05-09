// preamble //

import {randbool, randvalue, sortDec} from "./random.js"; 

function assert(condition, message) {
  if (!condition) { 
    throw message || "Assertion failed";
  }
}


// section //

function Section(name, parent) {
  this.element = document.createElement("section");
  this.element.setAttribute("class", name);
  parent.appendChild(this.element);
}

// grid //

function Grid(name, parent, arr) {
  Section.call(this, parent, name);
  this.cellArr = arr;
}

function Grid2d(name, parent, dim0, dim1) {
  Grid.call(this, parent, name, Array(dim0).fill().map(() => Array(dim1)));
}

function Grid1d(name, parent, dim) {
  Grid.call(this, parent, name, Array(dim));
}

function Grid0d(name, parent) {
  Grid.call(this, parent, name);
}

// grid links //

Grid.prototype = Object.create(Section.prototype);
Grid2d.prototype = Object.create(Grid.prototype);
Grid1d.prototype = Object.create(Grid.prototype);
Grid0d.prototype = Object.create(Grid.prototype);

// grid methods //

Section.prototype.get = function() {
  return this.element;
}

Grid2d.prototype.get = function(i, j) {
  return this.cellArr[i][j];
}

Grid1d.prototype.get = function(k) {
  return this.cellArr[k];
}

Grid2d.prototype.select = function(i, j, arg) {
  this.get(i, j).select(arg);
}

Grid1d.prototype.select = function(k, arg) {
  this.get(k).select(arg);
}



// // grid constructor //
// 
// function Grid(parent) {
//   CellSection2d.call(this, parent, "grid", 11, 11);
//   for (let i = 0; i < 11; i++) { 
//     for (let j = 0; j < 11; j++) {
//       let element = document.createElement("div");
//       this.element.appendChild(element);
//       if (i && j) { this.cellArray[i][j] = new Product(element, i, j); }
//       else {
//         if (i) { this.cellArray[i][j] = new FactorRow(element, i); }
//         else if (j) { this.cellArray[i][j] = new FactorCol(element, j); }
//         else { this.cellArray[i][j] = new Factor(element, "0", "\u00D7"); }
//       }
//     }
//   };
//   CellSection2d.prototype.get(10, 10).addMediumFont();
// }
// 
// // grid prototype link //
// 
// Grid.prototype = Object.create(CellSection2d.prototype);
// 
// // grid methods //
// 
// Grid.prototype.select = function(i, j) {
//   this.get(i, j).select();
// }
// 
// Grid.prototype.deselect = function(i, j, score) {
//   this.get(i, j).deselect(score);
// }
// 
// Grid.prototype.show = function(i, j) {
//   this.get(i, j).show();
// }
// 
// Grid.prototype.hide = function(i, j) {
//   this.get(i, j).hide();
// }
// 
// Grid.prototype.toggle = function(i, j) {
//   this.get(i, j).toggle();
// }
// 
// Grid.prototype.listen = function(quiz) {
//   for (let k = 1; k < 11; k++) {
//     this.get(k, 0).element.addEventListener(
//       "click", () => {quiz.toggleGrid(k, 0);}, {}
//     );
//     this.get(0, k).element.addEventListener(
//       "click", () => {quiz.toggleGrid(0, k);}, {}
//     );
//   }
// }
// 
// 
// // cell constructors //
// 
// function Cell(element, row, text) {
//   this.element = element;
//   this.element.classList.add("cell-box");
//   this.element.classList.add("cell-text");
//   this.addColor(row);
//   this.element.classList.add("opacity-33");
//   this.text = text;
// }
// 
// function Factor(element, row, text) {
//   Cell.call(this, element, row, text);
//   this.isShown = true;
// }
// 
// function FactorRow(element, row) {
//   Factor.call(this, element, row, row.toString());
// }
// 
// function FactorCol(element, col) {
//   Factor.call(this, element, 0, col.toString());
// }
// 
// function Product(element, row, col) {
//   Cell.call(this, element, row, (row * col).toString());
//   this.addBorderColor(row);
//   this.gradeStyle = "clear";
//   this.addStyle("clear");
// }
// 
// function Pad(element) {
//   Cell.call(this, element, 0, "");
//   this.isCorrect = false;
// }
// 
// function Controller(element) {
//   Cell.call(this, element, 0, "=");
// }
// 
// function Timer(element) {
//   Cell.call(this, element, 0, "");
//   this.showText();
//   this.total = 10;
//   this.alarm = 0;
//   this.remain = 0;
// }
// 
// 
// // cell links //
// 
// Factor.prototype = Object.create(Cell.prototype);
// FactorRow.prototype = Object.create(Factor.prototype);
// FactorCol.prototype = Object.create(Factor.prototype);
// Product.prototype = Object.create(Cell.prototype);
// Pad.prototype = Object.create(Cell.prototype);
// Controller.prototype = Object.create(Cell.prototype);
// Timer.prototype = Object.create(Cell.prototype);
// 
// // cell methods //
// 
// Cell.prototype.addColor = function(row) {
//   this.element.classList.add("background-color-" + row.toString());
// }
// 
// Cell.prototype.removeColor = function(row) {
//   this.element.classList.remove("background-color-" + row.toString());
// }
// 
// Cell.prototype.addBorderColor = function(row) {
//   this.element.classList.add("border-color-" + row.toString());
// }
// 
// Cell.prototype.styleMap = {
//   "clear"    : "background-clear",
//   "thin"     : "border-width-thin",
//   "thick"    : "border-width-thick",
//   "filled"   : "opacity-33",
//   "selected" : "opacity-1",
// };
// 
// Cell.prototype.addStyle = function(style) {
//   this.element.classList.add(this.styleMap[style]);
// }
// 
// Cell.prototype.removeStyle = function(style) {
//   this.element.classList.remove(this.styleMap[style]);
// }
// 
// Cell.prototype.showText = function() {
//   this.element.textContent = this.text;
// }
// 
// Cell.prototype.hideText = function() {
//   this.element.textContent = "";
// }
// 
// Cell.prototype.changeText = function(text) {
//   this.text = text;
// }
// 
// Cell.prototype.addMediumFont = function() {
//   this.element.classList.add("cell-font-medium");
// }
// 
// Cell.prototype.removeMediumFont = function() {
//     this.element.classList.remove("cell-font-medium");
// }
// 
// Cell.prototype.select = function() {
//   this.showText();
//   this.addStyle("selected");
// }
// 
// Cell.prototype.deselect = function() {
//   this.hideText();
//   this.removeStyle("selected");
// }
// 
// // factor methods //
// 
// Factor.prototype.hide = function() {
//   this.deselect();
//   this.addStyle("clear");
// }
// 
// Factor.prototype.show = function() {
//   this.removeStyle("clear");
// }
// 
// Factor.prototype.toggle = function() {
//   if (this.isShown) {
//     this.hide();
//   }
//   else {
//     this.show();
//   }
//   this.isShown = !this.isShown;
// }
// 
// // product methods //
// 
// Product.prototype.select = function() {
//   this.removeStyle(this.gradeStyle);
//   this.addStyle("selected");
// }
// 
// Product.prototype.deselect = function(score) {
//   this.hideText();
//   this.removeStyle("selected");
//   this.gradeStyle = this.gradeStyleMap[score];
//   this.addStyle(this.gradeStyle);
// }
// 
// Product.prototype.gradeStyleMap = {
//   0 : "clear",
//   1 : "thin" ,
//   2 : "thick",
//   3 : "filled",
// };
// 
// Product.prototype.show = function() {
//   this.showText();
// }
// 
// // pad methods //
// 
// Pad.prototype.set = function(text, isCorrect) {
//   this.changeText(text);
//   if (text == "100") {
//     this.addMediumFont(); 
//   }
//   this.showText();
//   this.isCorrect = isCorrect;
// }
// 
// Pad.prototype.select = function(row) {
//   if (this.isCorrect) {
//     this.addColor(row);
//     this.hideText();
//   }
//   this.addStyle("selected");
// }
// 
// Pad.prototype.deselect = function(row) {
//   if (this.text == "100") {
//     this.removeMediumFont(); 
//   }
//   if (this.isCorrect) {
//     this.removeColor(row);
//     this.isCorrect = false;
//   }
//   this.hideText();
//   this.removeStyle("selected");
// }
// 
// // timer methods //
// 
// Timer.prototype.set = function(total) {
//   this.total = total;
//   this.reset();
// }
// 
// Timer.prototype.reset = function() {
//   // timer stops when remain < 1000
//   this.remain = this.total * 1000 + 999;
//   this.changeText(this.total);
//   this.showText();
// }
// 
// Timer.prototype.start = function(quiz) {
//   // set alarm
//   now = new Date;
//   this.alarm = now.getTime() + this.remain;
// 
//   // count down, return handle
//   let count = 0;
//   return setInterval(() => {
//     this.updateRemain();
//     count = this.getCount();
//     this.changeText(count.toString());
//     this.showText();
//     if (count <= 0) {
//       console.log("count:", count);
//       quiz.showAnswer();
//     }
//   }, 1000);
// }
// 
// Timer.prototype.getCount = function() {
//   return Math.floor(this.remain / 1000);
// }
// 
// Timer.prototype.updateRemain = function() {
//   now = new Date;
//   this.remain = this.alarm - now.getTime();
// }
//   
// Timer.prototype.toggle = function() {
//   this.set(this.nextTotal[this.total]);
// }
// 
// Timer.prototype.nextTotal = {
//   10 : 5,
//    5 : 2,
//    2 : 1,
//    1 : 99,
//   99 : 10,
// }; 
// 
// 
// // control //
// 
// function Control(parent) {
//   CellSection0d.call(this, parent, "control");
//   let element = document.createElement("div");
//   this.element.appendChild(element);
//   this.cellArray[0] = new Controller(element);
// }
// 
// Control.prototype = Object.create(CellSection.prototype);
// 
// Control.prototype.select = function() {
//   this.get().select();
// }
// 
// Control.prototype.deselect = function() {
//   this.get().deselect();
// }
// 
// Control.prototype.listen = function(quiz) {
//   this.get().element.addEventListener(
//       "click", () => {quiz.toggleControl();}, {}
//   );
// }
// 
// 
// // keypad constructor // 
// 
// function Keypad(parent) {
//   CellSection1d.call(this, parent, "keypad", 5); 
//   for (let k = 0; k < 5; k++) {
//     let element = document.createElement("div");
//     this.element.appendChild(element);
//     this.cellArray[k] = new Pad(element);
//   }
// 
//   this.textSet = new Set();
//   this.textArray = Array();
//   this.textGrid = Array(11).fill().map(()  => Array(11));
//   for (let i = 1; i < 11; i++) {
//     for (let j = 1; j < 11; j++) {
//       this.textGrid[i][j] = i*j;
//     }
//   }
// }
// 
// // keypad link //
// 
// Keypad.prototype = Object.create(CellSection.prototype);
// 
// // keypad methods //
// 
// Keypad.prototype.select = function(k, i) {
//   this.get(k).select(i);
// }
// 
// Keypad.prototype.deselect = function(k, i) {
//   this.get(k).deselect(i);
// }
// 
// Keypad.prototype.set = function(i, j) {
//   let answer = this.textGrid[i][j];
//   this.textSet.add(answer);
//   while (this.textSet.size < 4) {
//     if (randbool()) { 
//       this.textSet.add(this.textGrid[i][randrange(1, 11)]);
//     }
//     else {
//       this.textSet.add(this.textGrid[j][randrange(1, 11)]);
//     }
//   }
//   while (this.textSet.size < 5) {
//     this.textSet.add(this.textGrid[randrange(1, 11)][randrange(1, 11)]);
//   }
// 
//   this.textSet.forEach(v => this.textArray.push(v));
//   this.textSet.clear();
//   this.textArray.sort(sortDec);
// 
//   for (let k = 0; k < 5; k++) {
//     let text = this.textArray.pop();
//     let isCorrect = (text == answer);
//     this.get(k).set(text, isCorrect);
//   }
// }
//     
// Keypad.prototype.listen = function(quiz) {
//   for (let k = 0; k < 5; k++) {
//     this.get(k).element.addEventListener(
//       "click", function() {quiz.toggleKeypad(k);}, {}
//     );
//   }
// }
// 
// Keypad.prototype.clear = function(i) {
//   for (let k = 0; k < 5; k++) {
//     this.get(k).deselect(i);
//   }
// }  
// 
// Keypad.prototype.isCorrect = function(k) {
//   return this.get(k).isCorrect;
// }
// 
// 
// // product score //
// 
// function ProductScore() {
//   this.scoreArray = Array(11).fill().map(() => Array(11).fill(0));
// }
//   
// ProductScore.prototype.get = function(i, j) {
//   return this.scoreArray[i][j];
// }
// 
// ProductScore.prototype.increment = function(i, j) {
//   this.scoreArray[i][j] += 1;
// }
// 
// ProductScore.prototype.decrement = function(i, j) {
//   this.scoreArray[i][j] += 1;
// }
// 
// ProductScore.prototype.clear = function(i, j) {
//   this.scoreArray[i][j] = 0;
// }
// 
// 
// // time //
// 
// function Time(parent) {
//   CellSection0d.call(this, parent, "time");
//   let element = document.createElement("div");
//   this.element.appendChild(element);
//   this.cellArray[0] = new Timer(element);
//   this.interval = null;
// }
// 
// Time.prototype = Object.create(CellSection.prototype);
// 
// Time.prototype.restart = function(quiz) {
//   this.get().reset();
//   if (quiz.play) {
//     this.resume(quiz);
//   }
// }
// 
// Time.prototype.resume = function(quiz) {
//   assert(this.interval == null, "interval already exists. cannot resume timer.")
//   this.interval = this.get().start(quiz);
// }
// 
// Time.prototype.pause = function() {
//   this.get().updateRemain();
//   this.stop();
// }
// 
// Time.prototype.stop = function() {
//   clearInterval(this.interval);
//   this.interval = null;
// }
// 
// Time.prototype.toggle = function() {
//   this.get().toggle();
// }
// 
// Time.prototype.listen = function(quiz) {
//   this.get().element.addEventListener(
//       "click", () => {quiz.toggleTime();}, {}
//   );
// }
// 
// 
// // quiz constructor //
// 
// function Quiz(grid, control, keypad, time, productScore) {
//   this.grid = grid;
//   this.grid.listen(this);
//   this.control = control;
//   this.control.listen(this);
//   this.keypad = keypad;
//   this.keypad.listen(this);
//   this.time = time;
//   this.time.listen(this);
//   this.productScore = productScore;
//   this.row = 0;
//   this.col = 0;
//   this.questionAnswered = true;
//   this.numQuestions = 0;
//   this.rowArr = Array();
//   this.colArr = Array();
//   this.rowSet = new Set();
//   this.colSet = new Set();
//   for (let k = 1; k < 11; k++) {
//     this.rowSet.add(k);
//     this.colSet.add(k);
//   }
//   this.play = false;
// }
// 
// // quiz methods //
// 
// // quiz query methods //
// 
// Quiz.prototype.selectQuestion = function() {
//   this.row = randvalue(this.rowArr);
//   this.col = randvalue(this.colArr);
// }
//   
// Quiz.prototype.askQuestion = function() {
//   console.log("what is", this.row, "x", this.col, "?");
//   let delay = 500;
//   this.grid.select(this.row, 0);
//   setTimeout(() => {this.grid.select(0, 0);}, delay);
//   setTimeout(() => {this.grid.select(0, this.col);}, delay*2);
//   setTimeout(() => {this.grid.select(this.row, this.col);}, delay*3);
//   setTimeout(() => {this.keypad.set(this.row, this.col);
//                     this.time.restart(this);
//                     this.questionAnswered = false;}, delay*4);
// }
// 
// Quiz.prototype.checkAnswer = function(k) {
//   if (this.questionAnswered) {
//     return;
//   }
//   this.keypad.select(k, this.row); 
//   if (this.keypad.isCorrect(k)) {
//     this.productScore.increment(this.row, this.col);
//     console.log("correct!");
//     this.showAnswer(this.row, this.col);
//   }
//   else {
//     console.log("incorrect.");
//   }
// } 
// 
// Quiz.prototype.showAnswer = function() {
//   if (this.questionAnswered) {
//     return;
//   }
//   this.questionAnswered = true;
//   this.time.stop();
//   this.grid.show(this.row, this.col);
//   console.log("answer:", this.keypad.textGrid[this.row][this.col]);
//   let delay = 2000;
//   setTimeout(() => {this.clearQuestion();}, delay);
// }
// 
// Quiz.prototype.clearQuestion = function() {
//   let delay = 300;
//   this.grid.deselect(this.row, this.col, this.productScore.get(this.row, this.col));
//   setTimeout(() => {this.grid.deselect(0, this.col);}, delay);
//   setTimeout(() => {this.grid.deselect(0, 0);},        delay*1);
//   setTimeout(() => {this.grid.deselect(this.row, 0);}, delay*2);
//   setTimeout(() => {this.keypad.clear(this.row);},     delay*2);
//   setTimeout(() => {this.query();},                delay*4);
// }
// 
// Quiz.prototype.query = function() {
//   if (this.play && this.numQuestions) {
//     this.numQuestions -= 1;
//     this.selectQuestion();
//     this.askQuestion();
//   }
// }
// 
// Quiz.prototype.start = function(numQuestions=-1) {
//   if (numQuestions) {
//     this.numQuestions = numQuestions;
//   }
//   this.rowArr.length = 0;
//   this.rowSet.forEach(v => this.rowArr.push(v));
//   this.colArr.length = 0;
//   this.colSet.forEach(v => this.colArr.push(v));
//   if (this.rowArr.length && this.colArr.length) {
//     this.query();
//   }
// }
// 
// // quiz toggle methods //
// 
// Quiz.prototype.toggleGrid = function(i, j) {
//   if (this.play) {
//     return;
//   }
//   this.grid.toggle(i, j);
//   if (i == 0 && j == 0) {
//     // this.multiply = false;
//   }
//   else if (j == 0) {
//     if (this.rowSet.has(i)) {
//       this.rowSet.delete(i);
//     }
//     else {
//       this.rowSet.add(i);
//     }
//   }
//   else {
//     if (this.colSet.has(j)) {
//       this.colSet.delete(j);
//     }
//     else {
//       this.colSet.add(j);
//     }
//   }
// }
// 
// Quiz.prototype.toggleControl = function() {
//   this.play = !this.play;
//   if (this.play) {
//     this.control.select();
//     if (!this.questionAnswered) {
//       this.time.resume(this);
//     }
//     else { 
//       this.start();
//     }
//   }
//   else {
//     this.control.deselect();
//     this.time.pause();
//   }
// }
// 
// Quiz.prototype.toggleKeypad = function(k) {
//   if (this.play) {
//     this.checkAnswer(k);
//   }
// }
// 
// Quiz.prototype.toggleTime = function() {
//   if (this.play) {
//     this.showAnswer();
//   }
//   else {
//     this.time.toggle();
//   }
// }
// 
// 
// // main //
// 

const body = document.getElementsByTagName("BODY")[0];
 
const app = new Section("app", body);

const operation = document.createElement("section");
operation.setAttribute("class", "operation");
app.get().appendChild(operation);

const productGrid = document.createElement("section");
productGrid.setAttribute("class", "product");
app.get().appendChild(productGrid);

const productCell = document.createElement("section");
productCell.setAttribute("class", "product-1-2");
productGrid.appendChild(productCell);

const factorRowGrid = document.createElement("section");
factorRowGrid.setAttribute("class", "factor-row");
app.get().appendChild(factorRowGrid);

const factorRowCell = document.createElement("section");
factorRowCell.setAttribute("class", "factor-row-7");
factorRowGrid.appendChild(factorRowCell);

const factorColGrid = document.createElement("section");
factorColGrid.setAttribute("class", "factor-col");
app.get().appendChild(factorColGrid);

const factorColCell = document.createElement("section");
factorColCell.setAttribute("class", "factor-col-5");
factorColGrid.appendChild(factorColCell);

const control = document.createElement("section");
control.setAttribute("class", "control");
app.get().appendChild(control);

const keypad = document.createElement("section");
keypad.setAttribute("class", "keypad");
app.get().appendChild(keypad);

const keypadCell = document.createElement("section");
keypadCell.setAttribute("class", "keypad-5");
keypad.appendChild(keypadCell);

const time = document.createElement("section");
time.setAttribute("class", "time");
app.get().appendChild(time);

// const element1 = document.createElement("section");
// element1.setAttribute("class", "time");
// app.appendChild(element1);
// 
// const grid = new Grid(app);
// 
// const control = new Control(app);
// 
// const keypad = new Keypad(app);
// 
// const productScore = new ProductScore();
// 
// const time = new Time(app);
// 
// const quiz = new Quiz(grid, control, keypad, time, productScore);
// 
// quiz.toggleControl();
