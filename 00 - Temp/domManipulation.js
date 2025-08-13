
// Auswählen
const element = document.getElementById('elementId');

const elements1 = document.getElementsByClassName('className');
const elements2 = document.getElementsByTagName('tagName');
const elements3 = document.querySelectorAll('.className');

// Manipulation
element.textContent = 'Neuer Text';
element.innerHTML = '<h1>Neuer Inhalt</h1>';
element.setAttribute('src', 'bild.jpg');
element.classList.add('neueKlasse');
element.classList.remove('alteKlasse');
element.style.color = 'red';

// Neues Element erstellen
const newElement = document.createElement('div');
newElement.textContent = 'Dies ist ein neues Element';
parentElement.appendChild(newElement);
parentElement.insertBefore(newElement, referenceElement);

// Elemente entfernen
element.remove();
parentElement.removeChild(element);

// Event-Handling
function eventHandler(event) {
    // Code für das Event-Handling
    console.log('Event ausgelöst:', event);
}
// Event-Listener hinzufügen
element.addEventListener('click', eventHandler);
