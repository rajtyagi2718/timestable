// keypad widget

const cellStop = 11;

const colorArray = [
  '#BEC2CB',
  '#F8EECA', '#F5DC9A', '#8EB155', '#497367', '#2B3F00',
  '#764000', '#E19E57', '#010570', '#3266B2', '#B8F7FE',
  '#FFFFFF', '#000000',
];

const frameArray = ['no-frame', 'small-frame', 'medium-frame', 'all-frame'];

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
};

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

for (let i = 0; i < cellStop; i++) {
  for (let j = 0; j < cellStop; j++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = i.toString() + j.toString();
    cell.innerHTML = textCellRowCol(i, j);
    cell.dataset.score = 0;
    cell.style['border-color'] = colorArray[i]; 
    cell.style['background-color'] = colorArray[i];
    cell.classList.add('back');
    if (i && j) {
      cell.classList.add('no-frame');
    } else {
      cell.classList.add('guide');
    }
    grid.appendChild(cell);
}};

document.getElementById('1010').classList.toggle('three-digits');

function increaseScore(cell) {
  let score = parseInt(cell.dataset.score);
  if (score < 3) {
    score++;
  }
  cell.dataset.score = score;
  cell.classList.toggle(frameArray[score]);
};

function selectCell(cell) {
  if (cell.classList.toggle('is-selected') && !(cell.classList.contains('guide'))) {
    cell.classList.toggle(frameArray[parseInt(cell.dataset.score)]);
  }
  if (cell.classList.toggle('back') && !(cell.classList.contains('guide'))) {
    increaseScore(cell);
}};

grid.addEventListener('click', function (event) {
  let clicked = event.target;
  if (clicked.nodeName === 'SECTION') { return; }
  selectCell(clicked);
});

