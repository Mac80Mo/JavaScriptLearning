// Dummy Daten anlegen
let dummyFilmList = [
    {
        title: "Titanic",
        genre: "Drama",
        favorite: false
    },
    {
        title: "Herr der Ringe",
        genre: "Action",
        favorite: false
    },
    {
        title: "Castaway",
        genre: "Drama",
        favorite: true
    },
    {
        title: "American Pie",
        genre: "Komödie",
        favorite: false
    }
];

// Elemente aus dem DOM abrufen
// Film hinzufügen
const addFilmLayout = document.getElementById("addFilmLayout");
const addFilmButton = document.getElementById("addFilmButton");
const filmTitleInput = document.getElementById("filmTitel"); // Korrigiert: filmTitel statt filmTitle
const filmGenreInput = document.getElementById("filmGenre"); // Bleibt gleich
const confirmAddFilmButton = document.getElementById("confirmAddFilmButton");

// Film suchen
const searchInput = document.getElementById("searchInput");
const searchIcon = document.getElementById("searchIcon");
const clearSearchButton = document.getElementById("clearSearchButton");

// Filmliste
const filmListElement = document.getElementById("filmList");

// Event-Listener für das Hinzufügen und Suchen von Filmen
addFilmButton.addEventListener("click", toggleAddFilmElements);
confirmAddFilmButton.addEventListener("click", addFilm);
searchInput.addEventListener("input", searchFilms);
clearSearchButton.addEventListener("click", clearSearch);

// Funktion zum Anzeigen/Ausblenden der Elemente des addFilmLayouts
function toggleAddFilmElements() {
    toggleAddFilmButton();
    toggleInputFields();
}

// Funktion zum Aktivieren/Deaktivieren des addFilmButtons
function toggleAddFilmButton() {
    addFilmButton.classList.toggle("disabled");
}

// Funktion zum Anzeigen/Ausblende der Eingabefelder
function toggleInputFields() {
    const layoutStyle = addFilmLayout.style.display;
    
    if (layoutStyle === "none" || layoutStyle === "") {
        addFilmLayout.style.display = "flex";
    } else {
        addFilmLayout.style.display = "none";
    }
}

// Funktion zum Hinzufügen von Filmen
function addFilm() {
    const title = filmTitleInput.value.trim(); // trim streicht Leerzeichen raus!
    const genre = filmGenreInput.value.trim();
    
    // Film hinzufügen
    if (title && genre) {
        const film = {
            title,
            genre,
            favorite: false
        };

        dummyFilmList.push(film);
        displayFilms();

        // Formularfelder leeren
        filmTitleInput.value = "";
        filmGenreInput.value = "";
    }

    // Layout ausblenden
    toggleAddFilmElements();
}

// Funktion zur Anzeige der Filme in der Filmliste
function displayFilms(filteredFilms) {
    // Liste leeren
    filmListElement.innerHTML = "";

    // Filmliste - Quelle auswählen + sortieren
    const films = filteredFilms ?? dummyFilmList;
    films.sort((a, b) => a.title.localeCompare(b.title));

    // Filme anzeigen
    films.forEach((film, index) => {
        // Titel
        const title = document.createElement("span");
        title.classList.add("film-title");
        title.textContent = film.title;

        // Genre
        const genre = document.createElement("span");
        genre.classList.add("film-genre");
        genre.textContent = `(${film.genre})`;

        // Favoriten-Icon
        const favoriteIcon = document.createElement("i");
        const iconClass = film.favorite ? "fa-star" : "fa-star-o";
        favoriteIcon.classList.add("film-icon", "fa", iconClass);
        // toggle
        favoriteIcon.addEventListener("click", () => toggleFavorite(index));

        // Löschen Button + Icon
        const deleteButton = document.createElement("button");
        deleteButton.id = "deleteFilmButton";
        deleteButton.addEventListener("click", () => deleteFilm(index));

        const deleteButtonIcon = document.createElement("i");
        deleteButton.classList.add("fa", "fa-minus");
        deleteButton.appendChild(deleteButtonIcon);

        // Listenelement der Filmliste hinzufügen
        const li = document.createElement("li");
        li.append(title, genre, favoriteIcon, deleteButton);
        filmListElement.appendChild(li);
    });
}

// Funktion zum Aktualisieren des Favoriten-Status
function toggleFavorite(index) {
    dummyFilmList[index].favorite = !dummyFilmList[index].favorite;
    displayFilms();
}

// Funktion zum Löschen eines Films
function deleteFilm(index) {
    dummyFilmList.splice(index, 1);
    displayFilms();
}

// Function zum Suchen eines Films
function searchFilms() {
    // Suchbegriff in Kleinbuchstaben
    const searchTerm = searchInput.value.trim().toLowerCase();

    // gefilterte Filmliste
    let filteredFilms;

    // Abgleich Suchbegriff
    if (searchTerm === "favoriten") {
        filteredFilms = dummyFilmList.filter((film) => film.favorite);
    } else {
        filteredFilms = dummyFilmList.filter((film) => {
            return (film.title.toLowerCase().includes(searchTerm) || film.genre.toLowerCase().includes(searchTerm));
        });
    }

    toggleSearchElements();
    displayFilms(filteredFilms);
}

// Funktion zum Anzeigen/Ausblende der Komponenten der Filmsuche
function toggleSearchElements() {
    const activeSearch = searchInput.value;
    searchIcon.classList.toggle("hidden", activeSearch);
    clearSearchButton.classList.toggle("hidden", !activeSearch);
}

// Funktion zum leeren des Suchfelds
function clearSearch() {
    searchInput.value = "";
    toggleSearchElements();
    displayFilms();
}

// Initiale Filmliste anzeigen
displayFilms();