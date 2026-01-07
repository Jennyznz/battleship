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
        const realCells = realGrid.querySelectorAll('.cell');

        realCells.forEach(cell => {
            if (this.playerOneTurn) {
                this.playerTwo.gb.receiveAttack(1, 1); // Add data points to the grid cells

                if (!gameOver()) {
                    this.computerMove();
                }
            }
        });
    }

    start() {
        this.playerOneTurn = true;
    }

    // Find a random non-missed spot on "real" gameboard
    computerMove() {
        this.playerOneTurn = false;
        // Get random coordinates

        this.playerOne.receiveAttack(1, 1);

        if (!gameOver()) {
            this.playerOneTurn = true;
        }
    }

    gameOver() {
        return this.playerOne.gb.isAllSunk() || this.playerTwo.gb.isAllSunk();
    }

}

export { Game }