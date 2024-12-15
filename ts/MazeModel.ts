interface MazeInterface {
  rows: number;
  cols: number;
  grid: Array<number[]>;
  escaped: boolean;

  createGrid: () => Array<number[]>;
  toggleCell: (row: number, col: number) => void;
}

type QueueItem = [number, number, [number, number][]];
type Queue = QueueItem[];

class Maze implements MazeInterface {
  rows: number;
  cols: number;
  grid: Array<number[]>;
  escaped = false;

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
    this.grid = this.createGrid();
  }

  // Creates a grid with all cells set to 0 (empty space)
  createGrid(): Array<number[]> {
    const grid: Array<number[]> = [];

    for (let r = 0; r < this.rows; r++) {
      grid[r] = [];

      for (let c = 0; c < this.cols; c++) {
        grid[r].push(0);
      }
    }

    return grid;
  }

  // Toggles the state of a cell between 0 (empty) and 1 (blocked)
  toggleCell(row: number, col: number) {
    console.log(`Before update ${this.grid[row][col]}`);
    this.grid[row][col] = this.grid[row][col] === 1 ? 0 : 1; // Toggle cell value
  }

  // Tries to find a path to escape the maze
  tryToEscape() {
    // If we cannot move from the first position (0,0)
    if (this.grid[0][1] !== 0 && this.grid[1][0] !== 0) return null;

    const rows = this.grid.length;
    const cols = this.grid[0].length;

    const directions = [
      [1, 0], // Move right
      [0, 1], // Move down
      [0, -1], // Move left
      [-1, 0], // Move up
    ];

    const visited = new Set(); // Keeps track of visited cells to avoid cycles
    const queue: Queue = [[0, 0, []]]; // X, Y, steps

    while (queue.length) {
      const [x, y, steps] = queue.shift() as QueueItem;

      // If we reach the bottom-right corner, we have escaped
      if (x === rows - 1 && y === cols - 1) {
        this.escaped = true;
        return steps;
      }

      // Explore all possible directions
      for (const [dx, dy] of directions) {
        const nx = dx + x;
        const ny = dy + y;

        const visitedKey = `${nx},${ny}`; // Unique key for visited cells

        // Check if the new position is within bounds, not visited, and not blocked (0 = free)
        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < rows &&
          ny < cols &&
          this.grid[nx][ny] === 0 &&
          !visited.has(visitedKey)
        ) {
          queue.push([nx, ny, [...steps, [nx, ny]]]);
          visited.add(visitedKey);
        }
      }
    }

    // If no path is found
    return null;
  }
}

export default Maze;
