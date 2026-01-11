
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
    


});