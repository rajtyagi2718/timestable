// preamble // 
import {randbool, randvalue, sortDec} from "./random.js"; 
import {section} from "./section.js";
import {FactorRow, FactorCol} from "./factor.js";
// import {Product} from "./product.js";

function assert(condition, message) {
  if (!condition) { 
    throw message || "Assertion failed";
  }
}

const body = document.getElementsByTagName("BODY")[0];
 
const app = section("app", body);

const factorRow = new FactorRow(app); 
const delay = 500;
setTimeout(() => {factorRow.select(2);}, delay);
setTimeout(() => {factorRow.deselect(2);}, delay*2);
setTimeout(() => {factorRow.hide(2);}, delay*3);
setTimeout(() => {factorRow.show(2);}, delay*4);
setTimeout(() => {factorRow.select(2);}, delay*5);
setTimeout(() => {factorRow.hide(2);}, delay*6);
setTimeout(() => {factorRow.show(2);}, delay*7);

const factorCol = new FactorCol(app); 
setTimeout(() => {factorCol.select(2);}, delay);
setTimeout(() => {factorCol.deselect(2);}, delay*2);
setTimeout(() => {factorCol.hide(2);}, delay*3);
setTimeout(() => {factorCol.show(2);}, delay*4);
setTimeout(() => {factorCol.select(2);}, delay*5);
setTimeout(() => {factorCol.hide(2);}, delay*6);
setTimeout(() => {factorCol.show(2);}, delay*7);

const operator = section("operator", app);
const controller = section("controller", app);
const timer = section("timer", app);
const keypad = section("keypad--3", app);
const productCell = section("product-1-2", app);
