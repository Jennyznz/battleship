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
        const oneB= new Ship(1);
        const oneC = new Ship(1);
        const oneD= new Ship(1);

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
        let horizontal = 0;
        let vertical = 0;
        let direction = 0;

        // Find a random and valid placement for the ship
        while (found === false) {
            // Generate a random coordinate and direction
            horizontal = Math.floor(Math.random() * 10);
            vertical = Math.floor(Math.random() * 10);
            direction = Math.floor(Math.random() * 2);

            let conflict = false;
            // Horizontal
            if (direction === 0) { 
                // Check if the horizontal ship would go off the board
                if (horizontal + ship.length - 1 > 10) {
                        conflict = true;
                } else {
                    // Check if every spot going right is empty
                    for (let i = 0; i < ship.length; i++) {
                        if (this.board[horizontal + i][vertical] !== null) {
                            conflict = true;
                            break;
                        }
                    }
                }
                
            // Vertical
            } else {
                // Check if the vertical ship would go off the board
                if (vertical + ship.length - 1 > 10) {
                        conflict = true;
                } else {
                    // Check if every spot going down is empty
                    for (let i = 0; i < ship.length; i++) {
                        if (this.board[horizontal][vertical + i] !== null) {
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

        // Set ship
        if (direction === 0) {  // Horizontal ship
            for (let i = 0; i < ship.length; i++) {
                this.board[horizontal + i][vertical] = ship;
            }
        } else {       // Vertical ship
            for (let i = 0; i < ship.length; i++) {
                this.board[horizontal][vertical + i] = ship;  
            }
        }

        setShipBorders(horizontal, vertical, direction, ship.length);
    } 

    setShipBorders(x, y, direction, length) {   // Corners are created with the top and bottom borders
        // Horizontal ship
        if (direction === 0) {
            // Left border
            if (x - 1 > 0) {
                this.board[x - 1][y] = 2;
            }  
            // Top border
            if (y + 1 < 10) {
                if (x - 1 > 0) {
                    this.board[x - 1][y + 1] = 2;
                }
                for (let i = 0; i <= length; i++) {
                    if (x + i < 10) {
                        this.board[x + i][y + 1] = 2;
                    }
                }
            }
            // Right border
            if ((x + length) < 10) {
                this.board[x + length][y] = 2;
            }
            // Bottom border
            if (y - 1 > 0) {
                if (x - 1 > 0){
                    this.board[x - 1][y - 1] = 2;
                }
                for (let i = 0; i <= length; i++) {
                    if (x + i < 10) {
                        this.board[x + i][y - 1] = 2;
                    }
                }
            }
        }
        // Vertical ship
        else if (direction === 1) {
            // Left border
            if (x - 1 > 0) {
                if (y - 1 > 0) {
                    this.board[x - 1][y - 1] = 2;
                }
                for (let i = 0; i <= length; i++) {
                    if (y + i < 10) {
                        this.board[x - 1][y + i] = 2;
                    }
                }
            }
            // Top border
            if (y + length < 10) {
                this.board[x][y + length] = 2;
            }
            // Right border
            if (x + 1 < 10) {
                if (y - 1 > 0) {
                    this.board[x + 1][y - 1] = 2;
                }
                for (let i = 0; i <= length; i++) {
                    if (y + 1 < 10) {
                        this.board[x + 1][y + i] = 2;
                    }
                }
            }
            // Bottom border
            if (y - 1 > 0) {
                this.board[x][y - 1]= 2;
            }
        }
    }

    setBoard() {
        for (const ship of this.ships) {
            this.setShip(ship);
        }
    }

    receiveAttack(horizontal, vertical) {
        // Board values:
            // 0: missed attack, or ship border
            // 1: hit
            // ship object: untouched with ship
            // null: untouched without ship
            // 2: untouched ship border 

        const cell = this.board[horizontal][vertical];

        if (cell === null) {
            this.board[horizontal][vertical] = 0; // missed attack
        } else if (cell instanceof Ship) {
            this.board[horizontal][vertical] = 1;   // hit ship
            cell.hit();
            // Set all surrounding blocks to 0 if ship is sunk
            if (ship.isSunk()) {
                

            } else {    // Else just set the surrounding blocks of the current cell

            }
            this.isAllSunk();
        }
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