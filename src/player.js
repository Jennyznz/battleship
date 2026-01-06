import { Gameboard } from "./gameboard";

class Player {
    constructor(type) {
        this.type = type
        this.gb = new Gameboard();
        this.gb.setBoard();
    }
}

export { Player }