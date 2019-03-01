const _tileImage = Symbol();
const _hostImage = Symbol();
const _initialzeTile = Symbol();
const _hostType = Symbol();
const _type = Symbol();
const _updateTileImage = Symbol();
export class Tile {

  constructor(type, row, column) {
    this.row = row;
    this.column = column;
    this[_hostImage] = ' ';
    this[_initialzeTile](type);
  }

  get type() {
    return this[_type];
  }

  set hostType(hostType) {
    this[_hostType] = hostType;
    // after the hostType change update the tile image
    this[_updateTileImage]();
  }

  get hostType() {
    return this[_hostType];
  }

  get tileImage() {
    return this[_tileImage];
  }

  get canContainHost() {
    return this[_hostType] === ' ';
  }

  [_initialzeTile](type) {
    if (type === 'G') {
      this[_type] = 'G';
      this.hostType = ' ';
    } else if (type === 'W') {
      this[_type] = 'W';
      this.hostType = 'W';
    } else if (type === 'B') {
      this[_type] = ' ';
      this.hostType = 'B';
    } else if (type === 'P') {
      this[_type] = ' ';
      this.hostType = 'P';
    } else {
      this[_type] = ' ';
      this.hostType = ' ';
    }
  }

  [_updateTileImage]() {
    let type = this[_hostType] !== ' ' ? this[_hostType] : this[_type];
    switch (type) {
      case 'W':
        this[_tileImage] = 'wall.png';
        break;
      case 'B':
        this[_tileImage] = 'box.png';
        break;
      case 'P':
        this[_tileImage] = 'player.png';
        break;
      case 'G':
        this[_tileImage] = 'goal.png';
        break;
      default:
        this[_tileImage] = 'emptyTile.png';
        break;
    }
  }
}