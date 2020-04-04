// keypad input: 100 text, double click bug, oop 

//// js preamble ////

function assert(condition, message) {
  if (!condition) { 
  throw message || "Assertion failed";
  }
}

function randrange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(lst) {
  let i, j, item;
  for (i = lst.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i+1));
    item = lst[i];
    lst[i] = lst[j];
    lst[j] = item;
  }
}

function sortNumber(x, y) {
  return x - y;
}

//// cell functions ////

function setCellTextContent(cell) {
  cell.textContent = cell.dataset.text;
}

function addCellText(cell, text) {
  cell.textContent += text;
}

function clearCellTextContent(cell) {
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

for (let i = 0; i < 5; i++) {
  const cell = document.createElement("div");
  cell.dataset.row = (0).toString();
  cell.id = getCellId(i, 12);
  cell.dataset.classtype = "filled";
  cell.classList.add("opacity-33");
  setCellClassType(cell);
  keypad.appendChild(cell);
};


//// selection ////

function setCellText(cell) {
  changeCellClassType(cell, "text"); 
  setCellTextContent(cell);
}  

function clearCellText(cell) {
  clearCellTextContent(cell);
  changeCellClassType(cell, "filled"); 
}  

function toggleCellFactor(i, j) {
  let cell = getCell(i, j);
  if (toggleCellSelection(cell)) { 
    setCellText(cell);
  }
  else { 
    clearCellText(cell);
  }
} 

function selectCellProduct(i, j) {
  let cell = getCell(i, j);
  changeCellClassType(cell, "text");
  addCellSelection(cell);
}

function deselectCellProduct(i, j) {
  let cell = getCell(i, j);
  clearCellTextContent(cell);
  changeCellClassTypeByScore(cell, i, j);
  removeCellSelection(cell);
}

function inputCellProduct(i, j, text) {
  let cell = getCell(i,j);
  addCellText(cell, text);
}

function showCellProduct(i, j) {
  let cell = getCell(i, j);
  setCellTextContent(cell);
}

function selectCell(i, j) {
  if (i & j) { selectCellProduct(i, j); }
  else { toggleCellFactor(i, j); }
}


//// pad selection ////

const keypadTextArray = Array(gridSize-1).fill().map(()  => Array(gridSize-1));

for (let i = 1; i < gridSize; i++) {
  for (let j = 1; j < gridSize; j++) {
    keypadTextArray[i-1][j-1] = i*j;
  }
};

function getRandomKeypadText(i) {
  return keypadTextArray[i][randrange(0, 10)];
}

const keypadCells = keypad.children;
const curKeypadSet = new Set();
const curKeypadArray = Array();

var questionCleared = false;
var questionAnswered = false;

function setKeypad(i, j) {
  curKeypadSet.add(keypadTextArray[i-1][j-1]);
  while (curKeypadSet.size < 3) {
    curKeypadSet.add(keypadTextArray[i-1][randrange(0, 10)]);
  }
  while (curKeypadSet.size < 5) {
    curKeypadSet.add(keypadTextArray[j-1][randrange(0, 10)]);
  }
  curKeypadSet.forEach(v => curKeypadArray.push(v));
  curKeypadSet.clear();
  curKeypadArray.sort(sortNumber);
  curKeypadArray.reverse();
    
  for (let k = 0; k < 5; k++) {
    keypadCells[k].dataset.text = curKeypadArray.pop(); 
    setCellText(keypadCells[k]);
    keypadCells[k].addEventListener(
      "click", function() { checkAnswer(i, j, event.target) },
      {once: true}
    );
  }
  questionAnswered = false;
  questionCleared = false;
}

function addColorKey(i, j, key) {
  key.classList.add("background-color-" + i.toString());
}

function removeColorKey(i, j, key) {
  key.classList.remove("background-color-" + i.toString());
}

function clearKeypad(i, j) {
  for (let k = 0; k < 5; k++) {
    removeColorKey(i, j, keypadCells[k]);
    removeCellSelection(keypadCells[k]);
    clearCellText(keypadCells[k]);
    keypadCells[k].removeEventListener("click", function() {
      checkAnswer(i, j, event.target)
    });
  }
  console.log("removed listenters");
}


//// ask product ////

function askQuestion(i, j) {
  assert(i && j, "askQuestion requires nonzero cordinates");
  let delay = 400;
  toggleCellFactor(i, 0);
  setTimeout(toggleCellFactor, delay, 0, 0);
  setTimeout(toggleCellFactor, delay*2, 0, j);
  setTimeout(selectCellProduct, delay*3, i, j);
  setTimeout(setKeypad, delay*4, i, j);
}

function clearQuestion(i, j) {
  questionCleared = true;
  assert(i && j, "clearQuestion requires nonzero cordinates");
  incrementCellFactorScore(i, 0);
  incrementCellFactorScore(0, 0);
  incrementCellFactorScore(0, j);
  let delay = 200;
  clearKeypad(i, j);
  deselectCellProduct(i, j);
  setTimeout(toggleCellFactor, delay, 0, j);
  setTimeout(toggleCellFactor, delay*2, 0, 0);
  setTimeout(toggleCellFactor, delay*3, i, 0);
}  

function optionalClearQuestion(i, j) {
    if (! questionCleared) {
      clearQuestion(i, j);
    }
}

function checkAnswer(i, j, key) {
  if (questionAnswered) {
    console.log("question already answered", i, j, key.dataset.text);
    return null;
  }
  addCellSelection(key); 
  if (getCell(i, j).dataset.text == key.dataset.text) {
    incrementCellProductScore(i, j);
    addColorKey(i, j, key);
    clearCellText(key);
    setCellText(getCell(i, j));
    console.log("correct!", i, j, key.dataset.text);
    questionAnswered = true;
    setTimeout(clearQuestion, 1500, i, j);
  }
  else {
    console.log("incorrect.", i, j, key.dataset.text);
  }
} 


//// event listener ////

function getKeypadInput() {
  return keypadCells[randrange(0, 5)];
}

// var i, j;

var delay = 2000;
for (let k = 0; k < 400; k += 4) {
  i = randrange(1, 11);
  j = randrange(1, 11);
  setTimeout(askQuestion, delay*k, i, j);
  setTimeout(optionalClearQuestion, delay*(k+3), i, j);
};
