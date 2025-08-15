let points = 0;

showQuestion(
  `Wie viel ist 2 + 2 ?
  a 4
  b 6
    
  Geben Sie den Buchstaben ein, welcher vor der richtigen Antwort steht.`,
  "a",
  5
);

showQuestion(
  `Wie viel ist 2 + 4 ?
a 4
b 6
    
Geben Sie den Buchstaben ein, welcher vor der richtigen Antwort steht.`,
  "b",
  5
);

showQuestion(
  `Wie viel ist 2 * 4 ?
a 6
b 8
    
Geben Sie den Buchstaben ein, welcher vor der richtigen Antwort steht.`,
  "b",
  10
);

showQuestion(
  `Wie viel ist 8 * 3 ?
a 16
b 24
    
Geben Sie den Buchstaben ein, welcher vor der richtigen Antwort steht.`,
  "b",
  10
);

showQuestion(
  `Wie viel ist 24 / 2 ?
a 12
b 8
    
Geben Sie den Buchstaben ein, welcher vor der richtigen Antwort steht.`,
  "a",
  10
);

if (points == 0) {
  alert(`Punkte: ${points}, das war nicht gut...`);
} else if (points < 40) {
  alert(`Punkte: ${points}, Das ist Durchschnitt.`);
} else {
  alert(`Punkte: ${points}, Sehr gut!`);
}

function showQuestion(text, correctAnswer, pointsForCorrectAnswer) {
  let answer = prompt(text);

  if (answer === correctAnswer) {
    alert("Richtig!");
    points = points + pointsForCorrectAnswer;
  } else {
    alert("Falsch!");
  }
}
