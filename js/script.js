// keyboard input
// keypad widget

//// js preamble ////

function assert(condition, message) {
  if (!condition) { 
  throw message || "Assertion failed";
  }
}

function randrange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


//// cell functions ////

function setCellText(cell) {
  cell.textContent = cell.dataset.text;
}

function addCellText(cell, text) {
  cell.textContent += text;
}

function clearCellText(cell) {
  cell.textContent = "";
}

const gridSize = 11;

const cellScoreArray = Array(gridSize).fill().map(() => 
                       Array(gridSize).fill(0));

function getCellScore(i, j) { 
  return cellScoreArray[i][j];
}
  
function incrementCellFactorScore(i, j) {
  cellScoreArray[i][j] += 1;
}

function incrementCellProductScore(i, j) {
  if (cellScoreArray[i][j] < 3) { cellScoreArray[i][j] += 1; }
}


const cellClassTypeArray = ["clear", "thin", "thick", "filled", "text"];

function getCellClassTypeByScore(score) { 
  return (score < 4) ? cellClassTypeArray[score] : cellClassTypeArray[3];
}

function getCellClassType(cell) {
  return "cell-" + cell.dataset.classtype + "-" + cell.dataset.row; 
}

function setCellClassType(cell) {
  cell.classList.add(getCellClassType(cell));
}

function removeCellClassType(cell) {
  cell.classList.remove(getCellClassType(cell));
}

function setCellClassTypeByScore(cell, i, j) {
  let score = getCellScore(i, j);
  console.log("cell ", i, j, score);
  cell.dataset.classtype = getCellClassTypeByScore(score);
  setCellClassType(cell);
}

function changeCellClassType(cell, cellTypeNew) {
  removeCellClassType(cell);
  cell.dataset.classtype = cellTypeNew;
  setCellClassType(cell);
}

function changeCellClassTypeByScore(cell, i, j) {
  removeCellClassType(cell);
  setCellClassTypeByScore(cell, i, j);
}


function toggleCellSelection(cell) {
  return cell.classList.toggle("opacity-1");
}

function addCellSelection(cell) {
  return cell.classList.add("opacity-1");
}

function removeCellSelection(cell) {
  return cell.classList.remove("opacity-1");
}


function getCellId(i, j) {
  return i.toString() + " " + j.toString();
}

function getCell(i, j) {
  return document.getElementById(getCellId(i, j));
}


//// pad functions ////



//// app creation ////

const body = document.getElementsByTagName("BODY")[0]
const app = document.createElement("section");
app.setAttribute("class", "app");
body.append(app);


//// grid creation ////

const grid = document.createElement("section");
grid.setAttribute("class", "grid");
app.appendChild(grid);

for (let i = 0; i < gridSize; i++) { 
  for (let j = 0; j < gridSize; j++) {
    const cell = document.createElement("div");
    cell.dataset.row = i.toString();
    cell.id = getCellId(i, j);
    if (i && j) {
      cell.dataset.classtype = "clear";
      cell.dataset.text = (i*j).toString(); 
    }
    else {
      cell.dataset.classtype = "filled";
      if (i) { cell.dataset.text = (i).toString(); }
      else if (j) { cell.dataset.text = (j).toString(); }
      else { cell.dataset.text = "\u00D7" }
    }
    cell.classList.add("opacity-33");
    setCellClassType(cell);
    grid.appendChild(cell);
  }
};

getCell(10, 10).classList.add("cell-font-medium");


//// keypad creation ////
 
const keypad = document.createElement("section");
keypad.setAttribute("class", "keypad");
app.appendChild(keypad);

for (let i = 0; i < gridSize; i++) {
  const cell = document.createElement("div");
  cell.dataset.row = (0).toString();
  cell.id = getCellId(i, 12);
  cell.dataset.classtype = "filled";
  cell.classList.add("opacity-33");
  setCellClassType(cell);
  keypad.appendChild(cell);
};


//// selection ////

function toggleCell(cell) {
  if (toggleCellSelection(cell)) { 
    changeCellClassType(cell, "text"); 
    setCellText(cell);
  }
  else { 
    clearCellText(cell);
    changeCellClassType(cell, "filled"); 
  }
} 

function toggleCellFactor(i, j) {
  toggleCell(getCell(i, j));
}

function selectCellProduct(i, j) {
  let cell = getCell(i, j);
  changeCellClassType(cell, "text");
  addCellSelection(cell);
}

function deselectCellProduct(i, j) {
  let cell = getCell(i, j);
  clearCellText(cell);
  changeCellClassTypeByScore(cell, i, j);
  removeCellSelection(cell);
}

function inputCellProduct(i, j, text) {
  let cell = getCell(i,j);
  addCellText(cell, text);
}

function showCellProduct(i, j) {
  let cell = getCell(i, j);
  setCellText(cell);
}

function selectCell(i, j) {
  if (i & j) { selectCellProduct(i, j); }
  else { toggleCellFactor(i, j); }
}


//// pad selection ////

function setKeypad() {
  let cell;
  for (let i = 0; i < gridSize; i++) {
    cell = getCell(i, 12);
    cell.dataset.text = randrange(0, 101); 
    toggleCell(cell);
  }
}

function clearKeypad() {
  let cell;
  for (let i = 0; i < gridSize; i++) {
    cell = getCell(i, 12);
    toggleCell(cell);
  }
}


//// ask product ////

function askProduct(i, j) {
  assert(i && j, "askQuestion requires nonzero cordinates");
  let delay = 400
  toggleCellFactor(i, 0);
  setTimeout(toggleCellFactor, delay, 0, 0);
  setTimeout(toggleCellFactor, delay*2, 0, j);
  setTimeout(selectCellProduct, delay*3, i, j);
  setTimeout(setKeypad, delay*4);
}

function clearQuestion(i, j) {
  assert(i && j, "clearQuestion requires nonzero cordinates");
  incrementCellFactorScore(i, 0);
  incrementCellFactorScore(0, 0);
  incrementCellFactorScore(0, j);
  let delay = 200
  clearKeypad();
  deselectCellProduct(i, j);
  setTimeout(toggleCellFactor, delay, 0, j);
  setTimeout(toggleCellFactor, delay*2, 0, 0);
  setTimeout(toggleCellFactor, delay*3, i, 0);
}  

function checkProduct(i, j) {
  if (true) {
    incrementCellProductScore(i, j);
  }
} 

//// event listener ////

var i, j;

grid.addEventListener("click", function (event) {
  let clicked = event.target;
  if (clicked.nodeName === "SECTION") { return; }
  if (clicked.id == "0 0") { 
    i = randrange(1, 11);
    j = randrange(1, 11);
    askProduct(i, j); 
  }
  else if (clicked.id == getCellId(i, j)) { 
    checkProduct(i, j);
    clearQuestion(i, j); 
  }
  else { }
});
