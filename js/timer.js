import {Area} from "./section.js";
import {TimerCell} from "./cell.js";

function Timer(parent) {
  Area.call(this, "timer", parent);
  this.element = new TimerCell(this.element,);
  this.interval = null;
}

Timer.prototype = Object.create(Area.prototype);

Timer.prototype.restart = function(quiz) {
  this.get().show();
  if (quiz.play) {
    this.resume(quiz);
  }
}

Timer.prototype.resume = function(quiz) {
  this.get().select(quiz);
}

Timer.prototype.pause = function() {
  this.get().pause();
}

Timer.prototype.hide = function(quiz) {
  if (quiz.play) {
    this.get().hide();
  }
}

Timer.prototype.stop = function() {
  this.get().deselect();
}

Timer.prototype.toggle = function() {
  this.get().toggle();
}

Timer.prototype.listen = function(quiz) {
  this.get().element.addEventListener(
      "click", () => {quiz.toggleTimer();}, {}
  );
}

export {Timer};
