import {randvalue, randbool} from "./random.js";

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
  this.asked = false;
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

  this.askDelay = 500;
  this.showDelay = 2000;
  this.clearDelay = 300;

  this.mul = true;
  this.div = true;
  this.isMul = true;
  this.divRow = false;
}

// query methods //

Quiz.prototype.select = function() {
  this.row = randvalue(this.rowArr);
  this.col = randvalue(this.colArr);
}
  
Quiz.prototype.ask = function() {
  if (this.mul && !this.div) {
    this.askMul();
  }
  else if (!this.mul && this.div) {
    this.divRow = randbool();
    this.askDiv();
  }
  else if (this.mul && this.div) {
    if (randbool()) {
      this.askMul();
    }
    else {
      this.divRow = randbool();
      this.askDiv();
    }
  }
}

Quiz.prototype.askMul = function() {
  console.log("what is", this.row, "x", this.col, "?");
  this.isMul = true;
  this.asked = true;
  this.factorRow.select(this.row);
  setTimeout(() => {this.operator.select();}, this.askDelay);
  setTimeout(() => {this.factorCol.select(this.col);}, this.askDelay*2);
  setTimeout(() => {this.product.select(this.row, this.col);}, this.askDelay*3);
  setTimeout(() => {this.keypad.set(this.grader, this.row, this.col);
                    this.timer.restart(this);
                    this.answered = false;}, this.askDelay*4);
}

Quiz.prototype.checkMul = function(k) {
  if (this.answered) {
    return;
  }
  this.keypad.select(this.row, k); 
  if (this.keypad.isCorrect(k)) {
    this.grader.increment(this.row, this.col);
    console.log("correct!");
    this.show();
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
  setTimeout(() => {this.clearMul();}, this.showDelay);
}

Quiz.prototype.clearMul = function() {
  this.product.deselect(this.grader.getGrade(this.row, this.col),
                        this.row, this.col);
  setTimeout(() => {this.factorCol.deselect(this.col);}, this.clearDelay);
  setTimeout(() => {this.operator.deselect();},          this.clearDelay*2);
  setTimeout(() => {this.factorRow.deselect(this.row);}, this.clearDelay*3);
  setTimeout(() => {this.keypad.clear(this.row); 
                    this.timer.hide(this);},             this.clearDelay*2);
  setTimeout(() => {this.asked = false; 
                    this.query();},                      this.clearDelay*4);
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
    if (!this.isMul && !this.divRow) {
      this.checkDiv(k); 
    }    
    return;
  }

  if (this.isMul) {
    this.show();
  }
  else {
    this.showDiv();
  }
    
  if (this.rowSet.has(k)) {
    this.rowSet.delete(k);
    this.factorRow.hide(k);
  }
  else {
    this.rowSet.add(k);
    this.factorRow.show(k);
  }
}

Quiz.prototype.toggleFactorCol = function(k) {
  if (this.play) {
    if (!this.isMul && this.divRow) {
      this.checkDiv(k); 
    }    
    return;
  }

  if (this.isMul) {
    this.show();
  }
  else {
    this.showDiv();
  }
    
  if (this.colSet.has(k)) {
    this.colSet.delete(k);
    this.factorCol.hide(k);
  }
  else {
    this.colSet.add(k);
    this.factorCol.show(k);
  }
}

Quiz.prototype.toggleController = function() {
  this.play = !this.play;
  if (this.play) {
    this.controller.select();
    if (!this.answered) {
      this.timer.resume(this);
    }
    else if (!this.asked) {
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
    if (this.isMul) {
      this.checkMul(k);
    }
    else {
      // terminate keypad clicks
    }
  }
}

Quiz.prototype.toggleTimer = function() {
  if (this.play) {
    if (this.isMul) {
      this.show();
    }
    else {
      this.showDiv();
    }
  }
  else {
    this.timer.toggle();
  }
}

// division methods //

Quiz.prototype.askDiv = function() {
  console.log("what is", this.grader.getAnswer(this.row, this.col), "/", this.col, "?");
  this.isMul = false;
  this.asked = true;
  if (this.divRow) {
    this.factorRow.select(this.row);
    setTimeout(() => {this.factorCol.setDiv();}, this.askDelay*2);
  }
  else {
    this.factorRow.setDiv();
    setTimeout(() => {this.factorCol.select(this.col);}, this.askDelay*2);
  }
  setTimeout(() => {this.operator.select();}, this.askDelay);
  setTimeout(() => {this.keypad.setDiv(this.grader, this.row, this.col)
                    this.timer.restart(this);
                    this.answered = false;},  this.askDelay*3);
}

Quiz.prototype.checkDiv = function(k) {
  if (this.answered) {
    return;
  }
  let isCorrect = null;
  if (this.divRow) {
    let answer = this.col;
    isCorrect = (answer == k);
    this.factorCol.selectDiv(isCorrect, k);
  }
  else {
    let answer = this.row;
    isCorrect = (answer == k);
    this.factorRow.selectDiv(isCorrect, k);
  }
  if (isCorrect) {
    console.log("correct!");
    this.keypad.select(this.row, 3); 
    this.grader.increment(this.row, this.col);
    this.showDiv()
  }
  else {
    console.log("incorrect.");
  }
}

Quiz.prototype.showDiv = function() {
  if (this.answered) {
    return;
  }
  this.answered = true;
  if (this.divRow) {
    this.factorCol.select(this.col);
  }
  else {
    this.factorRow.select(this.row);
  }
  this.timer.stop();
  this.product.showDiv(this.row, this.col);
  console.log("answer:", this.grader.getAnswer(this.row, this.col));
  setTimeout(() => {this.clearDiv();}, this.showDelay);
}

Quiz.prototype.clearDiv = function() {
  this.product.deselect(this.grader.getGrade(this.row, this.col),
                        this.row, this.col);
  setTimeout(() => {if (this.divRow) {
                      this.factorCol.resetDiv();
                    }
                    else {
                      this.factorCol.deselect(this.col);
                    }},                                     this.clearDelay);
  setTimeout(() => {this.operator.deselect();},             this.clearDelay*2);
  setTimeout(() => {if (this.divRow) {
                      this.factorRow.deselect(this.row);
                    }
                    else {
                      this.factorRow.resetDiv();
                    }},                                     this.clearDelay*3);
  setTimeout(() => {this.keypad.clearDiv(this.row); 
                    this.timer.hide(this);},                this.clearDelay*2);
  setTimeout(() => {this.asked = false; 
                    this.query();},                      this.clearDelay*4);
}

export {Quiz};
