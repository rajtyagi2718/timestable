// grid constructor //

function Grid(app) {
  this.element = document.createElement("section");
  this.element.setAttribute("class", "grid");
  app.appendChild(this.element);

  this.cellArray = Array(11).fill().map(() => Array(11));
  this.initCellArray = function() {
    for (let i = 0; i < 11; i++) { 
      for (let j = 0; j < 11; j++) {
        let element = document.createElement("div");
        this.element.appendChild(element);
        if (i && j) { this.cellArray[i][j] = new Product(element, i, j); }
        else {
          if (i) { this.cellArray[i][j] = new FactorRow(element, i); }
          else if (j) { this.cellArray[i][j] = new FactorCol(element, j); }
          else { this.cellArray[i][j] = new Factor(element, "0", "\u00D7"); }
        }
      }
    };
    this.cellArray[10][10].element.classList.add("cell-font-medium");
  }
  this.initCellArray();
}

// grid prototype methods //

Grid.prototype.select = function(i, j) {
  this.cellArray[i][j].select();
}

Grid.prototype.deselect = function(i, j) {
  this.cellArray[i][j].deselect();
}

Grid.prototype.show = function(i, j) {
  this.cellArray[i][j].showText();
}

Grid.prototype.hide = function(i, j) {
  this.cellArray[i][j].hideText();
}

// cell constructors //

function Cell(element, row, text) {
  this.element = element;
  this.element.classList.add("cell-box");
  this.element.classList.add("cell-text");
  this.element.classList.add("background-color-" + row);
  this.element.classList.add("opacity-33");
  this.text = text;
}

function Factor(element, row, text) {
  Cell.call(this, element, row, text);
}

function FactorRow(element, row) {
  Factor.call(this, element, row.toString(), row.toString());
}

function FactorCol(element, col) {
  Factor.call(this, element, "0", col.toString());
}

function Pad(element) {
  Cell.call(this, element, "0", "");
}

function Product(element, row, col) {
  Cell.call(this, element, row.toString(), (row * col).toString());
  this.element.classList.add("border-color-" + row);
  this.gradeStyle = "clear";
  this.addStyle("clear");
}

// cell prototype links //

Factor.prototype = Object.create(Cell.prototype);
FactorRow.prototype = Object.create(Factor.prototype);
FactorCol.prototype = Object.create(Factor.prototype);
Pad.prototype = Object.create(Cell.prototype);
Product.prototype = Object.create(Cell.prototype);

// cell prototype methods //

Cell.prototype.styleMap = {
  "clear"    : "background-clear",
  "thin"     : "border-width-thin",
  "thick"    : "border-width-thick",
  "selected" : "opacity-1",
};

Cell.prototype.addStyle = function(style) {
  this.element.classList.add(this.styleMap[style]);
}

Cell.prototype.removeStyle = function(style) {
  this.element.classList.remove(this.styleMap[style]);
}

Cell.prototype.showText = function() {
  this.element.textContent = this.text;
}

Cell.prototype.hideText = function() {
  this.element.textContent = "";
}

// factor prototype methods //

Factor.prototype.select = function() {
  this.showText();
  this.addStyle("selected");
}

Factor.prototype.deselect = function() {
  this.hideText();
  this.removeStyle("selected");
}

// product prototype methods //

Product.prototype.select = function() {
  this.removeStyle(this.gradeStyle);
  this.addStyle("selected");
}

Product.prototype.deselect = function() {
  this.hideText();
  this.removeStyle("selected");
  this.addStyle(this.gradeStyle);
}

// section constants //

const body = document.getElementsByTagName("BODY")[0];

const app = document.createElement("section");
app.setAttribute("class", "app");
body.append(app);

// construct grid //

const grid = new Grid(app);

// pad prototype methods //

Pad.prototype.select = function() {
  this.addStyle("selected");
}

Pad.prototype.deselect = function() {
  this.removeStyle("selected");
}


// keypad constructor //

const keypad = document.createElement("section");
keypad.setAttribute("class", "keypad");
app.appendChild(keypad);

// construct keypad //

const keypadArray = Array(5);

for (let i = 0; i < 5; i++) {
  const element = document.createElement("div");
  keypad.appendChild(element);
  keypadArray[i] = new Pad(element);
};

// question methods //

// const keypadTextSet = new Set(5);
// const curKeypadText = Array(5);
// 
// function setKeypad(i, j) {
//   KeypadSet.add(gridArray[i][j].text);
//   while (curKeypadSet.size < 3) {
//     curKeypadSet.add(keypadTextArray[i-1][randrange(0, 10)]);
//   }
//   while (curKeypadSet.size < 5) {
//     curKeypadSet.add(keypadTextArray[j-1][randrange(0, 10)]);
//   }
//   curKeypadSet.forEach(v => curKeypadArray.push(v));
//   curKeypadSet.clear();
//   curKeypadArray.sort(sortNumber);
//   curKeypadArray.reverse();
//     
//   for (let k = 0; k < 5; k++) {
//     keypadCells[k].dataset.text = curKeypadArray.pop(); 
//     setCellText(keypadCells[k]);
//     keypadCells[k].addEventListener(
//       "click", function() { checkAnswer(i, j, event.target) },
//       {once: true}
//     );
//   }
//   questionAnswered = false;
//   questionCleared = false;
// }

function askQuestion(i, j) {
  let delay = 500;
  grid.select(i, 0)
  setTimeout(function() {grid.select(0, 0);}, delay);
  setTimeout(function() {grid.select(0, j);}, delay*2);
  setTimeout(function() {grid.select(i, j);}, delay*3);
}

function showAnswer(i, j) {
  let delay = 2000;
  grid.show(i, j);
}

function clearQuestion(i, j) {
  let delay = 150;
  grid.deselect(i, j);
  setTimeout(function() {grid.hide(i, j);}, delay);
  setTimeout(function() {grid.deselect(0, j);}, delay);
  setTimeout(function() {grid.deselect(0, 0);}, delay*2);
  setTimeout(function() {grid.deselect(i, 0);}, delay*3);
}

askQuestion(3,4);
setTimeout(showAnswer, 3000, 3, 4);
setTimeout(clearQuestion, 3000*2, 3, 4);
