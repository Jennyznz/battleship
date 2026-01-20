import { Player } from "./player"
import { displayGameOver, updateInstructions } from "./ui.js"

class Game {
    constructor() {
        this.playerOne = new Player("real");
        this.playerTwo = new Player("computer");

        this.currentPlayer = this.playerOne;
        this.playerOneTurn = true;
    }

    playerOneMove(row, column) {
        if (!this.playerOneTurn) return [];

        const impactedCells = this.playerTwo.gb.receiveAttack(row, column); 

        const result = this.gameOver();
        if (result) {
            displayGameOver(result === 'player' ? 'Won' : 'Lost');
            return impactedCells;
        } 
        this.playerOneTurn = false;
        updateInstructions("Your Opponent's");
        return impactedCells;
    }

    // Find a random non-missed spot on "real" gameboard
    computerMove() {
        // Get random non-missed coordinates
        let x = 0;
        let y = 0;
        let found = false;

        while (!found) {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            if (!(this.playerOne.gb.board[y][x] == 0) && !(this.playerOne.gb.board[y][x] == 1)) {   // there hasn't been a missed or successful attack on the spot
                found = true;
            }
        }

        const impactedCells = this.playerOne.gb.receiveAttack(y, x);

        const result = this.gameOver();
        if (result) { // Game over
            displayGameOver(result === 'player' ? 'Won' : 'Lost');
            return impactedCells;
        } 

        this.playerOneTurn = true;
        updateInstructions("Your");

        return impactedCells;
    }

    gameOver() {
        const playerAllSunk = this.playerTwo.gb.isAllSunk();
        const computerAllSunk = this.playerOne.gb.isAllSunk();
        //console.log("Game over check:", { playerAllSunk, computerAllSunk });

        if (playerAllSunk) return "player";
        if (computerAllSunk) return "computer";
        return null;
    }

}

export { Game }