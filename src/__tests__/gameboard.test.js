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
});