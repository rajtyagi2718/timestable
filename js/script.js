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

const cellClassListObject =
{ "cell-clear" : ["background-color-white"],
  "cell-thin"  : ["background-color-white", "cell-border-width-thin"],
  "cell-thick" : ["background-color-white", "cell-border-width-thick"],
  "cell-fill"  : [],
  "cell-text"  : ["cell-text"],
};

function addCellClassList(cell, name)
{ 
  cellClassListObject[name].forEach(function(item)
  { cell.classList.add(item);
  });
}

function removeCellClassList(cell, name)
{ 
  cellClassListObject[name].forEach(function(item)
  { cell.classList.remove(item);
  });
}


const gridSize = 11;

const cellTextArray = Array(gridSize).fill().map(() => Array(gridSize));

cellTextArray[0][0] = "\u00D7";

for (let i = 1; i < gridSize; ++i)
{ cellTextArray[i][0] = i.toString();
};

for (let j = 1; j < gridSize; ++j)
{ cellTextArray[0][j] = j.toString();
};

for (let i = 1; i < gridSize; ++i)
{ for (let j = 1; j < gridSize; ++j)
  { cellTextArray[i][j] = (i*j).toString();
  }
};

function getCellText(i, j)
{
  return cellTextArray[i][j];
}


function getCellClassColor(i)
{
  return "color-" + i.toString();
}

const cellScoreArray = Array(gridSize).fill().map(() => Array(gridSize).fill(0));

function getCellScore(i, j)
{ return cellScoreArray[i][j];
}
  
function incrementCellFactorScore(i, j) 
{
  scoreArray[i][j] += 1;
}

function incrementCellProductScore(i, j) 
{
  if (scoreArray[i][j] < 3) 
  { scoreArray[i][j] += 1; 
  }
}


const cellProductNameArray = 
[ "cell-clear", "cell-thin", "cell-thick", "cell-fill"
];

function getCellProductName(score)
{ 
  return (score < 4) cellProductNameArray[score] : cellProductNameArray[3];
}


function getCellId(i, j) 
{
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

for (let i = 0; i < gridSize; i++) 
{ for (let j = 0; j < gridSize; j++) 
{   const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = getCellId(i, j);
    cell.textContent = getCellText(i, j);
    cell.classList.add(getCellClassColor(i));
    if (i && j) 
    { addCellClassList(cell, "cell-clear");
    }
    else
    { addCellClassList(cell, "cell-fill");
    } 
    grid.appendChild(cell);
  }
};

getCell(10, 10).classList.add("cell-font-medium");

function getScore(cell) {
  let [row, col] = cell.id.split(" ");
  row = parseInt(row);
  col = parseInt(col);
  return scoreArray[row][col];
} 

function increaseScoreCell(cell) {
  let [row, col] = cell.id.split(" ");
  row = parseInt(row);
  col = parseInt(col);
  score = scoreArray[row][col];
  if (score < 3 || cell.classList.contains("cell-guide")) {
    scoreArray[row][col]++;
  }
}

function toggleCellFrame(cell) {
  cell.classList.toggle(frameArray[getScore(cell)]);
}

function selectCell(cell) {
  if (cell.classList.contains("cell-guide")) {
    if (cell.classList.toggle("is-selected")) {
      cell.classList.toggle("cell-no-text");
      increaseScoreCell(cell);
    } 
    else { cell.classList.add("cell-no-text"); }
  } 
  else if (cell.classList.contains("cell-no-text")) {
    if (cell.classList.contains("is-selected")) {
      cell.classList.remove("cell-no-text");
    } 
    else {
      cell.classList.remove(frameArray[getScore(cell)]);    
      cell.classList.add("is-selected");
    } 
  }
  else {
    increaseScoreCell(cell);
    cell.classList.add(frameArray[getScore(cell)]);
    cell.classList.add("cell-no-text");
    cell.classList.remove("is-selected");
  }
}

function toggleCellGuide(i, j) {
  assert(i == 0 || j == 0, "selectCellGuide requires nonzero int pair");
  let cell = getCellByRowCol(i, j);
  if (cell.classList.toggle("cell-no-text")) { increaseScoreGuide(i, j); }
  cell.classList.toggle("is-selected"); 
} 

function selectCellProduct(i, j) {
  assert(i || j, "selectCellProduct requires both coordiantes nonzero");
  let cell = getCellByRowCol(i, j);
  assert(cell.classList.contains("cell-no-text"),
    "selectCellProduct cell must have no text");
  toggleCellFrame(cell);  
  cell.classList.add("is-selected");
}

function deselectCellProduct(i, j) {
  assert(i || j, "deselectCellProduct requires both coordiantes nonzero");
  let cell = getCellByRowCol(i, j);
  assert(cell.classList.contains("is-selected"),
    "deselectCellProduct cell must be selected");
  assert(!cell.classList.contains("cell-no-text"),
    "deselectCellProduct cell must contain text");
  cell.classList.add("cell-no-text");
  toggleCellFrame(cell);  
  cell.classList.remove("is-selected");
}

function askQuestion(i, j) {
  let delay = 500
  assert(i && j, "askQuestion requires nonzero cordinates");
  toggleCellGuide(i, 0);
  setTimeout(toggleCellGuide, delay, 0, 0);
  setTimeout(toggleCellGuide, delay*2, 0, j);
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
})

