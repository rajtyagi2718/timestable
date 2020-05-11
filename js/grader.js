function Grader() {
  this.grades = Array(11).fill().map(() => Array(11).fill(0));
  this.answers = Array(11).fill().map(()  => Array(11));
  for (let i = 1; i < 11; i++) {
    for (let j = 1; j < 11; j++) {
      this.answers[i][j] = i*j;
    }
  }
}
  
Grader.prototype.getGrade = function(i, j) {
  return Math.min(this.grades[i][j], 3);
}

Grader.prototype.getAnswer = function(i, j) {
  return this.answers[i][j];
}

Grader.prototype.increment = function(i, j) {
  this.grades[i][j] += 1;
}

Grader.prototype.decrement = function(i, j) {
  this.grades[i][j] += 1;
}

Grader.prototype.clear = function(i, j) {
  this.grades[i][j] = 0;
}

export {Grader};
