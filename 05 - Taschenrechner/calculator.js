// DOM-Elemente
const display = document.getElementById("display");
const number = document.querySelectorAll(".number, .comma, .operator");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");

// Funktion zum Anzeigen der Eingaben auf dem Display
const updateDisplay = (buttonValue) => {
    display.value = buttonValue;
};

// Event-Listener für Klick auf Zahlen, Kommazeichen und Operatoren
number.forEach((numberElement) => {
    numberElement.addEventListener("click", () => {
        updateDisplay(numberElement.innerText);
    });
})