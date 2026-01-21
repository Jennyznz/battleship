import './styles.css';

function UISetup(game) {
    const gridOne = document.querySelector('.grid-one');
    const gridTwo = document.querySelector('.grid-two');

    addCoordinates(gridOne);
    addCoordinates(gridTwo);

    // Add event listeners to player one (human/"real") grid
    addEventListeners(gridOne, gridTwo, game);
}

// Add coordinate points to each cell in the grid
function addCoordinates(grid) {
    const gridRows = grid.querySelectorAll('.row');

    gridRows.forEach((row, r) => {
        const cells = row.querySelectorAll('.cell');
        cells.forEach((cell, c) => {
            cell.dataset.row = r;
            cell.dataset.column = c;
        });
    });
}

function addEventListeners(gridOne, gridTwo, game) {
    const gridTwoCells = gridTwo.querySelectorAll('.cell');

    gridTwoCells.forEach(cell => {
        cell.addEventListener('click', () => {
            const row = Number(cell.dataset.row);
            const column = Number(cell.dataset.column);

            // Ignore clicks on grid cells that have already been clicked
            if (!(game.playerTwo.gb.board[row][column] == 0) && !(game.playerTwo.gb.board[row][column] == 1)) {
                if (game.gameOver()) return;
                
                const playerResults = game.playerOneMove(row, column);
                playerResults.impactedCells.forEach(c => {
                    // Map gameboard cell onto DOM cell
                    const cell = gridTwo.querySelector(`.cell[data-row="${c.y}"][data-column="${c.x}"]`); 
                    // Update DOM cell
                    updateCell(cell, game.playerTwo.gb);
                });
                if (game.gameOver()) return;    // Check if the game is over

                if (!playerResults.wasHit && !game.gameOver()) {
                    setTimeout(() => {
                        computerTurn(game, gridOne);
                    }, 500);
                }
            }
        });
    });
}

function computerTurn(game, grid) {
    const compResults = game.computerMove(); 

    compResults.impactedCells.forEach(c => {
        const cell = grid.querySelector(`.cell[data-row="${c.y}"][data-column="${c.x}"]`);
        updateCell(cell, game.playerOne.gb);
    });

    if (compResults.wasHit && !game.gameOver()) {
        setTimeout(() => computerTurn(game, grid), 500);
    }
}

// Update display of grid cell
function updateCell(cell, gb) {
    if (!cell) return;

    const row = cell.dataset.row;
    const col = cell.dataset.column;
    const currentVal = gb.board[row][col];

    // Reset
    cell.classList.remove('hit', 'miss');

    if (currentVal == 1) {
        cell.classList.add('hit');
    } else if (currentVal == 0) {
        cell.classList.add('miss');
    }

}

function displayGameOver(what) {
    const instructions = document.querySelector('.instructions');
    instructions.textContent = `Game Over. You ${what}!`;
    console.log('hey!');
}

function updateInstructions(who) {
    const instructions = document.querySelector('.instructions');
    instructions.textContent = `It's ${who} Turn`;
}
 
export { UISetup, updateCell, displayGameOver, updateInstructions }