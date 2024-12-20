import MazeController from "./MazeController.js";
// DOM Elements
const colsInput = document.querySelector(".maze-cols") as HTMLInputElement;
const rowsInput = document.querySelector(".maze-rows") as HTMLInputElement;
const createMazeBtn = document.querySelector(".create-maze");
const testMazeBtn = document.querySelector(".test-maze");

// Game logic variables to use
const MAX_ROWS = 10;
const MAX_COLS = 16;
const MIN_ROWS = 4;
const MIN_COLS = 4;
let controller: MazeController | undefined;

// Creates a new maze based on the entered dimensions
createMazeBtn?.addEventListener("click", () => {
  if (!colsInput || !rowsInput) return;

  const rows = Number.parseInt(rowsInput.value, 10);
  const cols = Number.parseInt(colsInput.value, 10);

  // Validate dimensionss
  if (
    rows >= MIN_ROWS &&
    rows <= MAX_ROWS &&
    cols >= MIN_COLS &&
    cols <= MAX_COLS
  ) {
    controller = new MazeController(rows, cols);
  } else {
    alert(
      `Please enter valid dimensions \n Minimum: ${MIN_COLS}x${MIN_ROWS} \n Maximum: ${MAX_COLS}x${MAX_ROWS}`
    );
  }
});

// Tests the maze
testMazeBtn?.addEventListener("click", () => {
  if (!controller?.maze) return;

  const message = controller.handleEscapeTest();

  setTimeout(() => {
    alert(message);
  }, 20);
});
