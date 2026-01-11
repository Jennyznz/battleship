
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
        expect(game.playerTwo.gb.board[4][4]).toBe(0 || 1);
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


});