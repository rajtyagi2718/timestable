// ask question refactor
// keyboard input
// keypad widget

//// js preamble ////

function assert(condition, message) 
{
  if (!condition) 
  { throw message || "Assertion failed";
  }
}


//// cell functions ////

const gridSize = 11;

function resetCellText(cell) {
  cell.textContent = cell.dataset.text
}

function addCellText(cell, text) {
  cell.textContent += text;
}


const cellScoreArray = Array(gridSize).fill().map(() => 
                       Array(gridSize).fill(0));

function getCellScore(i, j) { 
  return cellScoreArray[i][j];
}
  
function incrementCellFactorScore(i, j) {
  scoreArray[i][j] += 1;
}

function incrementCellProductScore(i, j) {
  if (scoreArray[i][j] < 3) { scoreArray[i][j] += 1; }
}


const cellClassTypeArray = ["clear", "thin", "thick", "filled", "text"];

function getCellClassTypeByScore(score) { 
  return (score < 4) ? cellClassTypeArray[score] : cellClassTypeArray[3];
}


function getCellClassType(cellType, row) {
  return "cell-" + cellType + "-" + row
}

function changeCellClassType(cell, cellTypeOld, cellTypeNew) {
  cell.classList.remove(getCellClassType(cellTypeOld, cell.dataset.row));
  cell.classList.add(getCellClassType(cellTypeNew, cell.dataset.row));
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


//// grid creation ////

const game = document.getElementById("game");
const grid = document.createElement("section");
grid.setAttribute("class", "grid");
game.appendChild(grid);

for (let i = 0; i < gridSize; i++) { 
  for (let j = 0; j < gridSize; j++) {
    const cell = document.createElement("div");
    if (i && j) {
      cell.classList.add(getCellClassType("clear", i));
      cell.dataset.classtype = "clear";
      cell.dataset.text = (i*j).toString(); 
    }
    else {
      cell.classList.add(getCellClassType("filled", i));
      cell.dataset.classtype = "filled";
      if (i) { cell.dataset.text = (i).toString(); }
      else if (j) { cell.dataset.text = (j).toString(); }
      else { cell.dataset.text = "\u00D7" }
    }
    cell.dataset.row = i.toString();
    cell.id = getCellId(i, j);
    grid.appendChild(cell);
  }
};

getCell(10, 10).classList.add("cell-font-medium");

//// selection ////

function toggleCellFactor(i, j) {
  let cell = getCell(i, j);
  if (toggleCellSelection(cell)) {
    changeCellClassType(cell, "clear", "text");
    resetCellText(cell);
  }
} 

function selectCellProduct(i, j) {
  let cell = getCell(i, j);
  changeCellClassType
  cell.classList.remove(getCellClassTypeByScore(getCellScore(i, j));
  cell.classList.add
  addCellSelection(cell);
}

function deselectCellProduct(i, j) {
  let cell = getCell(i, j);
  cell.classList.remove(getCellClassTypeByScore(getCellScore(i, j));
  removeCellSelection(cell);
}

//// ask product ////

function askQuestion(i, j) {
  let delay = 500
  assert(i && j, "askQuestion requires nonzero cordinates");
  toggleCellFactor(i, 0);
  setTimeout(toggleCellFactor, delay, 0, 0);
  setTimeout(toggleCellFactor, delay*2, 0, j);
  setTimeout(selectCellProduct, delay*3, i, j);
}

function clearQuestion(i, j) {
  assert(i && j, "clearQuestion requires nonzero cordinates");
  deselectCellProduct(i, j);
  toggleCellGuide(0, j);
  toggleCellGuide(0, 0);
  toggleCellGuide(i, 0);
}  

function answerQuestion(i, j) {
  let delay = 500
  assert(i && j, "answerQuestion requires nonzero cordinates");
  toggleCellGuide(i, 0);
  assert(cell.classList.contains("is-selected"),
    "answerQuestion cell must be selected");
  assert(!cell.classList.contains("cell-no-text"),
    "answerQuestion cell must contain text");
} 

grid.addEventListener("click", function (event) {
  let clicked = event.target;
  if (clicked.nodeName === "SECTION") { return; }
  if (clicked.id == "0 0") { askQuestion(3, 7); }
  else if (clicked.id == "3 7") { clearQuestion(3,7); }
  else { selectCell(clicked); }
});
