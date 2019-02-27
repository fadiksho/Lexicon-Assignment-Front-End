const _tileImage = Symbol();
const _hostImage = Symbol();
const _initialzeTile = Symbol();

export class Tile {

  constructor(type, row, column) {
    this.type = type;
    this.row = row;
    this.column = column;
    this[_hostImage] = ' ';
    this[_initialzeTile](type);
  }

  get tileImage() {
    return this[_tileImage];
  }

  get hostImage() {
    return this[_hostImage];
  }

  set hostImage(hostImage) {
    this[_hostImage] = hostImage;
  }

  get containHost() {
    return this[_hostImage] !== ' ';
  }

  [_initialzeTile](type) {
    this[_hostImage] = ' ';
    if (type === 'G') {
      this[_tileImage] = 'correctTile.png';
    }
    else if (type === 'W'){
      this[_tileImage] = 'wall.png';
    }
    else {
      this[_tileImage] = 'emptyTile.png';
      if (type === 'B') {
        this[_hostImage] = 'crate.png';
      }
      else if (type === 'P') {
        this[_hostImage] = 'player.png';
      }
    }
  }
}
