class Maze {
    constructor(size) {
        this.size = size;
        this.grid = this.createEmptyGrid();
        console.log(this.grid);
    }
    createEmptyGrid() {
        const [cols, rows] = this.size; // Destrukturiranje, pretpostavljajući da su redovi prvi, pa kolone
        const grid = [];
        for (let r = 0; r < rows; r++) {
            grid[r] = [];
            for (let c = 0; c < cols; c++) {
                grid[r].push(0); // Inicijalizuje grid sa nulama
            }
        }
        return grid;
    }
}
export default Maze;
