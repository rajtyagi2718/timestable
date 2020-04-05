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

function Cell(parentElement) {
  this.element = document.createElement("div");
  this.setCellBox();
  parentElement.append(instance.element);
}

function Factor(row, col, text) {
  Cell.call(this, grid);
  this.text = text;
  this.setFilledBox();
}

function FactorRow(row) {
  Factor.call(this, row, 0, row.toString());
}

function FactorCol(col) {
  Factor.call(this, 0, col, col.toString());
}

function Pad() {
  Cell.call(this, keypad, "filled");
  this.setFilledBox();
}

function Product(row, col) {
  Cell.call(this, grid, "clear");
  this.text = (row * col).toString();
  this.setClearBox();
  this.setBorderColor();
}

// cell prototype links //

FactorRow.prototype = Object.create(Cell.prototype)
FactorCol.prototype = Object.create(Cell.prototype)
Product.prototype = Object.create(Cell.prototype)

// cell prototype methods //

Cell.prototype.setCellBox = function() {
  this.element.classList.add("cell-box");
}

Cell.prototype.setClearBox = function() {
  this.element.classList.add("background-clear");
}

Cell.prototype.setThinBox = function() {
  this.element.classList.add("background-clear");
  this.element.classList.add("border-color-" + this.row.toString());
}

Cell.prototype.setBorderColor = function() {
  this.element.classList.add("border-color-" + this.row.toString());
}




// Initialize constructor functions
function Hero(name, level) {
  this.name = name
  this.level = level
}

function Warrior(name, level, weapon) {
  Hero.call(this, name, level)

  this.weapon = weapon
}

function Healer(name, level, spell) {
  Hero.call(this, name, level)

  this.spell = spell
}

// Link prototypes and add prototype methods
Warrior.prototype = Object.create(Hero.prototype)
Healer.prototype = Object.create(Hero.prototype)

Hero.prototype.greet = function() {
  return `${this.name} says hello.`
}

Warrior.prototype.attack = function() {
  return `${this.name} attacks with the ${this.weapon}.`
}

Healer.prototype.heal = function() {
  return `${this.name} casts ${this.spell}.`
}

// Initialize individual character instances
const hero1 = new Warrior('Bjorn', 1, 'axe')
const hero2 = new Healer('Kanin', 1, 'cure')
