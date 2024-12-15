import Maze from "./MazeModel";
import MazeView from "./MazeView";
export class MazeController {
    constructor(rows, cols) {
        this.maze = new Maze(rows, cols);
        this.view = new MazeView();
        this.view.containerElement.classList.remove("hidden"); // Show maze container
        this.render();
    }
    render() {
        this.view.renderGrid(this.maze.grid, this.handleCellClick.bind(this));
    }
    handleCellClick(row, col) {
        if (this.maze.escaped)
            return;
        this.maze.toggleCell(row, col);
    }
    handleEscapeTest() {
        // Check if the maze is already escaped
        if (this.maze.escaped)
            return "Create a new maze!";
        // Try to find the escape path
        const stepsToEscape = this.maze.tryToEscape();
        // No path found
        if (!stepsToEscape)
            return "Cannot escape from the maze";
        // Success ...
        this.view.paintExitPath(stepsToEscape);
        return `You've escaped from the maze by completing the ${stepsToEscape.length} steps`;
    }
}
export default MazeController;
