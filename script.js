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
        symbol = createAnimatedCircle(); // Setzt das Symbol auf einen Kreis, wenn der Wert 'circle' ist
      } else if (fields[index] === 'cross') {
        symbol = createAnimatedCross(); // Setzt das Symbol auf 'x', wenn der Wert 'cross' ist
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

function createAnimatedCircle() {
    // Berechnet den Umfang des Kreises
    const circumference = 2 * Math.PI * 30; // 2 * π * Radius
  
    return `
      <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
        <circle cx="35" cy="35" r="30" stroke="#00B0EF" stroke-width="10"
          stroke-dasharray="${circumference}"
          stroke-dashoffset="${circumference}"
          stroke-linecap="round" fill="none" transform="rotate(-90, 35, 35)">
          <animate attributeName="stroke-dashoffset" dur="1s" from="${circumference}" to="0" fill="freeze"
            calcMode="spline" keySplines="0.25 0.1 0.25 1" keyTimes="0;1" />
        </circle>
      </svg>
    `;
  }


  function createAnimatedCross() {
    const lineLength = Math.sqrt(50 * 50 + 50 * 50); // Länge einer Linie des Kreuzes
  
    return `
      <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
        <line x1="35" y1="35" x2="60" y2="60" stroke="#FFC000" stroke-width="10" stroke-linecap="round">
          <animate attributeName="stroke-dasharray" from="0, ${lineLength}" to="${lineLength}, 0" dur="1s" fill="freeze"/>
        </line>
        <line x1="35" y1="35" x2="10" y2="60" stroke="#FFC000" stroke-width="10" stroke-linecap="round">
          <animate attributeName="stroke-dasharray" from="0, ${lineLength}" to="${lineLength}, 0" dur="1s" fill="freeze"/>
        </line>
        <line x1="35" y1="35" x2="60" y2="10" stroke="#FFC000" stroke-width="10" stroke-linecap="round">
          <animate attributeName="stroke-dasharray" from="0, ${lineLength}" to="${lineLength}, 0" dur="1s" fill="freeze"/>
        </line>
        <line x1="35" y1="35" x2="10" y2="10" stroke="#FFC000" stroke-width="10" stroke-linecap="round">
          <animate attributeName="stroke-dasharray" from="0, ${lineLength}" to="${lineLength}, 0" dur="1s" fill="freeze"/>
        </line>
      </svg>
    `;
  }
  
  
  
  
  