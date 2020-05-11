import {section, Grid2d} from "./section.js";
import {ProductCell} from "./cell.js";

function Product(parent) {
  let name = "product";
  let size = 10;
  Grid2d.call(this, name, parent, size);
  for (let i = 1; i <= size; i++) { 
    let color = i.toString();
    for (let j = 1; j <= size; j++) {
      let element = section(name + "-" + color + "-" + j.toString(), this.element);
      let text = (i*j).toString(); 
      this.cells[i-1][j-1] = new ProductCell(element, color, text);
    }
  };
  this.get([10, 10]).addMediumFont();
}


Product.prototype = Object.create(Grid2d.prototype);

Product.prototype.deselect = function(grade, ...args) {
  this.get(args).deselect(grade);
}

export {Product};
