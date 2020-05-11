import {section, Area1d} from "./section.js";
import {FactorCell} from "./cell.js";

function FactorRow(parent) {
  let size = 10;
  let name = "factor-row";
  Area1d.call(this, name, parent, size);
  for (let k = 1; k <= size; k++) { 
    let index = k.toString();
    let element = section(name + "-" + index, parent);
    this.cells[k-1] = new FactorCell(element, index, index); 
  }
}

FactorRow.prototype = Object.create(Area1d.prototype);

function FactorCol(parent) {
  let size = 10;
  let name = "factor-col";
  Area1d.call(this, name, parent, size);
  let color = (0).toString();
  for (let k = 1; k <= size; k++) { 
    let index = k.toString();
    let element = section(name + "-" + index, parent);
    this.cells[k-1] = new FactorCell(element, color, index); 
  }
}

FactorCol.prototype = Object.create(Area1d.prototype);

export {FactorRow, FactorCol};
