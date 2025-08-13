const answer = prompt(`Wie viel ist 2 + 2 ?
a 4
b 6
    
Geben Sie den Buchstaben ein, welcher vor der richtigen Antwort steht.`);

console.log(answer);

if (answer === "a" || answer === "A") {
  alert("Richtig!");
  console.log("Richtig!");
} else if (answer === "b" || answer === "B") {
  alert("Falsch!");
  console.log("Falsch!");
} else {
  alert("Ungültige Eingabe!");
  console.log("Falsche Eingabe!");
}
