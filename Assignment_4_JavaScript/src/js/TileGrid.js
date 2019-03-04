import {
  Tile
} from './Tile';
import {
  SimpleEvent,
  GameEvent
} from './GameEvent';
const _tileGrid = Symbol();
const _createTileMap = Symbol();
const _rows = Symbol();
const _columns = Symbol();
const _tileGridDimension = Symbol();
const _tileDimensionInPrecent = Symbol();
const _calculateTileDimensionInPrecent = Symbol();
const _playerX = Symbol();
const _playerY = Symbol();
const _goalTiles = Symbol();
const _gameEndEvent = Symbol();
export class TileGrid {

  constructor(tileGrid, tileGridWidth, tileGridHeight = 0) {
    this[_tileGrid] = this[_createTileMap](tileGrid);
    this[_rows] = this[_tileGrid].length;
    this[_columns] = this[_tileGrid][0].length;
    this[_tileGridDimension] = Math.min(tileGridWidth, tileGridHeight);
    this[_tileDimensionInPrecent] = this[_calculateTileDimensionInPrecent]();
    this[_gameEndEvent] = new SimpleEvent('gameEndEvent');
    GameEvent.events['gameEndEvent'] = this[_gameEndEvent];
  }

  // fill in the grid with tiles and set the starter point
  [_createTileMap](tileGrid) {
    let tileMap = [];
    this[_goalTiles] = [];
    for (let i = 0; i < tileGrid.length; i++) {
      let columns = [];
      for (let j = 0; j < tileGrid[i].length; j++) {
        let tile = new Tile(tileGrid[i][j][0], i, j);
        if (tileGrid[i][j][0] === 'P') {
          this[_playerX] = i;
          this[_playerY] = j;
        } else if (tileGrid[i][j][0] === 'G') {
          this[_goalTiles].push(tile);
        }
        columns.push(tile);
      }
      tileMap.push(columns);
    }
    return tileMap;
  }

  // calculate how mush space each tile will take based on the grid (height || width)
  [_calculateTileDimensionInPrecent]() {
    let tileMapRib = Math.max(this[_rows], this[_columns]);
    let tileDimension = this[_tileGridDimension] / tileMapRib;
    let tileMapDimensionInPrecent = tileDimension / this[_tileGridDimension] * 100;
    return tileMapDimensionInPrecent;
  }

  // get the grid that contain all the tiles
  get tiles() {
    return this[_tileGrid];
  }

  // get the grid dimension
  get tileGridDimension() {
    return this[_tileGridDimension];
  }

  // get the tile dimension
  get tileDimensionInPrecent() {
    return this[_tileDimensionInPrecent];
  }

  // Check if the game ended
  // Return: boolean
  get isGameEnd() {
    return this[_goalTiles].filter(t => t.hostType !== 'B').length === 0;
  }

  // update the deminsion of the map
  updateTileGridDimension(height, width) {
    // to maintain the aspect ratio of the map we take the smallest
    this[_tileGridDimension] = Math.min(height, width);
  }

  // return list of tiles("movements") from the start point "player" to the direction.
  // direction could be 'top, right, bottom, left'.
  // if return [] direction is blocked or out of range
  buildMovement(xDirection, yDirection, startX = this[_playerX], startY = this[_playerY], previousMovement = []) {
    let xTarget = startX + xDirection;
    let yTarget = startY + yDirection;
    // Check if the target location is inside the grid
    if ((xTarget < 0 || xTarget >= this[_tileGrid].length) ||
      (yTarget < 0 || yTarget >= this[_tileGrid][xTarget].length)) {
      return [];
    }
    let tile = this[_tileGrid][startX][startY];
    let nextTile = this[_tileGrid][xTarget][yTarget];
    // if target is wall don't move
    if (nextTile.type === 'W') return [];
    // when we have two boxes
    if (tile.hostType === 'B' && nextTile.hostType === 'B') return [];
    // if the target is empty and doesn't contain a tile
    else if (nextTile.type === ' ' && nextTile.canContainHost === true) {
      previousMovement.push(tile);
      previousMovement.push(nextTile);
      return previousMovement;
    }
    // if the target is correct and doesn't contain a tile
    else if (nextTile.type === 'G' && nextTile.canContainHost === true) {
      previousMovement.push(tile);
      previousMovement.push(nextTile);
      return previousMovement;
    }
    // target is crate check if the crate can move
    else {
      previousMovement.push(tile);
      return this.buildMovement(xDirection, yDirection, xTarget, yTarget, previousMovement);
    }
  }

  // update the tiles based on list of movement
  // args:
  //  movement: list of tiles that need to be change after the player moved
  applyMovement(movement) {
    // when we play the move backword
    // becouse the move start from left to right
    if (movement[0].hostType !== ' ') {
      movement.reverse();
    }
    // loop throw the moves and shift theme toword the empty tile
    for (let i = 0; i < movement.length - 1; i++) {
      let tile = movement[i];
      let targetTile = movement[i + 1];
      let tileHostTypeCopy = targetTile.hostType;

      // Switch the two tiles from the left to right
      targetTile.hostType = tile.hostType;
      tile.hostType = tileHostTypeCopy;
    }
    // update the starter point "player"
    // calculate the direction after the starter point changed
    let playerTile = movement.filter(tile => tile.hostType === 'P')[0];
    this[_playerX] = playerTile.row;
    this[_playerY] = playerTile.column;
  }
}