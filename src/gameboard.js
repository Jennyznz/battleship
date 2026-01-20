import { Ship } from "./ships";

class Gameboard {
    constructor() {
        // Create a 10x10 Array containing null
        this.board = Array.from({ length: 10 }, () =>
            Array.from({ length: 10 }, () => null)
        );

        // Create 1 ship of length 4, 
        // 2 ships of length 3, 
        // 3 ships of length 2, 
        // and 4 ships of length 1
        const four = new Ship(4);
        const threeA = new Ship(3);
        const threeB = new Ship(3);
        const twoA = new Ship(2);
        const twoB = new Ship(2);
        const twoC = new Ship(2);
        const oneA = new Ship(1);
        const oneB = new Ship(1);
        const oneC = new Ship(1);
        const oneD = new Ship(1);

        // Store ships
        this.ships = [four,
            threeA, threeB,
            twoA, twoB, twoC,
            oneA, oneB, oneC, oneD
        ];

        // Randomly set board positions
        this.setBoard();
    }

    setShip(ship) {
        let found = false;
        let x = 0;
        let y = 0;
        let direction = 0;

        // Find a random and valid placement for the ship
        while (found === false) {
            // Generate a random coordinate and direction
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            direction = Math.floor(Math.random() * 2);

            let conflict = false;
            
            // Horizontal
            if (direction === 0) { 
                // Check if the horizontal ship would go off the board
                if (x + ship.length - 1 >= 10) {
                        conflict = true;
                } else {
                    // Check if every spot going right is empty
                    for (let i = 0; i < ship.length; i++) {
                        if (this.board[y][x + i] !== null) {
                            conflict = true;
                            break;
                        }
                    }
                }

            // Vertical
            } else {
                // Check if the vertical ship would go off the board
                if (y + ship.length - 1 >= 10) {
                        conflict = true;
                } else {
                    // Check if every spot going down is empty
                    for (let i = 0; i < ship.length; i++) {
                        if (this.board[y + i][x] !== null) {
                            conflict = true;
                            break;
                        }
                    }
                }
            }
            // Move onto next while iteration if the current coordinates and direction are not valid 
            if (conflict) continue; 
            else found = true;
        }

        // Set ship direction
        ship.dir = direction;
        // Set ship
        if (direction === 0) {  // Horizontal ship
            for (let i = 0; i < ship.length; i++) {
                this.board[y][x + i] = ship;
            }
        } else {    // Vertical ship
            for (let i = 0; i < ship.length; i++) {
                this.board[y + i][x] = ship;  
            }
        }

       this.setShipBorders(y, x, ship);
    } 

    setShipBorders(y, x, ship) {   // Encase ship with borders
        // Horizontal ship
        if (ship.dir === 0) {
            // Left border
            if (x - 1 >= 0) {
                if (!(this.board[y][x - 1] instanceof Ship)) {
                    this.board[y][x - 1] = 2;
                }
            }  
            // Top border
            if (y - 1 >= 0) {
                if (x - 1 >= 0) {
                    if (!(this.board[y - 1][x - 1] instanceof Ship)) {
                        this.board[y - 1][x - 1] = 2;
                    }
                }
                for (let i = 0; i <= ship.length; i++) {
                    if (x + i < 10) {
                        if (!(this.board[y - 1][x + i] instanceof Ship)) {
                            this.board[y - 1][x + i] = 2;
                        }
                    }
                }
            }
            // Right border
            if ((x + ship.length) < 10) {
                if (!(this.board[y][x + ship.length] instanceof Ship)) {
                    this.board[y][x + ship.length] = 2;
                }
            }
            // Bottom border
            if (y + 1 < 10) {
                if (x - 1 >= 0){
                    if (!(this.board[y + 1][x - 1] instanceof Ship)) {
                        this.board[y + 1][x - 1] = 2;
                    }
                }
                for (let i = 0; i <= ship.length; i++) {
                    if (x + i < 10) {
                        if (!(this.board[y + 1][x + i] instanceof Ship)) {
                            this.board[y + 1][x + i] = 2;
                        }
                    }
                }
            }
        }
        // Vertical ship
        else if (ship.dir === 1) {
            // Left border
            if (x - 1 >= 0) {
                if (y - 1 >= 0) {
                    if (!(this.board[y - 1][x - 1] instanceof Ship)) {
                        this.board[y - 1][x - 1] = 2;
                    }
                }
                for (let i = 0; i <= ship.length; i++) {
                    if (y + i < 10) {
                        if (!(this.board[y + i][x - 1] instanceof Ship)) {
                            this.board[y + i][x - 1] = 2;
                        }
                    }
                }
            }
            // Top border
            if (y - 1 >= 0) {
                if (!(this.board[y - 1][x] instanceof Ship)) {
                    this.board[y - 1][x] = 2;
                }
            }
            // Right border
            if (x + 1 < 10) {
                if (y - 1 >= 0) {
                    if (!(this.board[y - 1][x + 1] instanceof Ship)) {
                        this.board[y - 1][x + 1] = 2;
                    }
                }
                for (let i = 0; i <= ship.length; i++) {
                    if (y + i < 10) {
                        if (!(this.board[y + i][x + 1] instanceof Ship)) {
                            this.board[y + i][x + 1] = 2;
                        }
                    }
                }
            }
            // Bottom border
            if (y + ship.length < 10) {
                if (!(this.board[y][x + ship.length] instanceof Ship)) {
                    this.board[y][x + ship.length]= 2;
                }
            }
        }
    }

    setBoard() {
        for (const ship of this.ships) {
            this.setShip(ship);
        }
    }

    receiveAttack(vertical, horizontal) {
        // Board values:
            // 0: missed attack, or ship border
            // 1: hit
            // ship object: untouched with ship
            // null: untouched without ship
            // 2: untouched ship border 

        const cell = this.board[vertical][horizontal];
        if (cell === 0 || cell === 1) return []; // Ignore clicks on an already missed or hit cell

        if (cell === null || cell === 2) { 
            this.board[vertical][horizontal] = 0; // missed attack on either null or ship border
            return [{y: vertical, x: horizontal}];
        } else if (cell instanceof Ship) { // successful attack
            this.board[vertical][horizontal] = 1;   // hit ship
            cell.hit();
            // Set all surrounding blocks to 0 if ship is sunk
            if (cell.isSunk()) {
                return this.getBorderCells(vertical, horizontal, cell);
            } else {    // Else just set the corner blocks of the current cell
                return this.getCornerCells(vertical, horizontal);
            }
        }
    }

    getCornerCells(y, x) {
        const cells = [{y: y, x: x}];

        // Left
        if (x - 1 >= 0) { 
            // Top left corner
            if (y - 1 >= 0) {
                this.board[y - 1][x - 1] = 0;
                cells.push({y: y - 1, x: x - 1});
            }
            // Bottom left corner
            if (y + 1 < 10) {
                this.board[y + 1][x - 1] = 0;
                cells.push({y: y + 1, x: x - 1});
            }
        }
        // Right
        if (x + 1 < 10) {
            // Top right corner
            if (y - 1 >= 0) {
                this.board[y - 1][x + 1] = 0;
                cells.push({y: y - 1, x: x + 1});
            }
            // Bottom right corner
            if (y + 1 < 10) {
                this.board[y + 1][x + 1] = 0;
                cells.push({y: y + 1, x: x + 1});
            }
        }

        return cells;
    }

    getBorderCells(y, x, ship) {
        const cells = [{y: y, x: x}];

        // Horizontal ship
        if (ship.dir === 0) {
            // Left border
            if (x - 1 >= 0) {
                if (!(this.board[y][x - 1] instanceof Ship)) {
                    this.board[y][x - 1] = 0;
                    cells.push({y: y, x: x - 1});
                }
                
            }  
            // Top border
            if (y - 1 >= 0) {
                if (x - 1 >= 0) {
                    if (!(this.board[y - 1][x - 1] instanceof Ship)){
                        this.board[y - 1][x - 1] = 0;
                        cells.push({y: y - 1, x: x - 1});
                    }
                }
                for (let i = 0; i <= ship.length; i++) {
                    if (x + i < 10) {
                        if (!(this.board[y - 1][x + i] instanceof Ship)){
                            this.board[y - 1][x + i] = 0;
                            cells.push({y: y - 1, x: x + i});
                        }
                    }
                }
            }
            // Right border
            if ((x + ship.length) < 10) {
                if (!(this.board[y][x + ship.length] instanceof Ship)){
                    this.board[y][x + ship.length] = 0;
                    cells.push({y: y, x: x + ship.length});
                }
            }
            // Bottom border
            if (y + 1 < 10) {
                if (x - 1 >= 0){
                    if (!(this.board[y + 1][x - 1] instanceof Ship)){
                        this.board[y + 1][x - 1] = 0;
                        cells.push({y: y + 1, x: x - 1});
                    }
                }
                for (let i = 0; i <= ship.length; i++) {
                    if (x + i < 10) {
                        if (!(this.board[y + 1][x + i] instanceof Ship)){
                            this.board[y + 1][x + i] = 0;
                            cells.push({y: y + 1, x: x + i});
                        }
                    }
                }
            }
        }
        // Vertical ship
        else if (ship.dir === 1) {
            // Left border
            if (x - 1 >= 0) {
                if (y - 1 >= 0) {
                    if (!(this.board[y - 1][x - 1] instanceof Ship)){
                        this.board[y - 1][x - 1] = 0;
                        cells.push({y: y - 1, x: x - 1});
                    }
                }
                for (let i = 0; i <= ship.length; i++) {
                    if (y + i < 10) {
                        if (!(this.board[y + i][x - 1] instanceof Ship)){
                            this.board[y + i][x - 1] = 0;
                            cells.push({y: y + i, x: x - 1});
                        }
                    }
                }
            }
            // Top border
            if (y - 1 >= 0) {
                if (!(this.board[y - 1][x] instanceof Ship)){
                    this.board[y - 1][x] = 0;
                    cells.push({y: y - 1, x: x});
                }
            }
            // Right border
            if (x + 1 < 10) {
                if (y - 1 >= 0) {
                    if (!(this.board[y - 1][x + 1] instanceof Ship)){
                        this.board[y - 1][x + 1] = 0;
                        cells.push({y: y - 1, x: x + 1});
                    }
                }
                for (let i = 0; i <= ship.length; i++) {
                    if (y + i < 10) {
                        if (!(this.board[y + i][x + 1] instanceof Ship)){
                            this.board[y + i][x + 1] = 0;
                            cells.push({y: y + i, x: x + 1});
                        }
                    }
                }
            }
            // Bottom border
            if (y + ship.length < 10) {
                if (!(this.board[y + ship.length][x] instanceof Ship)){
                    this.board[y + ship.length][x] = 0;
                    cells.push({y: y + ship.length, x: x});
                }
            }
        }

        return cells;
    }

    isAllSunk() {
        for (const ship of this.ships) {
            if (!ship.isSunk()) {
                return false;
            }
        }
        return true;
    }
}

export { Gameboard };