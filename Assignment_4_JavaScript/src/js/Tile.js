const _image = Symbol();
const _getTileImage = Symbol();

export class Tile {
  constructor(type) {
    this.type = type;
    this[_image] = this[_getTileImage]();
  }

  get image() {
    return this[_image];
  }

  [_getTileImage]() {
    switch (this.type) {
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
}
