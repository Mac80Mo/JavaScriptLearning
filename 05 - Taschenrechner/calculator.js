// DOM-Elemente
const display = document.getElementById("display");
const number = document.querySelectorAll(".number, .comma, .operator");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");

// Funktion zum Anzeigen der Eingaben auf dem Display
const updateDisplay = (buttonValue) => {
    display.value += buttonValue;
};

// Event-Listener für Klick auf Zahlen, Kommazeichen und Operatoren
number.forEach((numberElement) => {
    numberElement.addEventListener("click", () => {
        updateDisplay(numberElement.innerText);
    });
})

// Funktion zum Berechnen des Ausdrucks im Display
const calculateExpression = () => {
    // Diese Variante oist nicht besonders sicher || suche Parse )
    display.value = eval(display.value);
};

// Event-LIstener für klicks auf Gleichheitszeichen (=)
equals.addEventListener("click", calculateExpression);

// Funktion zum Löschen des Display-Inhalts
const clearDisplay = () => {
    display.value = "";
};

// Event-Listener für Klick auf Clear-Button (C)
clear.addEventListener("click", clearDisplay);


// BONUS - Event-Listener für Tastatureingaben
document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (key === "Enter") {
        calculateExpression();
    } else if (key === "Escape") {
        clearDisplay(); // RegEx
    } else if (/^[0-9+\-*/.]$/.test(key)) {
        updateDisplay(key);
    }
});