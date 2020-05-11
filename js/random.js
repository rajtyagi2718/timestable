function assert(condition, message) {
  if (!condition) { 
    throw message || "Assertion failed";
  }
}

function randrange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randbool() {
  return (Math.random() < .5);
}

function randvalue(arr) {
  return arr[randrange(0, arr.length)];
}

function shuffle(arr) {
  let i, j, item;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i+1));
    item = arr[i];
    arr[i] = arr[j];
    arr[j] = item;
  }
}

function sortDec(x, y) {
  return y - x;
}

export {randrange, randbool, randvalue, shuffle, sortDec};
