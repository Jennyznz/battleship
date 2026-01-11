import { Player } from "./player"

class Game {
    constructor() {
        this.playerOne = new Player("real");
        this.playerTwo = new Player("computer");

        this.currentPlayer = this.playerOne;
        this.playerOneTurn = true;
    }

    playerOneMove(row, column) {
        if (this.playerOneTurn) {
            this.playerTwo.gb.receiveAttack(row, column); 

            if (!this.gameOver()) {
                this.computerMove();
            }
        }
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

        this.playerOne.gb.receiveAttack(x, y);

        if (!this.gameOver()) {
            this.playerOneTurn = true;
        }
    }

    gameOver() {
        return this.playerOne.gb.isAllSunk() || this.playerTwo.gb.isAllSunk();
    }

}

export { Game }