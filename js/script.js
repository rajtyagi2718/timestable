// hidden cell node siblings
// keyboard input
// keypad widget

function assert(condition, message) {
  if (!condition) {
    throw message || "Assertion failed";
  }
}

const cellStop = 11;

const colorArray = [
  '#BEC2CB',
  '#F8EECA', '#F5DC9A', '#8EB155', '#497367', '#2B3F00',
  '#764000', '#E19E57', '#010570', '#3266B2', '#B8F7FE',
  '#FFFFFF', '#000000',
];

const scoreArray = Array(cellStop).fill().map(() => Array(cellStop).fill(0));

function increaseScoreGuide(i, j) {
  scoreArray[i][j] += 1;
}

function increaseScoreProduct(i, j) {
  if (scoreArray[i][j] < 3) { scoreArray[i][j] += 1; }
}

const frameArray = [
  'cell-hidden', 'cell-thin-frame', 'cell-thick-frame', 'cell-no-text'
];

function textCellRowCol(i, j) {
  let text;
  if (i && j) {
    text = (i*j).toString();
  }
  else if (i) {
    text = i.toString();
  }
  else if (j) {
    text = j.toString();
  }
  else {
    text = '\u00D7';
  }
  return text;
}

function getCellIdByRowCol(i, j) {
  return i.toString() + ' ' + j.toString();
}

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

for (let i = 0; i < cellStop; i++) {
  for (let j = 0; j < cellStop; j++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = getCellIdByRowCol(i, j);
    cell.textContent = textCellRowCol(i, j);
    cell.style['border-color'] = colorArray[i]; 
    cell.style['background-color'] = colorArray[i];
    cell.classList.add('cell-no-text');
    if (i && j) {
      cell.classList.add('cell-hidden');
    } 
    else {
      cell.classList.add('cell-guide');
    }
    grid.appendChild(cell);
  }
};

function getCellByRowCol(i, j) {
  return document.getElementById(getCellIdByRowCol(i, j));
}

getCellByRowCol(10, 10).classList.toggle('three-digits');

function getScore(cell) {
  let [row, col] = cell.id.split(' ');
  row = parseInt(row);
  col = parseInt(col);
  return scoreArray[row][col];
} 

function increaseScoreCell(cell) {
  let [row, col] = cell.id.split(' ');
  row = parseInt(row);
  col = parseInt(col);
  score = scoreArray[row][col];
  if (score < 3 || cell.classList.contains('cell-guide')) {
    scoreArray[row][col]++;
  }
}

function toggleCellFrame(cell) {
  cell.classList.toggle(frameArray[getScore(cell)]);
}

function selectCell(cell) {
  if (cell.classList.contains('cell-guide')) {
    if (cell.classList.toggle('is-selected')) {
      cell.classList.toggle('cell-no-text');
      increaseScoreCell(cell);
    } 
    else { cell.classList.add('cell-no-text'); }
  } 
  else if (cell.classList.contains('cell-no-text')) {
    if (cell.classList.contains('is-selected')) {
      cell.classList.remove('cell-no-text');
    } 
    else {
      cell.classList.remove(frameArray[getScore(cell)]);    
      cell.classList.add('is-selected');
    } 
  }
  else {
    increaseScoreCell(cell);
    cell.classList.add(frameArray[getScore(cell)]);
    cell.classList.add('cell-no-text');
    cell.classList.remove('is-selected');
  }
}

function toggleCellGuide(i, j) {
  assert(i == 0 || j == 0, 'selectCellGuide requires nonzero int pair');
  let cell = getCellByRowCol(i, j);
  if (cell.classList.toggle('cell-no-text')) { increaseScoreGuide(i, j); }
  cell.classList.toggle('is-selected'); 
} 

function selectCellProduct(i, j) {
  assert(i || j, 'selectCellProduct requires both coordiantes nonzero');
  let cell = getCellByRowCol(i, j);
  assert(cell.classList.contains('cell-no-text'),
    'selectCellProduct cell must have no text');
  toggleCellFrame(cell);  
  cell.classList.add('is-selected');
}

function deselectCellProduct(i, j) {
  assert(i || j, 'deselectCellProduct requires both coordiantes nonzero');
  let cell = getCellByRowCol(i, j);
  assert(cell.classList.contains('is-selected'),
    'deselectCellProduct cell must be selected');
  assert(!cell.classList.contains('cell-no-text'),
    'deselectCellProduct cell must contain text');
  cell.classList.add('cell-no-text');
  toggleCellFrame(cell);  
  cell.classList.remove('is-selected');
}

function askQuestion(i, j) {
  let delay = 500
  assert(i && j, 'askQuestion requires nonzero cordinates');
  toggleCellGuide(i, 0);
  setTimeout(toggleCellGuide, delay, 0, 0);
  setTimeout(toggleCellGuide, delay*2, 0, j);
  setTimeout(selectCellProduct, delay*3, i, j);
}

function clearQuestion(i, j) {
  assert(i && j, 'clearQuestion requires nonzero cordinates');
  deselectCellProduct(i, j);
  toggleCellGuide(0, j);
  toggleCellGuide(0, 0);
  toggleCellGuide(i, 0);
}  

function answerQuestion(i, j) {
  let delay = 500
  assert(i && j, 'answerQuestion requires nonzero cordinates');
  toggleCellGuide(i, 0);
  assert(cell.classList.contains('is-selected'),
    'answerQuestion cell must be selected');
  assert(!cell.classList.contains('cell-no-text'),
    'answerQuestion cell must contain text');
} 

grid.addEventListener('click', function (event) {
  let clicked = event.target;
  if (clicked.nodeName === 'SECTION') { return; }
  if (clicked.id == '0 0') { askQuestion(3, 7); }
  else if (clicked.id == '3 7') { clearQuestion(3,7); }
  else { selectCell(clicked); }
})

