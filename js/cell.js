// constructors //

function Cell(element, color, text) {
  this.element = element;
  this.addColor(color);
  // this.element.classList.add("translucent");
  this.text = text;
}

function FactorCell(element, color, text) {
  Cell.call(this, element, color, text);
}

function ProductCell(element, color, text) {
  Cell.call(this, element, color, text);
  this.addBorderColor(color);
  this.hide();
  this.gradeStyle = "hidden";
}

function KeypadCell(element, color, text) {
  Cell.call(this, element, color, text);
  this.isCorrect = false;
}

function ControllerCell(element, color, text) {
  Cell.call(this, element, color, text);
  this.showText();
}

function OperatorCell(element, color, text) {
  FactorCell.call(this, element, color, text);
}

function TimerCell(element) {
  Cell.call(this, element, 0, "");
  this.showText();
  this.total = 10;
  this.alarm = 0;
  this.remain = 0;
  this.interval = null;
}


// links //

FactorCell.prototype = Object.create(Cell.prototype);
ProductCell.prototype = Object.create(Cell.prototype);
KeypadCell.prototype = Object.create(Cell.prototype);
ControllerCell.prototype = Object.create(Cell.prototype);
OperatorCell.prototype = Object.create(FactorCell.prototype);
TimerCell.prototype = Object.create(Cell.prototype);

// cell //

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

Cell.prototype.removeColor = function(color) {
  this.element.classList.remove("background-color-" + color.toString());
}

Cell.prototype.addBorderColor = function(color) {
  this.element.classList.add("border-color-" + color.toString());
}

Cell.prototype.showText = function() {
  this.element.textContent = this.text;
}

Cell.prototype.hideText = function() {
  this.element.textContent = "";
}

Cell.prototype.changeText = function(text) {
  this.text = text;
}

Cell.prototype.addMediumFont = function() {
  this.element.classList.add("font-medium");
}

Cell.prototype.removeMediumFont = function() {
    this.element.classList.remove("font-medium");
}

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

// factor //

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

FactorCell.prototype.selectDiv = function(isCorrect) {
  if (!isCorrect) {
    this.hideText();
  }
  Cell.prototype.select.call(this);
}

FactorCell.prototype.deselectDiv = function() {
  Cell.prototype.deselect.call(this);
  this.showText();
}

// product //

ProductCell.prototype.select = function() {
  Cell.prototype.select.call(this);
  this.removeStyle(this.gradeStyle);
}

ProductCell.prototype.deselect = function(score) {
  Cell.prototype.deselect.call(this);
  this.hideText();
  this.gradeStyle = this.gradeStyleMap[score];
  this.addStyle(this.gradeStyle);
}

ProductCell.prototype.show = function() {
  this.showText();
}

ProductCell.prototype.gradeStyleMap = {
  0 : "hidden",
  1 : "border-thin" ,
  2 : "border-thick",
  3 : "translucent",
};

ProductCell.prototype.addGradeStyle = function(grade) {
  this.gradeStyle = this.gradeStyleMap[grade]; 
  this.addStyle(this.gradeStyle);
}

ProductCell.prototype.removeGradeStyle = function() {
  this.removeStyle(this.gradeStyle);
}

ProductCell.prototype.showDiv = function() {
  this.select();
  this.showText();
}

// keypad //

KeypadCell.prototype.show = function(text, isCorrect) {
  Cell.prototype.show.call(this);
  this.changeText(text);
  if (text == "100") {
    this.addMediumFont(); 
  }
  this.showText();
  this.isCorrect = isCorrect;
}

KeypadCell.prototype.select = function(color) {
  Cell.prototype.select.call(this);
  if (this.isCorrect) {
    this.addColor(color.toString());
    this.hideText();
  }
}

KeypadCell.prototype.deselect = function(color) {
  Cell.prototype.deselect.call(this);
  this.hideText();
  if (this.text == "100") {
    this.removeMediumFont(); 
  }
  if (this.isCorrect) {
    this.removeColor(color.toString());
    this.isCorrect = false;
  }
}

KeypadCell.prototype.setDiv = function(answer) {
  this.isCorrect = true;
  let text = answer.toString();
  this.changeText(text);
  if (text == "100") {
    this.addMediumFont(); 
  }
  this.showText();
}

// timer //

TimerCell.prototype.show = function(total) {
  if (total != null) {
    this.total = total;
  }
  // timer stops when remain < 1000
  this.remain = this.total * 1000 + 999;
  this.changeText(this.total);
}
  
TimerCell.prototype.hide = function() {
  this.deselect();
  this.hideText();
}

TimerCell.prototype.pause = function() {
  this.updateRemain();
  this.deselect();
  this.changeText(this.total);
  this.showText();
}

TimerCell.prototype.select = function(quiz) {
  if (this.interval != null) {
    console.log("timercell select attempted, but interval not null");
    return;
  }
  // display current time
  Cell.prototype.select.call(this);
  this.changeText(this.getCount().toString());
  this.showText();

  // set alarm
  let now = new Date;
  this.alarm = now.getTime() + this.remain;

  // count down, store handler
  let count = 0;
  this.interval = setInterval(() => {
    this.updateRemain();
    count = this.getCount();
    this.changeText(count.toString());
    this.showText();

    // trigger alarm 
    if (count <= 0) {
      console.log("count:", count);
      quiz.show();
    }
  }, 1000);
}

TimerCell.prototype.deselect = function() {
  Cell.prototype.deselect.call(this);
  clearInterval(this.interval);
  this.interval = null; 
}

TimerCell.prototype.toggle = function() {
  this.show(this.nextTotal[this.total]);
  this.showText();
  console.log("timer set to", this.total, "sec");
}

TimerCell.prototype.getCount = function() {
  return Math.floor(this.remain / 1000);
}

TimerCell.prototype.updateRemain = function() {
  let now = new Date;
  this.remain = this.alarm - now.getTime();
}
  
TimerCell.prototype.nextTotal = {
  10 : 5,
   5 : 2,
   2 : 1,
   1 : 99,
  99 : 10,
}; 

export {FactorCell, ProductCell, KeypadCell, ControllerCell, OperatorCell, TimerCell};
