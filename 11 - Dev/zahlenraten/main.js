let targetNumber = Math.floor(Math.random() * 100) + 1;

const data = {
  numberOfTries: ko.observable(0),
  message: ko.observable(""),
  checkGuess() {
    this.numberOfTries(this.numberOfTries() + 1);
    let guess = parseInt(this.guess());

    if (guess === targetNumber) {
      this.message(`Korrekt! In ${this.numberOfTries()} Versuchen erraten.`);
      this.numberOfTries(0); // Zähler zurücksetzen
      targetNumber = Math.floor(Math.random() * 100) + 1; // Neue Zufallszahl
      this.guess(""); // Input-Feld leeren
    } else if (guess < targetNumber) {
      this.message("Zahl ist größer!");
    } else {
      this.message("Zahl ist kleiner!");
    }
  },
  guess: ko.observable(""),
};

ko.applyBindings(data);
