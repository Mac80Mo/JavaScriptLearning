// Array für alle 49 Zahlen
const numbers = [];

// Zahlen von 1 bis 49 zum Array hinzufügen
for (let i = 1; i <= 49; i++) {
    numbers.push(i);
}

// Funktion für die Lottoziehung
function runLottery() {
    // Array für die 6 Gewinnzahlen
    const winningNumbers = [];
    // Zufällige Zahlen generieren und dem Array hinzufügen
    while (winningNumbers.length < 6) {
        // Zufälliger Index innerhalb des numbers-Arrays
        const randomIndex = Math.floor(Math.random() * numbers.length);

        // Zufällige Zahl anhand der Index aus numbers-Array auswählen
        const randomNumber = numbers[randomIndex];

        // Prüfen, ob die Zufallszahl bereits in winningNumbers enthalten ist
        if (!winningNumbers.includes(randomNumber)) {

        // Zufällige Zahl dem winningsNumbers-Array hinzufügen
            winningNumbers.push(randomNumber);
        }
    }
    
    // Sortieren der Gewinnzahlen
    winningNumbers.sort((a, b) => a - b);

    // Gewinnzahlen in html-Kacheln anzeigen
    // Lotto-Kacheln auswählen
    const kacheln = document.querySelectorAll(".lotto-zahl");

    // Gewinnzahlen in die Kacheln einfügen
    for (let kachel = 0; kachel < kacheln.length; kachel++) {
        kacheln[kachel].textContent = winningNumbers[kachel]; 
    }

}

// Start-Button auswählen und Click-Listener hinzufügen
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", runLottery);