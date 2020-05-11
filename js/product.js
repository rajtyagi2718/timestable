import {section, Area2d} from "./section.js";
import {ProductCell} from "./cell.js";

function Product(parent) {
  let name = "product";
  let size = 11;
  Area2d.call(this, name, parent, size);
  for (let i = 0; i < size; i++) { 
    for (let j = 0; j < size; j++) {
      let element = section(name + "-" + i.toString() + "-" + j.toString(), parent);
      if (i && j) { this.cellArray[i][j] = new Product(element, i, j); }
      else {
        if (i) { this.cellArray[i][j] = new FactorRow(element, i); }
        else if (j) { this.cellArray[i][j] = new FactorCol(element, j); }
        else { this.cellArray[i][j] = new Factor(element, "0", "\u00D7"); }
      }
    }
  };
  CellSection2d.prototype.get(10, 10).addMediumFont();
}

// grid prototype link //

Grid.prototype = Object.create(CellSection2d.prototype);

// grid methods //

Grid.prototype.select = function(i, j) {
  this.get(i, j).select();
}

Grid.prototype.deselect = function(i, j, score) {
  this.get(i, j).deselect(score);
}

Grid.prototype.show = function(i, j) {
  this.get(i, j).show();
}

Grid.prototype.hide = function(i, j) {
  this.get(i, j).hide();
}

Grid.prototype.toggle = function(i, j) {
  this.get(i, j).toggle();
}

Grid.prototype.listen = function(quiz) {
  for (let k = 1; k < 11; k++) {
    this.get(k, 0).element.addEventListener(
      "click", () => {quiz.toggleGrid(k, 0);}, {}
    );
    this.get(0, k).element.addEventListener(
      "click", () => {quiz.toggleGrid(0, k);}, {}
    );
  }
}




