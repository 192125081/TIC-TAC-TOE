const board = document.getElementById("board");
const status = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let winningIndices = [];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(index) {
  if (gameState[index] !== "" || !gameActive) return;
  gameState[index] = currentPlayer;
  checkWinner();
  renderBoard();
}

function renderBoard() {
  board.innerHTML = "";
  gameState.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    if (cell === "X") cellDiv.classList.add("x");
    if (cell === "O") cellDiv.classList.add("o");
    cellDiv.textContent = cell;
    if (winningIndices.includes(index)) {
      cellDiv.classList.add("winning-cell");
    }
    cellDiv.addEventListener("click", () => handleCellClick(index));
    board.appendChild(cellDiv);
  });
}

function checkWinner() {
  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
      winningIndices = [a, b, c];
      status.textContent = `Player ${currentPlayer} Wins! 🎉`;
      gameActive = false;
      return;
    }
  }
  if (!gameState.includes("")) {
    status.textContent = "It's a Draw! 🤝";
    gameActive = false;
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = `Current Player: ${currentPlayer}`;
}

resetBtn.addEventListener("click", () => {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  winningIndices = [];
  status.textContent = `Current Player: ${currentPlayer}`;
  renderBoard();
});

renderBoard();
