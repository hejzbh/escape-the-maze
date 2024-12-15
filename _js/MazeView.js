export class MazeView {
    constructor() {
        this.mazeElement = document.querySelector(".maze-grid");
        this.containerElement = document.querySelector(".maze-container");
    }
    // Renders the maze grid and attaches event listeners to cells
    renderGrid(grid, onCellClick) {
        const [rows, cols] = [grid.length, grid[0].length];
        this.mazeElement.innerHTML = "";
        this.mazeElement.style.display = "grid";
        this.mazeElement.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        this.mazeElement.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        // Iterate over all grid cells and create their DOM elements
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const cellElement = document.createElement("div");
                cellElement.classList.add("cell");
                // Store grid coordinates and values in data attributes for later use (we are using dataset for painting cells later)
                cellElement.dataset.value = grid[row][col].toString();
                cellElement.dataset.row = row.toString();
                cellElement.dataset.col = col.toString();
                // Highlight start and end
                const isStartPosition = row === 0 && col === 0;
                const isFinishPosition = row === rows - 1 && col === cols - 1;
                if (isStartPosition || isFinishPosition) {
                    const img = document.createElement("img");
                    img.classList.add("position-img");
                    img.src = isStartPosition
                        ? "https://www.freeiconspng.com/thumbs/pin-png/pin-png-24.png"
                        : "https://static.vecteezy.com/system/resources/thumbnails/013/796/134/small_2x/comic-lettering-finish-comic-speech-bubble-with-emotional-text-finish-bright-dynamic-cartoon-illustration-in-retro-pop-art-style-comic-text-sound-effects-png.png";
                    cellElement.appendChild(img);
                    cellElement.style.padding = "0";
                }
                else {
                    // Add click event to toggle cell state between free (transparent) and blocked (red)
                    cellElement.addEventListener("click", () => {
                        onCellClick(row, col);
                        cellElement.style.backgroundColor =
                            grid[row][col] === 0 ? "transparent" : "red";
                    });
                }
                // Append the cell element to the grid container
                this.mazeElement.appendChild(cellElement);
            }
        }
    }
    // Paints the exit path by changing the background color of the cells in the path
    paintExitPath(steps) {
        for (let [row, col] of steps) {
            const cellElement = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            if (!cellElement)
                continue;
            cellElement.style.backgroundColor = "greenyellow"; // Highlight exit path
        }
    }
}
export default MazeView;
