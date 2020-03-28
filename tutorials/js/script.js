// face up: opacity 1, number showing
// face down: opacity .33, number not showing, border variable
const cellStop = 11;

const colorArray = [
  '#BEC2CB',
  '#F8EECA', '#F5DC9A', '#8EB155', '#497367', '#2B3F00',
  '#764000', '#E19E57', '#010570', '#3266B2', '#B8F7FE',
  '#FFFFFF', '#000000',
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
};

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

for (let i = 0; i < cellStop; i++) {
  for (let j = 0; j < cellStop; j++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.row = i.toString();
    cell.dataset.col = j.toString();
    cell.style['background-color'] = colorArray[i];
    cell.innerHTML = textCellRowCol(i, j);
    if (j % 2) {
      cell.style['opacity'] = 0.33;
    }
    grid.appendChild(cell);
}};
