let fields = [
  null,
  'circle',
  'cross',
  'cross',
  null,
  'circle',
  'circle',
  'cross',
  null,
];

function init() {
  render();
}

function render() {
  // Findet das Element mit der ID 'content' und speichert es in contentDiv
  const contentDiv = document.getElementById('content');

  // Beginnt mit der Erstellung der HTML-Struktur für die Tabelle
  let tableHtml = '<table>'; // tableHtml = "<table>"

  // Äußere Schleife, die jede Zeile der Tabelle durchläuft
  for (let i = 0; i < 3; i++) {
    tableHtml += '<tr>'; // Fügt eine Tabellenzeile hinzu

    // Innere Schleife, die jede Zelle in einer Zeile durchläuft
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j; // Berechnet den Index im fields-Array
      let symbol = ''; // Initialisiert das Symbol als leeren String

      // Überprüft den Wert im fields-Array und setzt das Symbol entsprechend
      if (fields[index] === 'circle') {
        symbol = 'o'; // Setzt das Symbol auf 'o', wenn der Wert 'circle' ist
      } else if (fields[index] === 'cross') {
        symbol = 'x'; // Setzt das Symbol auf 'x', wenn der Wert 'cross' ist
      }

      // Fügt die Zelle mit dem entsprechenden Symbol zur Tabelle hinzu
      tableHtml += `<td>${symbol}</td>`; // Fügt eine Tabellenzelle mit dem Symbol hinzu
    }

    // Schließt die Tabellenzeile
    tableHtml += '</tr>'; // Fügt das schließende Tag für die Zeile hinzu
  }

  // Schließt die Tabelle
  tableHtml += '</table>'; // Fügt das schließende Tag für die Tabelle hinzu

  // Setzt die erstellte HTML-Struktur als Inhalt von contentDiv
  contentDiv.innerHTML = tableHtml; // Setzt tableHtml als innerHTML von contentDiv
}
