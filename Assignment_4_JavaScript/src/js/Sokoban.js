import {
  tileMaps
} from './SokobanBase.js';
import {
  TileGrid
} from './TileGrid.js';
import {
  TileGridTable
} from './TileGridTable.js';
import {
  GameControl
} from './GameControls.js';
import {
  GameEvent
} from './GameEvent.js';

const _tileMaps = Symbol();
const _selectedMap = Symbol();
const _tileGrid = Symbol();
const _renderEngine = Symbol();
const _playMoves = Symbol();
const _gameControl = Symbol();

export class Sokoban {
  constructor(width, height) {
    this[_selectedMap] = tileMaps[0];
    this[_tileGrid] = new TileGrid(this[_selectedMap].mapGrid, width, height);
    this[_gameControl] = new GameControl();
  }

  // apply the movement on the map
  // check for wining
  [_playMoves](moves) {
    moves.forEach(move => {
      this.tileGrid.applyMovement(move);
      this[_renderEngine].updateTiles(move);
    });
    // check for win
    if (this.tileGrid.isGameEnd) {
      GameEvent.dispatchEvent('gameEndEvent');
      this.gameControl.stopTimer();
    }
  }

  // move the player based on direction
  // save the move
  move(xDirection, yDirection) {
    let move = this.tileGrid.buildMovement(xDirection, yDirection);
    if (move.length > 0 && this.tileGrid.isGameEnd === false) {
      this.gameControl.saveMove(move);
      this[_playMoves]([move]);
    }
  }

  get gameControl() {
    return this[_gameControl];
  }

  get tileGrid() {
    return this[_tileGrid];
  }
  
  // +1, -1, +10, -10
  playMove(value) {
    let moves = this.gameControl.getMove(value);

    if (value < -1) {
      moves.reverse();
    }
    this[_playMoves](moves);
  }

  // restart the game
  restart() {
    let tileGridDimension = this[_tileGrid].tileGridDimension;
    this[_tileGrid] = new TileGrid(this[_selectedMap].mapGrid, tileGridDimension, tileGridDimension);
    this.gameControl.reset();
  }

  // select new tileMap
  selectMap(selectedMap = 0) {
    this[_selectedMap] = tileMaps[selectedMap];
    this.restart();
  }

  // change the render engine
  setRenderEngine(renderEngine) {
    switch (renderEngine) {
      case 'divs':
        // change render to divs
        break;
      default:
        // set default to table
        this[_renderEngine] = new TileGridTable(this.tileGrid);
        break;
    }
  }

  // drawing the tileMap
  createTileMap() {
    return this[_renderEngine].createTileMap();
  }
}