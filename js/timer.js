import {Area} from "./section.js";
import {TimerCell} from "./cell.js";

function Timer(parent) {
  Area.call(this, "timer", parent);
  this.element = new TimerCell(this.element,);
  this.interval = null;
}

Timer.prototype = Object.create(Area.prototype);

Timer.prototype.restart = function(quiz) {
  this.get().reset();
  if (quiz.play) {
    this.resume(quiz);
  }
}

Timer.prototype.resume = function(quiz) {
  // assert(this.interval == null, "interval already exists. cannot resume timer.")
  this.interval = this.get().start(quiz);
}

Timer.prototype.pause = function() {
  this.get().updateRemain();
  this.stop();
}

Timer.prototype.stop = function() {
  clearInterval(this.interval);
  this.interval = null;
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
