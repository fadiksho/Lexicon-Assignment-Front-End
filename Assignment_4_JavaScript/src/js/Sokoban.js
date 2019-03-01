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
const _tileGrid = Symbol();
const _renderEngine = Symbol();
const _gameControl = Symbol();

export class Sokoban {
  constructor(tileMaps, width, height) {
    this[_tileMaps] = tileMaps;
    this[_tileGrid] = new TileGrid(tileMaps[2].mapGrid, width, height);
    this[_gameControl] = new GameControl();
  }

  move(xDirection, yDirection) {
    const x = this.tileGrid.player.xPosition;
    const y = this.tileGrid.player.yPosition;
    const movement = this.tileGrid.buildMovement(x, y, xDirection, yDirection);
    console.log(movement);
    if (movement.length > 0) {
      this.gameControl.saveMove(movement);
      this[_renderEngine].doNextMovement(movement);
      this.tileGrid.player.xPosition += xDirection;
      this.tileGrid.player.yPosition += yDirection;
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
    // Move Next
    if (value > 0 && this.gameControl.canPlay(value)) {
      const movements = this.gameControl.getMove(value);
      movements.forEach(move => {
        const x = this.tileGrid.player.xPosition;
        const y = this.tileGrid.player.yPosition;
        const xDirection = x - move[0].row;
        const yDirection = y - move[0].column;
        console.log(move);
        console.log({
          xDirection,
          yDirection
        });
      });
      // this[_renderEngine].doNextMovement(movement, xDirection, yDirection);
    }
    // Move Back
    else if (value < 0 && this.gameControl.canPlay(value)) {
      const movements = this.gameControl.getMove(value);
      movements.forEach(move => {
        const x = this.tileGrid.player.xPosition;
        const y = this.tileGrid.player.yPosition;
        const xDirection = move[0].row - x;
        const yDirection = move[0].column - y;
        console.log(move);
        console.log({
          xDirection,
          yDirection
        });
        this[_renderEngine].doPreviousMovement(move);
        this.tileGrid.player.xPosition += xDirection;
        this.tileGrid.player.yPosition += yDirection;
      });
    }
  }

  playSeriesOfMove(value) {

  }
  restart() {
    // ToDo: reset the game state
  }

  selectMap(mapName) {
    // ToDo: select new map and clean
  }

  setRenderEngine(renderEngine) {
    switch (renderEngine) {
      case 'table':
        // set default rendering to table
        this[_renderEngine] = new TileGridTable(this[_tileGrid]);
        // change render
        break;
      case 'divs':
        // change render to divs
        break;
      default:
        // set default to table
        this[_renderEngine] = new TileGridTable(this[_tileGrid]);
        break;
    }
  }

  createTileMap() {
    return this[_renderEngine].createTileMap();
  }
}