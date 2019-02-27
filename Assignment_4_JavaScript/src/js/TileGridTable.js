import {
  TileGrid
} from './TileGrid.js';

const _table = Symbol();
const _updateCellImage = Symbol();
export class TileGridTable extends TileGrid {

  constructor(tileMap, tileMapWidth, tileMapHeight) {
    super(tileMap, tileMapWidth, tileMapHeight);
  }

  createTileMap() {
    let tableGrid = document.createElement('table');
    // Create the table body (rows, columns)
    for (let i = 0; i < super.rows; i++) {
      let tr = document.createElement('tr');
      for (let j = 0; j < super.columns; j++) {
        let td = document.createElement('td');
        let tile = document.createElement('img');
        if (super.tileGrid[i][j].containHost) {
          tile.src = `./images/${super.tileGrid[i][j].hostImage}`;
        } else {
          tile.src = `./images/${super.tileGrid[i][j].tileImage}`;
        }
        td.style.width = super.tileDimensionInPrecent + '%';
        td.style.height = super.tileDimensionInPrecent + '%';
        td.appendChild(tile);
        tr.appendChild(td);
      }
      tableGrid.appendChild(tr);
    }

    this[_table] = tableGrid;

    return this[_table];
  }

  move(x, y, xDirection, yDirection) {
    const movement = super.buildMovement(x, y, xDirection, yDirection);
    
    console.log(super.tileGrid);
    if (movement.length > 0) {
      this.doNextMovement(movement, xDirection, yDirection);
    }
  }

  doNextMovement(movement, xDirection, yDirection) {
    for (let i = movement.length - 1; i >= 0; i--) {
      // update the tile
      let x = movement[i].row + xDirection;
      let y = movement[i].column + yDirection;
      let tile = super.getTile(movement[i].row, movement[i].column);
      let targetTile = super.getTile(x, y);

      targetTile.hostImage = tile.hostImage;
      targetTile.type = tile.type;
      tile.hostImage = ' ';
      tile.type = targetTile.type;
      // draw
      this[_updateCellImage](tile);
      this[_updateCellImage](targetTile);
    }
    // update player location
    super.player.xPosition += xDirection;
    super.player.yPosition += yDirection;
  }

  doPreviuseMovement(movement, xDirection, yDirection) {
    // xDirection = xDirection * -1;
    // yDirection = yDirection * -1;
    // for (let i = 0; i < movement.length; i++) {
    //   this[_getCell](xDirection, yDirection);
    // }
  }

  [_updateCellImage](tile) {
    let tileImage = this[_table].rows[tile.row].cells.item(tile.column).firstChild;
    if (tile.containHost) {
      tileImage.src = `./images/${tile.hostImage}`;
    } else {
      tileImage.src = `./images/${tile.tileImage}`;
    }
  }
}
