let points = 0;
let answer = prompt(`Wie viel ist 2 + 2 ?
a 4
b 6
    
Geben Sie den Buchstaben ein, welcher vor der richtigen Antwort steht.`);

if (answer === "a" || answer === "A") {
  alert("Richtig!");
  points = points + 10;
} else if (answer === "b" || answer === "B") {
  alert("Falsch!");
} else {
  alert("Ungültige Eingabe!");
  console.log("Falsche Eingabe!");
}

answer = prompt(`Wie viel ist 2 + 4 ?
a 4
b 6
    
Geben Sie den Buchstaben ein, welcher vor der richtigen Antwort steht.`);

if (answer === "a" || answer === "A") {
  alert("Falsch!");
} else if (answer === "b" || answer === "B") {
  alert("Richtig!");
  points = points + 10;
} else {
  alert("Ungültige Eingabe!");
  console.log("Falsche Eingabe!");
}

answer = prompt(`Wie viel ist 2 * 4 ?
a 6
b 8
    
Geben Sie den Buchstaben ein, welcher vor der richtigen Antwort steht.`);

if (answer === "a" || answer === "A") {
  alert("Falsch!");
} else if (answer === "b" || answer === "B") {
  alert("Richtig!");
  points = points + 10;
} else {
  alert("Ungültige Eingabe!");
  console.log("Falsche Eingabe!");
}

if (points == 0) {
  alert(`Punkte: ${points}, das war nicht gut...`);
} else if (points < 30) {
  alert(`Punkte: ${points}, Das ist Durchschnitt.`);
} else {
  alert(`Punkte: ${points}, Sehr gut!`);
}
