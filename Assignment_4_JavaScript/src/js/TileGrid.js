const _tileGrid = Symbol();
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
    this[_tileGrid] = tileGrid;
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

  getTileImageName(row, column) {
    const tileType = this[_tileGrid][row][column][0];

    switch (tileType) {
      case 'W':
        return 'w.png';
      case 'B':
        return 'b.png';
      case 'P':
        return 'p.png';
      case 'G':
        return 'g.png';
      default:
        return 'c.png';

    }
  }

  createTileMap() {
    throw new Error('Not Implemented Exception: createTileMap.');
  }
}