import { Player } from "./player"

class Game {
    constructor() {
        this.playerOne = new Player("real");
        this.playerTwo = new Player("computer");

        this.currentPlayer = this.playerOne;
        this.gameOver = false;
    }

    start() {
        this.takeTurn();
    }

    takeTurn() {
        if (this.gameOver) return;

        if (this.currentPlayer.type === "computer") {
            while (this.playerOne.gb)
            const horizontal = getRand();
            const vertical = getRand();

            this.playerOne.gb.recieveAttack(horizontal, vertical);
        }
    }

    getRand() {

    }



}

export { Game }