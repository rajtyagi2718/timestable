


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


