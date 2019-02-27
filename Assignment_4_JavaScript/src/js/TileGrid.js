import {
  Tile
} from './Tile';
import {
  Player
} from './Player';
const _tileGrid = Symbol();
const _createTileMap = Symbol();
const _rows = Symbol();
const _columns = Symbol();
const _tileGridDimension = Symbol();
const _tileDimensionInPrecent = Symbol();
const _calculateTileDimensionInPrecent = Symbol();
const _player = Symbol();

export class TileGrid {

  constructor(tileGrid, tileGridWidth, tileGridHeight) {
    if (tileGrid[0] === undefined || tileGrid[0].constructor !== Array) {
      throw new Error('invalid tile map');
    }

    this[_tileGrid] = this[_createTileMap](tileGrid);
    this[_rows] = this[_tileGrid].length;
    this[_columns] = this[_tileGrid][0].length;
    this[_tileGridDimension] = Math.min(tileGridWidth, tileGridHeight);
    this[_tileDimensionInPrecent] = this[_calculateTileDimensionInPrecent]();
  }

  [_calculateTileDimensionInPrecent]() {
    let tileMapRib = Math.max(this[_rows], this[_columns]);
    let tileDimension = this[_tileGridDimension] / tileMapRib;
    let tileMapDimensionInPrecent = tileDimension / this[_tileGridDimension] * 100;
    return tileMapDimensionInPrecent;
  }

  [_createTileMap](tileGrid) {
    let tileMap = [];
    for (let i = 0; i < tileGrid.length; i++) {
      let columns = [];
      for (let j = 0; j < tileGrid[i].length; j++) {
        if (tileGrid[i][j][0] === 'P') {
          this[_player] = new Player(i, j);
        }
        columns.push(new Tile(tileGrid[i][j][0], i, j));
      }
      tileMap.push(columns);
    }
    return tileMap;
  }

  get tileGrid() {
    return this[_tileGrid];
  }

  get rows() {
    return this[_rows];
  }

  get columns() {
    return this[_columns];
  }

  get tileGridDimension() {
    return this[_tileGridDimension];
  }

  get tileDimensionInPrecent() {
    return this[_tileDimensionInPrecent];
  }

  get player() {
    return this[_player];
  }

  getTile(x, y) {
    return this[_tileGrid][x][y];
  }

  updateTileGridDimension(height, width) {
    this[_tileGridDimension] = Math.min(height, width);
  }

  createTileMap() {
    throw new Error('Not Implemented Exception: createTileMap().');
  }

  canMoveToTile(x, y, xDirection, yDirection) {
    // row
    let xTarget = x + xDirection;
    // column
    let yTarget = y + yDirection;
    // Check if the target location is inside the grid
    if ((xTarget < 0 || xTarget >= this[_tileGrid].length) ||
      (yTarget < 0 || yTarget >= this[_tileGrid][xTarget].length)) {
      return false;
    }

    let targetTile = this.getTile(xTarget, yTarget);
    // if target is wall don't move
    if (targetTile.type === 'W') return false;
    // if the target is empty and doesn't contain a tile
    else if (targetTile.type === ' ' && targetTile.containHost === false) return true;
    // if the target is correct and doesn't contain a tile
    else if (targetTile.type === 'G' && targetTile.containHost === false) return true;
    // target is crate check if the crate can move
    else {
      return this.canMoveToTile(xTarget, yTarget, xDirection, yDirection);
    }
  }

  buildMovement(x, y, xDirection, yDirection, previousMovement = []) {
    // row
    let xTarget = x + xDirection;
    // column
    let yTarget = y + yDirection;
    // Check if the target location is inside the grid
    if ((xTarget < 0 || xTarget >= this[_tileGrid].length) ||
      (yTarget < 0 || yTarget >= this[_tileGrid][xTarget].length)) {
      return null;
    }
    let tile = this.getTile(x, y);
    let targetTile = this.getTile(xTarget, yTarget);
    // if target is wall don't move
    if (targetTile.type === 'W') return [];
    // when we have to boxes
    if (targetTile.type === 'B' && tile.type === targetTile.type) return [];
    // if the target is empty and doesn't contain a tile
    else if (targetTile.type === ' ' && targetTile.containHost === false) {
      previousMovement.push(tile);
      return previousMovement;
    }
    // if the target is correct and doesn't contain a tile
    else if (targetTile.type === 'G' && targetTile.containHost === false) {
      previousMovement.push(tile);
      return previousMovement;
    }
    // target is crate check if the crate can move
    else {
      previousMovement.push(tile);
      return this.buildMovement(xTarget, yTarget, xDirection, yDirection, previousMovement);
    }
  }
}