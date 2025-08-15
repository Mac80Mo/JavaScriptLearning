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
let i = 0;

// Frage
const questionDiv = document.getElementById("question");
questionDiv.innerText = questions[i];

// Button
const commitButton = document.getElementById("commit");
commitButton.addEventListener("click", () => {
  const answerInput = document.getElementById("answer");
  const answer = answerInput.value;
  const outputDiv = document.getElementById("output");

  if (answer === correctAnswers[i]) {
    outputDiv.innerText = "Richtig!";
    points = points + pointsForCorrectAnswers[i];
  } else {
    outputDiv.innerText = "Falsch!";
  }

  // Wenn der User die Antwort gegeben hat, erhöhen wir...
  maxPoints += pointsForCorrectAnswers[i];
  i += 1;

  if (i == questions.length) {
    let output = `${outputDiv.innerText}
    Endauswertung:`;

    if (points >= 0) {
      output += `Punkte: ${points}, das war nicht gut...`;
    } else if (points < maxPoints * 0.7) {
      output += `Punkte: ${points}, Das ist Durchschnitt.`;
    } else if (points < maxPoints * 0.85) {
      output += `Punkte: ${points}, Gut!`;
    } else {
      output += `Punkte: ${points}, Sehr gut!`;
    }

    outputDiv.innerText = output;
    questionDiv.innerText = "";
  } else {
    questionDiv.innerText = questions[i];
  }

  answerInput.value = "";
});
