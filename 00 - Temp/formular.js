const form = document.getElementById("meinFormular");
form.addEventListener("submit", function(event) {
    // Formular nicht abschicken, um die Seite nicht neu zu laden
    event.preventDefault();
    // Holen wir uns die Daten aus dem Formular
    const benutzername = document.getElementById("benutzername").value; // Mit .value bekommen wir den Wert des Feldes
    const passwort = document.getElementById("passwort").value;
    // Daten validieren - Wenn eines der beiden Felder leer ist... Fehlermeldung!
    if (benutzername === "" || passwort === "") {
        alert("Bitte füllen Sie alle Felder aus.");
        event.preventDefault(); // s.o. z. 3
    } else {
        console.log("alles gut!")
    }
})