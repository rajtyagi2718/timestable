// section constants //
const body = document.getElementsByTagName("BODY")[0];

const app = document.createElement("section");
app.setAttribute("class", "app");
body.append(app);

const grid = document.createElement("section");
grid.setAttribute("class", "grid");
app.appendChild(grid);

const keypad = document.createElement("section");
keypad.setAttribute("class", "keypad");
app.appendChild(keypad);


// cell constructors //

function Cell(element, row) {
  this.element = element;
  this.element.classList.add("cell-box");
  this.element.classList.add("cell-text");
  this.element.classList.add("background-color-" + row);
  this.element.classList.add("opacity-33");
}

function CellFilled(element, row, text) {
  Cell.call(this, element, row);
  this.text = text;
  this.showCellText();
}

function FactorRow(element, row) {
  CellFilled.call(this, element, row.toString(), row.toString());
}

function FactorCol(element, col) {
  CellFilled.call(this, element, "0", col.toString());
}

function Pad(element) {
  CellFilled.call(this, element, "0", "");
}

function Product(element, row, col) {
  Cell.call(this, element, row.toString());
  this.text = (row * col).toString();
  this.element.classList.add("border-color-" + row);
  this.addCellClear();
}

// cell prototype links //

CellFilled.prototype = Object.create(Cell.prototype);
FactorRow.prototype = Object.create(CellFilled.prototype);
FactorCol.prototype = Object.create(CellFilled.prototype);
Pad.prototype = Object.create(CellFilled.prototype);
Product.prototype = Object.create(Cell.prototype);

// cell prototype methods style //

Cell.prototype.addCellClear = function() {
  this.element.classList.add("background-clear");
}

Cell.prototype.addCellThin = function() {
  this.addCellClear();
  this.element.classList.add("border-width-thin");
}

Cell.prototype.addCellThick = function() {
  this.addCellClear();
  this.element.classList.add("border-width-thick");
}

Cell.prototype.showCellText = function() {
  this.element.textContent = this.text;
}

// construct grid //

const gridArray = Array(11).fill().map(() => Array(11));

for (let i = 0; i < 11; i++) { 
  for (let j = 0; j < 11; j++) {
    const element = document.createElement("div");
    grid.appendChild(element);
    gridArray[i][j] = element;
    if (i && j) {
      gridArray[i][j] = new Product(element, i, j);
    }
    else {
      if (i) { gridArray[i][j] = new FactorRow(element, i); }
      else if (j) { gridArray[i][j] = new FactorCol(element, j); }
      else { gridArray[i][j] = new CellFilled(element, "0", "\u00D7"); }
    }
  }
};

gridArray[10][10].element.classList.add("cell-font-medium");

// construct keypad //

const keypadArray = Array(5);

for (let i = 0; i < 5; i++) {
  const element = document.createElement("div");
  keypad.appendChild(element);
  gridArray[i][j] = element;
  const cell = document.createElement("div");
  cell.dataset.row = (0).toString();
  cell.id = getCellId(i, 12);
  cell.dataset.classtype = "filled";
  cell.classList.add("opacity-33");
  setCellClassType(cell);
  keypad.appendChild(cell);
};
