import {section, Grid1d} from "./section.js";
import {FactorCell} from "./cell.js";

function FactorRow(parent) {
  let name = "factor-row";
  let size = 10;
  Grid1d.call(this, name, parent, size);
  for (let k = 1; k <= size; k++) { 
    let index = k.toString();
    let element = section(name + "-" + index, this.element);
    this.cells[k-1] = new FactorCell(element, index, index); 
  }
}

function FactorCol(parent) {
  let name = "factor-col";
  let size = 10;
  Grid1d.call(this, name, parent, size);
  let color = (0).toString();
  for (let k = 1; k <= size; k++) { 
    let index = k.toString();
    let element = section(name + "-" + index, this.element);
    this.cells[k-1] = new FactorCell(element, color, index); 
  }
}

FactorRow.prototype = Object.create(Grid1d.prototype);
FactorCol.prototype = Object.create(Grid1d.prototype);

FactorRow.prototype.listen = function(quiz) {
  for (let k = 1; k <= 10; k++) {
    this.get([k]).element.addEventListener(
      "click", () => {quiz.toggleFactorRow(k);}, {}
    );
  }
}

FactorCol.prototype.listen = function(quiz) {
  for (let k = 1; k <= 10; k++) {
    this.get([k]).element.addEventListener(
      "click", () => {quiz.toggleFactorCol(k);}, {}
    );
  }
}

export {FactorRow, FactorCol};
