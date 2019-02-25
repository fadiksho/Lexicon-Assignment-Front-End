import { Tile } from './Tile';

const _tileGrid = Symbol();
const _createTileMap = Symbol();

const _rows = Symbol();
const _columns = Symbol();
const _tileGridDimension = Symbol();
const _tileDimensionInPrecent = Symbol();
const _calculateTileDimensionInPrecent = Symbol();

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
        columns.push(new Tile(tileGrid[i][j][0]));
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

  updateTileGridDimension(height, width) {
    this[_tileGridDimension] = Math.min(height, width);
  }

  createTileMap() {
    throw new Error('Not Implemented Exception: createTileMap.');
  }
}
