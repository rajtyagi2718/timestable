const section = function(name, parent) {
  let element = document.createElement("section");
  element.setAttribute("class", name);
  parent.appendChild(element);
  return element;
}

function Area(name, parent) {
  this.element = section(name, parent);
}

function Grid(name, parent, cells) {
  Area.call(this, name, parent);
  this.cells = cells;
}

function Grid1d(name, parent, size) {
  Grid.call(this, name, parent, Array(size));
}

function Grid2d(name, parent, size) {
  Grid.call(this, name, parent, Array(size).fill().map(() => Array(size)));
}

Grid.prototype = Object.create(Area.prototype);
Grid1d.prototype = Object.create(Grid.prototype);
Grid2d.prototype = Object.create(Grid.prototype);

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
  return this.get(args).toggle();
}

Area.prototype.get = function() {
  return this.element;
}

Grid1d.prototype.get = function(args) {
  return this.cells[args[0]-1];
}

Grid2d.prototype.get = function(args) {
  return this.cells[args[0]-1][args[1]-1];
}

export {section, Area, Grid1d, Grid2d};
