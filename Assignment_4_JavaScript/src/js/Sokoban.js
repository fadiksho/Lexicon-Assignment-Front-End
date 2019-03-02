import {
  TileGrid
} from './TileGrid.js';
import {
  TileGridTable
} from './TileGridTable.js';
import {
  GameControl
} from './GameControls.js';

const _tileMaps = Symbol();
const _selectedMap = Symbol();
const _tileGrid = Symbol();
const _renderEngine = Symbol();
const _playMoves = Symbol();
const _gameControl = Symbol();
export class Sokoban {
  constructor(tileMaps, width, height) {
    this[_tileMaps] = tileMaps;
    this[_selectedMap] = tileMaps[0];
    this[_tileGrid] = new TileGrid(this[_selectedMap].mapGrid, width, height);
    this[_gameControl] = new GameControl();
  }

  [_playMoves](moves) {
    moves.forEach(move => {
      this.tileGrid.applyMovement(move);
      this[_renderEngine].updateTiles(move);
    });
  }

  move(xDirection, yDirection) {
    let move = this.tileGrid.buildMovement(xDirection, yDirection);
    if (move.length > 0) {
      this[_playMoves]([move]);
      this.gameControl.saveMove(move);
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

  restart() {
    let tileGridDimension = this[_tileGrid].tileGridDimension;
    this[_tileGrid] = new TileGrid(this[_selectedMap].mapGrid, tileGridDimension, tileGridDimension);
    this[_gameControl] = new GameControl();
  }

  getMap(){
    return 
  }

  selectMap(mapName) {
    // ToDo: select new map and clean
  }

  setRenderEngine(renderEngine) {
    switch (renderEngine) {
      case 'table':
        // set default rendering to table
        this[_renderEngine] = new TileGridTable(this.tileGrid);
        // change render
        break;
      case 'divs':
        // change render to divs
        break;
      default:
        // set default to table
        this[_renderEngine] = new TileGridTable(this.tileGrid);
        break;
    }
  }

  createTileMap() {
    return this[_renderEngine].createTileMap();
  }
}