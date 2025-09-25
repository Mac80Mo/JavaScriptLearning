// Aufgabe 1
/*
function greet(name) {
  console.log(`Hallo, ${name}!`);
}

greet("Marcus");
*/

// Aufgabe 2
/*
function add(a, b) {
  let summe = a + b;
  console.log(summe);
}
add(3, 4);
*/

// Aufgabe 3
/*
function square(a) {
  square = a * a;
  return square;
}
console.log(square(4));
*/

// Aufgabe 4
/*
function isEven(num) {
  let even;
  if (num % 2 == 0) {
    even = true;
  } else {
    even = false;
  }
  return even;
}

console.log(isEven(4));
console.log(isEven(7));
*/

// Aufgabe 5
/*
function countdown(zahl) {
  for (let i = zahl; i >= 0; i--) {
    console.log(i);
  }
}

countdown(5);
*/

// Aufgabe 6
/*
function printArray(array) {
  for (let element = 0; element < array.length; element++) {
    console.log(array[element]);
  }
}

printArray([1, 2, 3, 4]);
*/

// Aufgabe 7
/*
function multiply(a, b = 1) {
  return a * b;
}

console.log(multiply(5, 2));
console.log(multiply(7));
*/

// Aufgabe 8

function filterEvenNumbers(array) {
  const evenArray = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 == 0) {
      evenArray.push(array[i]);
    }
  }
  return evenArray;
}
console.log(filterEvenNumbers([1, 2, 3, 4, 5, 6]));
