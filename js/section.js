const section = function(name, parent) {
  let element = document.createElement("section");
  element.setAttribute("class", name);
  parent.appendChild(element);
  return element;
}

function Area(cells) {
  this.cells = cells;
}

function Area1d(name, parent, size) {
  Area.call(this, Array(size));
}

function Area2d(name, parent, size) {
  Area.call(this, Array(size).fill().map(() => Array(size)));
}

Area1d.prototype = Object.create(Area.prototype);
Area2d.prototype = Object.create(Area.prototype);

Area.prototype.select = function(...args) {
  this.get(args).select();
}

Area.prototype.deselect = function(...args) {
  this.get(args).deselect();
}

Area.prototype.hide = function(...args) {
  this.get(args).hide();
}

Area.prototype.show = function(...args) {
  this.get(args).show();
}

Area.prototype.toggle = function(...args) {
  this.get(args).toggle();
}

Area1d.prototype.get = function(k) {
  return this.cells[k];
}

Area2d.prototype.get = function(i, j) {
  return this.cells[i][j];
}

export {section, Area1d, Area2d};
