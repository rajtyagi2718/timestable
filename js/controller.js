import {Area} from "./section.js";
import {ControllerCell} from "./cell.js";

function Controller(parent) {
  Area.call(this, "controller", parent);
  this.element = new ControllerCell(this.element, "0", "=");
}

Controller.prototype = Object.create(Area.prototype);

Controller.prototype.listen = function(quiz) {
  this.get().element.addEventListener(
      "click", () => {quiz.toggleController();}, {}
  );
}

export {Controller};
