console.log("Das Array:");
const numbers = ["a", "b", "c"];
console.log(numbers);

console.log("Push:");
let count = numbers.push("d");
console.log(count);
console.log(numbers);

console.log("Unshift:");
count = numbers.unshift("z");
console.log(count);
console.log(numbers);

console.log("Pop:");
const last = numbers.pop();
console.log(last);
console.log(numbers);

console.log("Shift:");
const first = numbers.shift();
console.log(first);
console.log(numbers);

console.log("Length:");
console.log(numbers.length);

console.log("Includes:");
console.log(numbers.includes("a"));

const zahlen = [2, 1, 5, 100];
console.log("Array Zahlen:")
zahlen.sort();
console.log("Sort:");
console.log(zahlen);
zahlen.sort((a, b) => a - b);
console.log(zahlen);