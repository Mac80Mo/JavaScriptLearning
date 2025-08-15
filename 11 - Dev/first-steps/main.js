let points = 0;
const questions = [
  `Wie viel ist 2 + 2 ?
a 4
b 6
    
Geben Sie den Buchstaben ein, welcher vor der richtigen Antwort steht.`,
  `Wie viel ist 2 + 4 ?
a 4
b 6
    
Geben Sie den Buchstaben ein, welcher vor der richtigen Antwort steht.`,
  `Wie viel ist 2 * 4 ?
a 6
b 8
    
Geben Sie den Buchstaben ein, welcher vor der richtigen Antwort steht.`,
  `Wie viel ist 8 * 3 ?
a 16
b 24
    
Geben Sie den Buchstaben ein, welcher vor der richtigen Antwort steht.`,
  `Wie viel ist 24 / 2 ?
a 12
b 8
    
Geben Sie den Buchstaben ein, welcher vor der richtigen Antwort steht.`,
];

const correctAnswers = ["a", "b", "b", "b", "a"];
const pointsForCorrectAnswers = [5, 5, 10, 10, 10];
let maxPoints = 0;

for (let i = 0; i < questions.length; i++) {
  showQuestion(questions[i], correctAnswers[i], pointsForCorrectAnswers[i]);
  maxPoints = maxPoints + pointsForCorrectAnswers[i];
}

if (points == 0) {
  alert(`Punkte: ${points}, das war nicht gut...`);
} else if (points < maxPoints * 0.7) {
  alert(`Punkte: ${points}, Das ist Durchschnitt.`);
} else if (points < maxPoints * 0.85) {
  alert(`Punkte: ${points}, Gut!`);
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
