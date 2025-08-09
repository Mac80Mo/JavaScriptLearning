// Verzögerter Funktionsaufruf (1x)
// Syntax: setTimeout(callback, delay)
const timeoutId = setTimeout(() => {
    console.log('Timeout abgelaufen');
}, 2000); // delay
// Ende (gibt Speicherplatz frei)
// clearTimeout(timeoutId);


// Funktionsaufruf in festem Zyklus
// Syntax: setIntervall(callback, intervall)
let counter = 0;
const intervalId = setInterval(() => {
    console.log(`Counter: ${counter}`);
    counter++;

    // Timer stoppen nach 5 Ausführungen
    if (counter === 5) {
        clearInterval(intervalId);
    }
}, 1000); // intervall

// Fazit:
// unnötig kurze Intervalle vermeiden
// Timer immer beenden (clear)
// robuster Code (Verzögerungen)
// Achtung: Zeit immer in ms (millisekunden)!