
import { Game } from "../game";

describe('Game Logic', () => {
    let game;

    beforeEach(() => {
        game = new Game();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('Create new game: test one "real" type player.', () => {
        expect(game.playerOne.type).toBe('real');
    });

    test('Create new game: test one "computer" type player.', () => {
        expect(game.playerTwo.type).toBe('computer');
    });
    
    test('playerOneMove: check for a hit or a miss on playerTwo gameboard', () => {
        game.playerOneMove(4, 4);
        game.gameOver = true; // Avoid triggering computerMove()
        const cell = game.playerTwo.gb.board[4][4];
        expect(cell == 0 || cell == 1).toBe(true);
    });

    test('computerMove: check for functional random coordinate generation', () => {
        // Intercept calls to Math.random()
        // Set results to coordinates 2, 3
        jest.spyOn(Math, 'random')
            .mockReturnValueOnce(0.25)
            .mockReturnValueOnce(0.35);

        const receiveAttackSpy = jest.spyOn(game.playerOne.gb, 'receiveAttack');
        game.computerMove();

        expect(receiveAttackSpy).toHaveBeenCalledWith(2, 3);
    });

    test('Game is not over when there are unsunk ships on either board', () => {
        expect(game.gameOver()).toBe(false);
    });

    test('Game is over when all ships are sunk on both boards', () => {
        for (ship of game.playerOne.gb.ships) {
            for (let i = 0; i < ship.length; i++) {
                ship.hit();
            }
        }

        for (ship of game.playerTwo.gb.ships) {
            for (let i = 0; i < ship.length; i++) {
                ship.hit();
            }
        }

        expect(game.gameOver()).toBe(true);
    });

});