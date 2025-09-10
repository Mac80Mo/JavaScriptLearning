const startMessage = "Bitte gib eine Zahl ein!";

function numberGuessingGame() {
  return {
    tragetNumber: generateRandomNumber(),
    tries: 0,
    guess: undefined,
    message: startMessage,
    checkGuess() {
      this.tries++;
      const userGuess = parseInt(this.guess);

      if (isNaN(userGuess)) {
        return;
      }

      if (userGuess < this.tragetNumber) {
        this.message = "Zu niedrig!";
      } else if (userGuess > this.tragetNumber) {
        this.message = "Zu hoch!";
      } else {
        this.message = "Korrekt!";
      }
    },

    resetGame() {
      this.message = startMessage;
      this.targetNumber = generateRandomNumber();
      this.tries = 0;
      this.guess = undefined;
    },
  };
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}
