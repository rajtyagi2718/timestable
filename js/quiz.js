import {randvalue} from "./random.js";

function Quiz(operator, factorRow, factorCol, product, keypad, controller, 
              timer, grader) {
  this.operator = operator;
  this.operator.listen(this);
  this.factorRow = factorRow;
  this.factorRow.listen(this);
  this.factorCol = factorCol;
  this.factorCol.listen(this);
  this.product = product;
  this.keypad = keypad;
  this.keypad.listen(this);
  this.controller = controller;
  this.controller.listen(this);
  this.timer = timer;
  this.timer.listen(this);
  this.grader = grader;

  this.row = 0;
  this.col = 0;
  this.answered = true;
  this.questions = -1;
  this.rowArr = Array();
  this.colArr = Array();
  this.rowSet = new Set();
  this.colSet = new Set();
  for (let k = 1; k <= 10; k++) {
    this.rowSet.add(k);
    this.colSet.add(k);
  }
  this.play = false;

  this.askDelay = 1000;
  this.showDelay = 2000;
  this.clearDelay = 300;
}

// query methods //

Quiz.prototype.select = function() {
  this.row = randvalue(this.rowArr);
  this.col = randvalue(this.colArr);
}
  
Quiz.prototype.ask = function() {
  console.log("what is", this.row, "x", this.col, "?");
  this.factorRow.select(this.row);
  setTimeout(() => {this.operator.select();}, this.askDelay);
  setTimeout(() => {this.factorCol.select(this.col);}, this.askDelay*2);
  setTimeout(() => {this.product.select(this.row, this.col);}, this.askDelay*3);
  setTimeout(() => {this.keypad.set(this.grader, this.row, this.col);
                    this.timer.restart(this);
                    this.answered = false;}, this.askDelay*4);
}

Quiz.prototype.check = function(k) {
  if (this.answered) {
    return;
  }
  this.keypad.select(this.row, k); 
  if (this.keypad.isCorrect(k)) {
    this.grader.increment(this.row, this.col);
    console.log("correct!");
    this.show(this.row, this.col);
  }
  else {
    console.log("incorrect.");
  }
} 

Quiz.prototype.show = function() {
  if (this.answered) {
    return;
  }
  this.answered = true;
  this.timer.stop();
  this.product.show(this.row, this.col);
  console.log("answer:", this.grader.getAnswer(this.row, this.col));
  setTimeout(() => {this.clear();}, this.showDelay);
}

Quiz.prototype.clear = function() {
  this.product.deselect(this.grader.getGrade(this.row, this.col),
                        this.row, this.col);
  setTimeout(() => {this.factorCol.deselect(this.col);}, this.clearDelay);
  setTimeout(() => {this.operator.deselect();},          this.clearDelay*1);
  setTimeout(() => {this.factorRow.deselect(this.row);}, this.clearDelay*2);
  setTimeout(() => {this.keypad.clear(this.row);},       this.clearDelay*2);
  setTimeout(() => {this.query();},                      this.clearDelay*4);
}

Quiz.prototype.query = function() {
  if (this.play && this.questions) {
    this.questions -= 1;
    this.select();
    this.ask();
  }
}

Quiz.prototype.start = function(questions=-1) {
  if (questions) {
    this.questions = questions;
  }
  this.rowArr.length = 0;
  this.rowSet.forEach(v => this.rowArr.push(v));
  this.colArr.length = 0;
  this.colSet.forEach(v => this.colArr.push(v));
  if (this.rowArr.length && this.colArr.length) {
    this.query();
  }
}

// toggle methods //
Quiz.prototype.toggleOperator = function() {
  if (this.play) {
    return;
  }
  // division
}

Quiz.prototype.toggleFactorRow = function(k) {
  if (this.play) {
    return;
  }
  if (this.rowSet.has(k)) {
    this.rowSet.delete(k);
  }
  else {
    this.rowSet.add(k);
  }
}

Quiz.prototype.toggleFactorCol = function(k) {
  if (this.play) {
    return;
  }
  if (this.colSet.has(k)) {
    this.colSet.delete(k);
  }
  else {
    this.colSet.add(k);
  }
}

Quiz.prototype.toggleController = function() {
  this.play = !this.play;
  if (this.play) {
    this.controller.select();
    if (!this.answered) {
      this.timer.resume(this);
    }
    else { 
      this.start();
    }
  }
  else {
    this.controller.deselect();
    this.timer.pause();
  }
}

Quiz.prototype.toggleKeypad = function(k) {
  if (this.play) {
    this.check(k);
  }
}

Quiz.prototype.toggleTimer = function() {
  if (this.play) {
    this.show();
  }
  else {
    this.timer.toggle();
  }
}

export {Quiz};
