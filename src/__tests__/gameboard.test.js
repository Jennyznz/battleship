import { Gameboard } from "../gameboard";
import { Ship } from "../ships";

describe('Gameboard', () => {
    let gameboard;

    beforeEach(() => {
        gameboard = new Gameboard();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('create a 10x10 board', () => {
        expect(gameboard.board.length).toBe(10);
        gameboard.board.forEach(row => {
            expect(row.length).toBe(10);
        });
    });

    test('board starts with only null values or ship objects', () => {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                cell = gameboard.board[i][j]
                expect(cell === null || cell instanceof Ship).toBe(true);
            }
        }
    });

    test('recieveAttack: miss', () => {
        gameboard.recieveAttack(0, 0);
        expect(gameboard.board[0][0]).toBe(0);
    });

    test('recieveAttack: hit', () => {
        const ship = new Ship(1);
        gameboard.board[1][1] = ship;

        jest.spyOn(ship, 'hit');
        gameboard.recieveAttack(1, 1);
        expect(ship.hit).toHaveBeenCalled();

    });

    test('isAllSunk: returns false if there is exists an unsunk ship', () => {
        const ship = new Ship(1)
        gameboard.ships = [ship];

        expect(gameboard.isAllSunk()).toBe(false);
    });

    test('isAllSunk: returns true if all existing ships are sunk', () => {
        const ship = new Ship(1);
        gameboard.ships = [ship];

        ship.hit();

        expect(gameboard.isAllSunk()).toBe(true);
    });

});