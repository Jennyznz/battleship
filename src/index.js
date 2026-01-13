// Entry point file
import { Game } from './game';
import './styles.css';
import { UISetup } from './ui';

const game = new Game();
UISetup(game);

