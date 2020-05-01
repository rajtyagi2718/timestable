console.log("script start");

function T(s) {
  this.s = s;
  this.a = 0;
}

T.prototype.f = function() {
  return this.s.g(this);
}

function S() {
  this.a = 1
}

S.prototype.g = function(t) {
  return t.a + this.a;
}

const s = new S();
const t = new T(s);
console.log("this function: ", s.g(t));

console.log("scripted end");
