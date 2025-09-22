// Aufgabe

/* Erstelle einen Array mit 5 Studenten
Jeder Student besteht aus 'Name', 'Matrikelnummer', NC */

const students = [
  {
    name: "Alpha",
    id: 1,
    nc: 1,
  },
  {
    name: "Beta",
    id: 2,
    nc: 3,
  },
  {
    name: "Charlie",
    id: 3,
    nc: 2,
  },
  {
    name: "Delta",
    id: 4,
    nc: 3,
  },
  {
    name: "Enigma",
    id: 5,
    nc: 2,
  },
];

/* Erstelle eine Funktion, die mit Hilfe einer Schleife,
jeden Studenten in die Konsole ausgibt und den NC aller Studenten summiert
um einen Durchschnitt zu erhalten (Durchschnitt = Totale Summe / Anzahl) */

function showStudents(array) {
  let totalNc = 0;
  array.forEach((element) => {
    totalNc += element.nc;
    console.log(element);
  });
  const averageNc = totalNc / array.length;
  console.log("Durchschnittlicher NC:", averageNc);
}

showStudents(students);
