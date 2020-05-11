function Cell(element, color, text) {
  this.element = element;
  this.addColor(color);
  // this.element.classList.add("translucent");
  this.text = text;
}

function FactorCell(element, color, text) {
  Cell.call(this, element, color, text);
}

function Product(element, color, text) {
  Cell.call(this, element, color, text);
  this.addBorderColor(color);
  this.addStyle("hidden");
  this.hide();
  this.gradeStyle = "hidden";
  this.addStyle("clear");
}

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
FactorCell.prototype = Object.create(Cell.prototype);
// FactorRow.prototype = Object.create(Factor.prototype);
// FactorCol.prototype = Object.create(Factor.prototype);
// Product.prototype = Object.create(Cell.prototype);
// Pad.prototype = Object.create(Cell.prototype);
// Controller.prototype = Object.create(Cell.prototype);
// Timer.prototype = Object.create(Cell.prototype);
// 
// // cell methods //
// 
Cell.prototype.addStyle = function(name) {
  this.element.classList.add(name);
}

Cell.prototype.removeStyle = function(name) {
  this.element.classList.remove(name);
}

Cell.prototype.toggleStyle = function(name) {
  return this.element.classList.toggle(name);
}

Cell.prototype.addColor = function(color) {
  this.addStyle("background-color-" + color);
}

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
Cell.prototype.showText = function() {
  this.element.textContent = this.text;
}

Cell.prototype.hideText = function() {
  this.element.textContent = "";
}

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

Cell.prototype.select = function() {
  this.addStyle("opaque");
}

Cell.prototype.deselect = function() {
  this.removeStyle("opaque");
}

Cell.prototype.hide = function() {
  this.addStyle("hidden");
}

Cell.prototype.show = function() {
  this.removeStyle("hidden");
}

Cell.prototype.toggle = function() {
  return this.toggleStyle("hidden");
}

// factor methods //

FactorCell.prototype.select = function() {
  Cell.prototype.select.call(this);
  this.showText();
}

FactorCell.prototype.deselect = function() {
  Cell.prototype.deselect.call(this);
  this.hideText();
}

FactorCell.prototype.hide = function() {
  Cell.prototype.hide.call(this);
  this.deselect();
}

FactorCell.prototype.show = function() {
  Cell.prototype.show.call(this);
  this.showText();
}

FactorCell.prototype.toggle = function() {
  if (Cell.prototype.toggle.call(this)) {
    this.deselect();
    return false;
  }
  else {
    this.showText();
    return true;
  }
}

// product methods //

Product.prototype.select = function() {
  this.removeStyle(this.gradeStyle);
  this.addStyle("selected");
}

Product.prototype.deselect = function(score) {
  this.hideText();
  this.removeStyle("selected");
  this.gradeStyle = this.gradeStyleMap[score];
  this.addStyle(this.gradeStyle);
}

Product.prototype.show = function() {
  this.showText();
}

Product.prototype.gradeStyleMap = {
  0 : "hidden",
  1 : "border-thin" ,
  2 : "border-thick",
  3 : "translucent",
};

Product.prototype.addGradeStyle = function(grade) {
  this.gradeStyle = this.gradeStyleMap[grade]; 
  this.addStyle(this.gradeStyle);
}

Product.prototype.removeGradeStyle = function() {
  this.removeStyle(this.gradeStyle);
}

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

export {FactorCell};
