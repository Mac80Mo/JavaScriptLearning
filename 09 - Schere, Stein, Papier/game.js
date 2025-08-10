// Variablen
const CLASS_SELECTED = "selected";

const CLASS_RESULT_WIN = "win";
const CLASS_RESULT_LOSE = "lose";
const CLASS_RESULT_DRAW = "draw";

const CHOICE_ROCK = "Stein";
const CHOICE_PAPER = "Papier";
const CHOICE_SCISSOR = "Schere";

const ID_BUTTON_ROCK = "rock";
const ID_BUTTON_PAPER = "paper";
const ID_BUTTON_SCISSORS = "scissors";

const ID_PLAYER_CHOICE = "player-choice";
const ID_COMPUTER_CHOICE = "computer-choice";

// Funktionen
// Zur Auswahl des Computer-Zugs
function computerChoice() {
    const choices = [CHOICE_ROCK, CHOICE_SCISSOR, CHOICE_PAPER];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Überprüfung des Spielstand und anzeige des Ergebnisses
function checkResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "Unentschieden";
    } else if (
        (playerChoice === CHOICE_ROCK && computerChoice === CHOICE_SCISSOR) || 
        (playerChoice === CHOICE_PAPER && computerChoice === CHOICE_ROCK) ||
        (playerChoice === CHOICE_SCISSOR && computerChoice === CHOICE_PAPER)
    ) {
        return "Spieler gewinnt"
    } else {
        return "Computer gewinnt"
    }
}

// Aktualisierung der Ergebnissanzeige und Hervorhebung des selektierten Button
function updateResult(result, selectedButtonId) {
    // Ergebnisstext anzeigen
    const resultElement = document.getElementById("result");
    resultElement.textContent = result;

    // Entferne zuerst alle ".selected" Styleklassen von allen Buttons
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.classList.remove(CLASS_SELECTED);
    });

    // Hervorheben des geklickten Buttons
    const selectedButton = document.getElementById(selectedButtonId);
    selectedButton.classList.add(CLASS_SELECTED);

    // Timer zum automatischen Entfernen des selektierten Styles
    const timeout = setTimeout(() => {
        selectedButton.classList.remove(CLASS_SELECTED);
        clearTimeout(timeout);
    }, 2000);

    // Ergebnisstext einfärben (bedingte Farbe)
    // Entferne zuerst alle vorherigen Ergebniss-Style-Klassen
    resultElement.classList.remove(CLASS_RESULT_WIN, CLASS_RESULT_LOSE, CLASS_RESULT_DRAW);

    // Füge die richtige Klasse basierend auf dem Spielergebnis hinzu
    if (result === "Spieler gewinnt") {
        resultElement.classList.add(CLASS_RESULT_WIN);
        updatePoints(true);
    } else if (result === "Computer gewinnt") {
        resultElement.classList.add(CLASS_RESULT_LOSE);
        updatePoints(false);
    } else {
        resultElement.classList.add(CLASS_RESULT_DRAW);
    }    
}
// UpdatePoints - Punktestand aktualisieren
function updatePoints(playerWins) {
    const elementId = playerWins ? "player-points" : "computer-points";
    const pointsElement = document.getElementById(elementId);
    const currentPoints = Number(pointsElement.innerText);
    pointsElement.textContent = currentPoints + 1;
}

// Event-Listener für die Spielbuttons
function playerAction(playerChoice) {
    const computer = computerChoice();
    const result = checkResult(playerChoice, computer);

    // Aktualisiere die Spieler und Computer-Auswahl
    document.querySelector('.player-choice').textContent = playerChoice;
    document.querySelector('.computer-choice').textContent = computer;

    // Bestimme ID des geklickten Buttons
    let buttonId;

    switch(playerChoice) {
        case CHOICE_SCISSOR:
            buttonId = ID_BUTTON_SCISSORS;
            break;
        case CHOICE_ROCK:
            buttonId = ID_BUTTON_ROCK;
            break;
        default:
            buttonId = ID_BUTTON_PAPER;
            break;
    }

    // Aktualisiere das Ergebnis
    updateResult(result, buttonId);
}
// BUTTON Stein
document.getElementById(ID_BUTTON_ROCK).addEventListener("click", function() {
    playerAction(CHOICE_ROCK);
});
// BUTTON Schere
document.getElementById(ID_BUTTON_SCISSORS).addEventListener("click", function() {
    playerAction(CHOICE_SCISSOR);
});
// BUTTON Papier
document.getElementById(ID_BUTTON_PAPER).addEventListener("click", function() {
    playerAction(CHOICE_PAPER);
});