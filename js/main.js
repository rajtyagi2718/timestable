import {randbool, randvalue, sortDec} from "./random.js"; 
import {section} from "./section.js";
import {Operator} from "./operator.js";
import {FactorRow, FactorCol} from "./factor.js";
import {Product} from "./product.js";
import {Keypad} from "./keypad.js";
import {Controller} from "./controller.js";
import {Timer} from "./timer.js";
import {Grader} from "./grader.js";
import {Quiz} from "./quiz.js";

const body = document.getElementsByTagName("BODY")[0];
const app = section("app", body);
const operator = new Operator(app);
const factorRow = new FactorRow(app); 
const factorCol = new FactorCol(app); 
const product = new Product(app); 
const keypad = new Keypad(app); 
const controller = new Controller(app);
const timer = new Timer(app);
const grader = new Grader();
const quiz = new Quiz(operator, factorRow, factorCol, product, keypad,
                      controller, timer, grader);

quiz.toggleController();
