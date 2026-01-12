import { Game } from './game';
import './styles.css';

const game = new Game();
UISetup(game);



function UISetup(game) {
    const gridOne = document.querySelector('.grid-one');
    const gridOneRows = gridOne.querySelectorAll('.row');

    // Add coordinate points to each cell in the grid
    gridOneRows.forEach((row, r) => {
        const cells = row.querySelectorAll('.cell');
        cells.forEach((cell, c) => {
            cell.dataset.row = r;
            cell.dataset.column = c;
        });
    });

    // Add event listeners to player one (human/"real") grid
    const gridOneCells = gridOne.querySelectorAll('.cell');
    gridOneCells.forEach(cell => {
        cell.addEventListener('click', () => {
            const row = Number(cell.dataset.row);
            const column = Number(cell.dataset.column);

            game.playerOneMove(row, column);
            console.log(row, column);
        });
    });
}

