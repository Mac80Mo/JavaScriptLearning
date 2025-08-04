for (let i = 0; i < 10; i++) {
    console.log(i);
}

let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}

for (let i = 0; i < 10; i++) {
    if (i === 3) {
        continue
    }
    if (i === 6) {
        break;
    }
    console.log(i);
}

const number = [2,4,6,8,10];
let sum = 0;

for (let i = 0; i < number.length; i++) {
    sum += number[i];
}
const average = sum / number.length;
console.log(average);
