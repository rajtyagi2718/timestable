area //

Operator.prototype = Object.create(Area.prototype);
Controller.prototype = Object.create(Area.prototype);
Timer.prototype = Object.create(Area.prototype);
Product.prototype = Object.create(Area.prototype);


// control //

function Control(parent) {
  CellSection0d.call(this, parent, "control");
  let element = document.createElement("div");
  this.element.appendChild(element);
  this.cellArray[0] = new Controller(element);
}

Control.prototype = Object.create(CellSection.prototype);

Control.prototype.select = function() {
  this.get().select();
}

Control.prototype.deselect = function() {
  this.get().deselect();
}

Control.prototype.listen = function(quiz) {
  this.get().element.addEventListener(
      "click", () => {quiz.toggleControl();}, {}
  );
}


// keypad constructor // 

function Keypad(parent) {
  CellSection1d.call(this, parent, "keypad", 5); 
  for (let k = 0; k < 5; k++) {
    let element = document.createElement("div");
    this.element.appendChild(element);
    this.cellArray[k] = new Pad(element);
  }

  this.textSet = new Set();
  this.textArray = Array();
  this.textGrid = Array(11).fill().map(()  => Array(11));
  for (let i = 1; i < 11; i++) {
    for (let j = 1; j < 11; j++) {
      this.textGrid[i][j] = i*j;
    }
  }
}

// keypad link //

Keypad.prototype = Object.create(CellSection.prototype);

// keypad methods //

Keypad.prototype.select = function(k, i) {
  this.get(k).select(i);
}

Keypad.prototype.deselect = function(k, i) {
  this.get(k).deselect(i);
}

Keypad.prototype.set = function(i, j) {
  let answer = this.textGrid[i][j];
  this.textSet.add(answer);
  while (this.textSet.size < 4) {
    if (randbool()) { 
      this.textSet.add(this.textGrid[i][randrange(1, 11)]);
    }
    else {
      this.textSet.add(this.textGrid[j][randrange(1, 11)]);
    }
  }
  while (this.textSet.size < 5) {
    this.textSet.add(this.textGrid[randrange(1, 11)][randrange(1, 11)]);
  }

  this.textSet.forEach(v => this.textArray.push(v));
  this.textSet.clear();
  this.textArray.sort(sortDec);

  for (let k = 0; k < 5; k++) {
    let text = this.textArray.pop();
    let isCorrect = (text == answer);
    this.get(k).set(text, isCorrect);
  }
}
    
Keypad.prototype.listen = function(quiz) {
  for (let k = 0; k < 5; k++) {
    this.get(k).element.addEventListener(
      "click", function() {quiz.toggleKeypad(k);}, {}
    );
  }
}

Keypad.prototype.clear = function(i) {
  for (let k = 0; k < 5; k++) {
    this.get(k).deselect(i);
  }
}  

Keypad.prototype.isCorrect = function(k) {
  return this.get(k).isCorrect;
}


// product score //

function ProductScore() {
  this.scoreArray = Array(11).fill().map(() => Array(11).fill(0));
}
  
ProductScore.prototype.get = function(i, j) {
  return this.scoreArray[i][j];
}

ProductScore.prototype.increment = function(i, j) {
  this.scoreArray[i][j] += 1;
}

ProductScore.prototype.decrement = function(i, j) {
  this.scoreArray[i][j] += 1;
}

ProductScore.prototype.clear = function(i, j) {
  this.scoreArray[i][j] = 0;
}


// time //

function Time(parent) {
  CellSection0d.call(this, parent, "time");
  let element = document.createElement("div");
  this.element.appendChild(element);
  this.cellArray[0] = new Timer(element);
  this.interval = null;
}

Time.prototype = Object.create(CellSection.prototype);

Time.prototype.restart = function(quiz) {
  this.get().reset();
  if (quiz.play) {
    this.resume(quiz);
  }
}

Time.prototype.resume = function(quiz) {
  assert(this.interval == null, "interval already exists. cannot resume timer.")
  this.interval = this.get().start(quiz);
}

Time.prototype.pause = function() {
  this.get().updateRemain();
  this.stop();
}

Time.prototype.stop = function() {
  clearInterval(this.interval);
  this.interval = null;
}

Time.prototype.toggle = function() {
  this.get().toggle();
}

Time.prototype.listen = function(quiz) {
  this.get().element.addEventListener(
      "click", () => {quiz.toggleTime();}, {}
  );
}


// quiz constructor //

function Quiz(grid, control, keypad, time, productScore) {
  this.grid = grid;
  this.grid.listen(this);
  this.control = control;
  this.control.listen(this);
  this.keypad = keypad;
  this.keypad.listen(this);
  this.time = time;
  this.time.listen(this);
  this.productScore = productScore;
  this.row = 0;
  this.col = 0;
  this.questionAnswered = true;
  this.numQuestions = 0;
  this.rowArr = Array();
  this.colArr = Array();
  this.rowSet = new Set();
  this.colSet = new Set();
  for (let k = 1; k < 11; k++) {
    this.rowSet.add(k);
    this.colSet.add(k);
  }
  this.play = false;
}

// quiz methods //

// quiz query methods //

Quiz.prototype.selectQuestion = function() {
  this.row = randvalue(this.rowArr);
  this.col = randvalue(this.colArr);
}
  
Quiz.prototype.askQuestion = function() {
  console.log("what is", this.row, "x", this.col, "?");
  let delay = 1000;
  this.grid.select(this.row, 0);
  setTimeout(() => {this.grid.select(0, 0);}, delay);
  setTimeout(() => {this.grid.select(0, this.col);}, delay*2);
  setTimeout(() => {this.grid.select(this.row, this.col);}, delay*3);
  setTimeout(() => {this.keypad.set(this.row, this.col);
                    this.time.restart(this);
                    this.questionAnswered = false;}, delay*4);
}

Quiz.prototype.checkAnswer = function(k) {
  if (this.questionAnswered) {
    return;
  }
  this.keypad.select(k, this.row); 
  if (this.keypad.isCorrect(k)) {
    this.productScore.increment(this.row, this.col);
    console.log("correct!");
    this.showAnswer(this.row, this.col);
  }
  else {
    console.log("incorrect.");
  }
} 

Quiz.prototype.showAnswer = function() {
  if (this.questionAnswered) {
    return;
  }
  this.questionAnswered = true;
  this.time.stop();
  this.grid.show(this.row, this.col);
  console.log("answer:", this.keypad.textGrid[this.row][this.col]);
  let delay = 2000;
  setTimeout(() => {this.clearQuestion();}, delay);
}

Quiz.prototype.clearQuestion = function() {
  let delay = 300;
  this.grid.deselect(this.row, this.col, this.productScore.get(this.row, this.col));
  setTimeout(() => {this.grid.deselect(0, this.col);}, delay);
  setTimeout(() => {this.grid.deselect(0, 0);},        delay*1);
  setTimeout(() => {this.grid.deselect(this.row, 0);}, delay*2);
  setTimeout(() => {this.keypad.clear(this.row);},     delay*2);
  setTimeout(() => {this.query();},                delay*4);
}

Quiz.prototype.query = function() {
  if (this.play && this.numQuestions) {
    this.numQuestions -= 1;
    this.selectQuestion();
    this.askQuestion();
  }
}

Quiz.prototype.start = function(numQuestions=-1) {
  if (numQuestions) {
    this.numQuestions = numQuestions;
  }
  this.rowArr.length = 0;
  this.rowSet.forEach(v => this.rowArr.push(v));
  this.colArr.length = 0;
  this.colSet.forEach(v => this.colArr.push(v));
  if (this.rowArr.length && this.colArr.length) {
    this.query();
  }
}

// quiz toggle methods //

Quiz.prototype.toggleGrid = function(i, j) {
  if (this.play) {
    return;
  }
  this.grid.toggle(i, j);
  if (i == 0 && j == 0) {
    // this.multiply = false;
  }
  else if (j == 0) {
    if (this.rowSet.has(i)) {
      this.rowSet.delete(i);
    }
    else {
      this.rowSet.add(i);
    }
  }
  else {
    if (this.colSet.has(j)) {
      this.colSet.delete(j);
    }
    else {
      this.colSet.add(j);
    }
  }
}

Quiz.prototype.toggleControl = function() {
  this.play = !this.play;
  if (this.play) {
    this.control.select();
    if (!this.questionAnswered) {
      this.time.resume(this);
    }
    else { 
      this.start();
    }
  }
  else {
    this.control.deselect();
    this.time.pause();
  }
}

Quiz.prototype.toggleKeypad = function(k) {
  if (this.play) {
    this.checkAnswer(k);
  }
}

Quiz.prototype.toggleTime = function() {
  if (this.play) {
    this.showAnswer();
  }
  else {
    this.time.toggle();
  }
}


// main //

const element1 = document.createElement("section");
element1.setAttribute("class", "time");
app.appendChild(element1);

const grid = new Grid(app);

const control = new Control(app);

const keypad = new Keypad(app);

const productScore = new ProductScore();

const time = new Time(app);

const quiz = new Quiz(grid, control, keypad, time, productScore);

quiz.toggleControl();

