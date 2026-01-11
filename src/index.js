import { Game } from './game';

const game = new Game();

const gridOne = document.querySelector('.grid-one');
const gridOneRows = gridOne.querySelectorAll('.row');

// Add coordinate points to each cell in the grid
gridOneRows.forEach(row, r => {
    const cells = row.querySelectorAll('.cell');
    cells.forEach(cell, c => {
        cell.dataset.row = r;
        cell.dataset.column = c;
    });
});

// Add event listeners to player one (human/"real") grid
const gridOneCells = gridOneRows.querySelectorAll('.cell');
gridOneCells.forEach(cell => {
    cell.attachEventListeners('click', () => {
        game.playerOneMove(cell.dataset.row, cell.dataset.column);
    });
});

const gridTwo = document.querySelector('.grid-two');
const gridTwoCells = document.querySelectorAll('.cell');