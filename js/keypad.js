import {randbool, randrange, sortDec} from "./random.js";
import {section, Grid1d} from "./section.js";
import {KeypadCell} from "./cell.js";

function Keypad(parent) {
  let name = "keypad";
  let size = 5;
  Grid1d.call(this, name, parent, size);
  let color = (0).toString();
  for (let k = 1; k <= size; k++) { 
    let index = k.toString();
    let element = section(name + "-" + index, this.element);
    this.cells[k-1] = new KeypadCell(element, color, ""); 
  }

  this.textSet = new Set();
  this.textArr = Array();
}

Keypad.prototype = Object.create(Grid1d.prototype);

Keypad.prototype.select = function(color, ...args) {
  this.get(args).select(color);
}

Keypad.prototype.deselect = function(color, ...args) {
  this.get(args).deselect(color);
}

Keypad.prototype.show = function(text, isCorrect, ...args) {
  this.get(args).show(text, isCorrect);
}

Keypad.prototype.set = function(grader, i, j) {
  let answer = grader.getAnswer(i, j);
  this.textSet.add(answer);
  while (this.textSet.size < 4) {
    if (randbool()) { 
      this.textSet.add(grader.getAnswer(i, randrange(1, 11)));
    }
    else {
      this.textSet.add(grader.getAnswer(j, randrange(1, 11)));
    }
  }
  while (this.textSet.size < 5) {
    this.textSet.add(grader.getAnswer(randrange(1, 11), randrange(1, 11)));
  }

  this.textSet.forEach(v => this.textArr.push(v));
  this.textSet.clear();
  this.textArr.sort(sortDec);

  for (let k = 1; k <= 5; k++) {
    let text = this.textArr.pop();
    let isCorrect = (text == answer);
    this.show(text, isCorrect, k);
  }
}
    
Keypad.prototype.clear = function(color) {
  for (let k = 1; k <= 5; k++) {
    this.deselect(color, k);
  }
}  

Keypad.prototype.isCorrect = function(...args) {
  return this.get(args).isCorrect;
}

Keypad.prototype.listen = function(quiz) {
  for (let k = 1; k <= 5; k++) {
    this.get([k]).element.addEventListener(
      "click", function() {quiz.toggleKeypad(k);}, {}
    );
  }
}

export {Keypad};
