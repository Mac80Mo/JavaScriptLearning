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
const filmTitleInput = document.getElementById("filmTitle");
const filmGenreInput = document.getElementById("filmGenre");
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
    films.sort((a, b) => a.title.localCompare(b.title));

    // Filme anzeigen
    films.forEach((film, index) => {
        
    })
}