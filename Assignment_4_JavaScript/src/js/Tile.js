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

  // the type of the tile never gonna change
  get type() {
    return this[_type];
  }

  // the hostType is value('P' | 'B' | ' ') that the tile is holding
  set hostType(hostType) {
    this[_hostType] = hostType;
    // after the hostType change update the tile image
    this[_updateTileImage]();
  }

  // get the hostType of the tile
  get hostType() {
    return this[_hostType];
  }

  // get the image of hostType becouse thats what it will be render
  get tileImage() {
    return this[_tileImage];
  }

  // check if this cell can contain a hostType
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
        this[_tileImage] = this[_type] === 'G' ? "correct_box.png" : "box.png";
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