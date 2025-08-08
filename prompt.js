// Öffnet ein Input Fenster:
let name = prompt("Bitte geben Sie Ihren Namen ein:");

// Verarbeitung & Ausgabe
console.log("Hallo, " + name + "!"); // Hallo Stefan


// Prompt + Default-wert
let age = prompt("Bitte geben Sie Ihr Alter ein:", "18");
// Annahme - keine Eingabe
const result = "Ihr Alter ist " + age + " Jahre";
console.log(result); // Ihr Alter ist 18 Jahre


// Prompt für Zahl (Rückgabe-Typ)
let number = prompt("Bitte Zahl eingeben: ");
// Rückgabewert ist immer String
console.log("Typ:", typeof number); // Typ: string


