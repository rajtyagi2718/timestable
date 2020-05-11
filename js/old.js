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

quiz.toggleController();

