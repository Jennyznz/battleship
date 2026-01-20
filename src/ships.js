class Ship {
    constructor(length) {
        this.length = length;
        this.hitCount = 0;
        this.sunk = false;
        this.dir = null;
        this.x = null;
        this.y = null;
    }

    hit() {
        this.hitCount++;
        this.isSunk();
    }

    isSunk() {
        if (this.hitCount === this.length) {
            this.sunk = true;
            return true;
        }
        return false;
    }
}

export { Ship };