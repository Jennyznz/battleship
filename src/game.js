import { Player } from "./player"

class Game {
    constructor() {
        this.playerOne = new Player("real");
        this.playerTwo = new Player("computer");

        this.currentPlayer = this.playerOne;
        this.playerOneTurn = false;
    }

    attachEventListeners() {
        const realGrid = document.querySelector('.grid-one');
        const realRows = realGrid.querySelectorAll('.row');
        realRows.forEach(row, r => {
            // Add coordinate points to each cell in the grid
            const cells = row.querySelectorAll('.cell');
            cells.forEach(cell, c => {
                cell.dataset.row = r;
                cell.dataset.column = c;
            });
        });

        realCells.forEach(cell => {
            cell.attachEventListeners('click', () => {
                if (this.playerOneTurn) {
                    this.playerTwo.gb.receiveAttack(cell.dataset.row, cell.dataset.column); 

                    if (!gameOver()) {
                        this.computerMove();
                    }
                }
            });
            
        });
    }

    start() {
        this.playerOneTurn = true;
    }

    // Find a random non-missed spot on "real" gameboard
    computerMove() {
        this.playerOneTurn = false;

        // Get random non-missed coordinates
        let x = 0;
        let y = 0;
        let found = false;

        while (!found) {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            if (!(this.playerOne.gb.board[x][y] == 0) && !(this.playerOne.gb.board[x][y] == 1)) {   // there hasn't been a missed or successful attack on the spot
                found = true;
            }
        }

        this.playerOne.receiveAttack(x, y);

        if (!gameOver()) {
            this.playerOneTurn = true;
        }
    }

    gameOver() {
        return this.playerOne.gb.isAllSunk() || this.playerTwo.gb.isAllSunk();
    }

}

export { Game }