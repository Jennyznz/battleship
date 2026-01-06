import { Game } from './game';

const game = new Game();

const gridOne = document.querySelector('.grid-one');
const gridOneCells = document.querySelectorAll('.cell');
gridOneCells.forEach
gridOneCells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (game.currentPlayer.type === 'real') {
            
        }
    });
});

const gridTwo = document.querySelector('.grid-two');
const gridTwoCells = document.querySelectorAll('.cell');