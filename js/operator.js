import {Area} from "./section.js";
import {OperatorCell} from "./cell.js";

function Operator(parent) {
  Area.call(this, "operator", parent);
  this.element = new OperatorCell(this.element, "0", "\u00D7|\u00F7");
}

Operator.prototype = Object.create(Area.prototype);

Operator.prototype.deselect = function(quiz) {
  if (quiz.play) {
    this.get().deselect();
  }
  else {
    this.get().pause();
  }
}

Operator.prototype.listen = function(quiz) {
  this.get().element.addEventListener(
      "click", () => {quiz.toggleOperator();}, {}
  );
}

export {Operator};
