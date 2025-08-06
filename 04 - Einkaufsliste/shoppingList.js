// Wähle die DOM-Elemente aus
const addInput = document.getElementById("addItemInput");
const addButton = document.getElementById("addItemButton");
const itemList = document.getElementById("itemList");

// Funktion zum hinzufügen eines Artikel zu unserer ItemList
function addItem() {
    // Erstelle ein neues ListenElement (li)
    const li = document.createElement("li");

    // Füge den Text des Input-Feldes als Inhalt des ListenElement hinzu
    li.innerText = addInput.value;

    // Füge einen Löschen-Button hinzu
    const deleteButton = document.createElement("button");
    deleteButton.id = "deleteItemButton";
    deleteButton.addEventListener("click", () => {
        li.remove();
    });

    // Delete-Icon
    const deleteButtonIcon = document.createElement("span");
    deleteButtonIcon.className = "material-symbols-outlined";
    deleteButtonIcon.textContent = "delete";

    // Icon hinzufügen
    deleteButton.appendChild(deleteButtonIcon);

    // Löschen-Button hinzufügen
    li.appendChild(deleteButton);

    // Füge das Listenelement zur Liste hinzu
    itemList.appendChild(li);

    // Setze das Eingabefeld zurück
    addInput.value = "";
}

// Füge einen EventListener zum Hinzufügen von Artikeln hinzu
addButton.addEventListener("click" , () => {
    addItem();
});

// Füge einen Event-Listener zum Hinzufügen von Artikeln hinzu wenn die Enter-Taste gedrückt wird.
addInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addItem();
    }
    
})