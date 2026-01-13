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

            game.playerOneMove(row, column);
            updateCell(cell, game.playerTwo.gb);

            if (!game.gameOver()) {
                const move = game.computerMove();
                const cell = gridOne.querySelector(`.cell[data-row="${move.x}"][data-column="${move.y}"]`);
                updateCell(cell, game.playerOne.gb);
            }

        });
    });
}

function updateCell(cell, gb) {

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

function gameOver() {

}


export { UISetup, updateCell }