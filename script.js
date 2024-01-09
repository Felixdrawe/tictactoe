let fields = [null, null, null, null, null, null, null, null, null];

let gameActive = true; // Neue Variable, um den Spielstatus zu verfolgen

function init() {
  gameActive = true; // Spiel ist aktiv, wenn init aufgerufen wird
  render();
}

function render() {
  const contentDiv = document.getElementById('content');
  let tableHtml = '<table>';

  for (let i = 0; i < 3; i++) {
    tableHtml += '<tr>';
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      let symbol =
        fields[index] === 'circle'
          ? createAnimatedCircle()
          : fields[index] === 'cross'
          ? createAnimatedCross()
          : '';
      tableHtml += `<td onclick="handleClick(${index}, this)">${symbol}</td>`;
    }
    tableHtml += '</tr>';
  }

  tableHtml += '</table>';
  contentDiv.innerHTML = tableHtml;
}

function handleClick(index, tdElement) {
  if (fields[index] === null && gameActive) {
    fields[index] =
      fields.filter((x) => x).length % 2 === 0 ? 'circle' : 'cross';
    tdElement.innerHTML =
      fields[index] === 'circle'
        ? createAnimatedCircle()
        : createAnimatedCross();
    tdElement.removeAttribute('onclick'); // Entfernt die onclick-Funktion
    if (checkWinner(fields[index])) {
      document.getElementById('winner').innerText = `${capitalizeFirstLetter(
        fields[index]
      )} hat gewonnen!`;
      gameActive = false; // Spiel beenden
    } else if (fields.every((field) => field !== null)) {
      document.getElementById('winner').innerText = 'Unentschieden!';
      gameActive = false; // Spiel beenden
    }
  } else if (fields.every((field) => field !== null)) {
    document.getElementById('winner').innerText = 'Unentschieden!';
    gameActive = false; // Spiel beenden
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function checkWinner(player) {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Zeilen
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Spalten
    [0, 4, 8],
    [2, 4, 6], // Diagonalen
  ];

  for (let condition of winConditions) {
    if (condition.every((index) => fields[index] === player)) {
      drawWinningLine(condition);
      return true;
    }
  }
  return false;
}

function drawWinningLine(winCondition) {
  // Remove existing line if present
  const existingLine = document.getElementById('winning-line');
  if (existingLine) {
    existingLine.remove();
  }

  // Identify the start and end points for the winning line
  const startCell = document.querySelector(
    `table tr:nth-child(${Math.floor(winCondition[0] / 3) + 1}) td:nth-child(${
      (winCondition[0] % 3) + 1
    })`
  );
  const endCell = document.querySelector(
    `table tr:nth-child(${Math.floor(winCondition[2] / 3) + 1}) td:nth-child(${
      (winCondition[2] % 3) + 1
    })`
  );

  // Get positions of the start and end cells
  const startRect = startCell.getBoundingClientRect();
  const endRect = endCell.getBoundingClientRect();
  const gameBoard = document.querySelector('#content');
  const boardRect = gameBoard.getBoundingClientRect();

  // Create SVG line element
  const svgLine = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'line'
  );
  svgLine.setAttribute(
    'x1',
    startRect.left + startRect.width / 2 - boardRect.left
  );
  svgLine.setAttribute(
    'y1',
    startRect.top + startRect.height / 2 - boardRect.top
  );
  svgLine.setAttribute('x2', endRect.left + endRect.width / 2 - boardRect.left);
  svgLine.setAttribute('y2', endRect.top + endRect.height / 2 - boardRect.top);
  svgLine.style.stroke = 'white'; // Line color
  svgLine.style.strokeWidth = '8'; // Line width

  // Add SVG to the document
  const svgElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );
  svgElement.id = 'winning-line'; // Assign an ID to the SVG element
  svgElement.style.position = 'absolute';
  svgElement.style.top = `${boardRect.top}px`;
  svgElement.style.left = `${boardRect.left}px`;
  svgElement.style.width = `${boardRect.width}px`;
  svgElement.style.height = `${boardRect.height}px`;
  svgElement.style.pointerEvents = 'none'; // Allows clicking through the SVG
  svgElement.appendChild(svgLine);

  document.body.appendChild(svgElement);
}

function resetGame() {
  fields = Array(9).fill(null);
  gameActive = true;
  document.getElementById('winner').innerText = '';
  render();

  // Remove the SVG line if it exists
  const winningLine = document.getElementById('winning-line');
  if (winningLine) {
    winningLine.remove();
  }
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
