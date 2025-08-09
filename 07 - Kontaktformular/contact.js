// Elemente des Formular und Fehlermeldung
const contactForm = document.getElementById("contactForm");

const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const messageField = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

// Event-Listener für das Formular-Absenden hinzufügen
contactForm.addEventListener("submit", function(event) {
    // Verhindert das normale Absenden des Formulars
    event.preventDefault();

    // Werte der Formularfelder abrufen
    const name = nameField.value;
    const email = emailField.value;
    const message = messageField.value;

    // Fehlermeldung zurücksetzen
    resetError(); // Funktion müssen wir noch schreiben...

    // Validierung für den Namen
    if (!isValidName(name)) {
        displayError(nameError, "Bitte geben Sie einen gültigen Namen ein.")
        // Hervorheben des Fehlerhaften Feldes
        nameField.classList.add("error-input");
        return;
    }

    // Validierung für die E-Mail-Adresse
    if (!isValidEmail(email)) {
        displayError(emailError, "Bitte geben Sie eine gültige E-Mail Adresse ein.")
        // Hervorheben des fehlerhaften Feldes
        emailField.classList.add("error-input");
        return;
    }

    // Erfolgsmeldung anzeigen und Formular zurücksetzen
    alert("Vielen Dank für Ihre Nachricht");
    contactForm.reset();
});

// Funktion zum zurücksetzen der Fehlermeldung und der roten Rahmen
function resetError() {
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    nameField.classList.remove("error-input");
    emailField.classList.remove("error-input");
    messageField.classList.remove("error-input");
}

// Funktion zum Anzeigen der Fehlermeldung
function displayError(errorElement, errorMessage) {
    errorElement.textContent = errorMessage;
}

// Funktion zur Überprüfung/Validierung des Namens
function isValidName(name) {
    return /^[A-Za-z\s]{2,}$/.test(name);
}

// Prüfung der E-Mail
function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email)
}

// Funktion zum Zurücksetzen des Formulars
function resetForm() {
    contactForm.reset();
    resetError();
}