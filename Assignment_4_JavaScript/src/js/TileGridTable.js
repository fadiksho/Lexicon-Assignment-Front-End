import {
  TileGrid
} from './TileGrid.js';

const _table = Symbol();
export class TileGridTable extends TileGrid {

  constructor(tileMap, tileMapWidth, tileMapHeight) {
    super(tileMap, tileMapWidth, tileMapHeight);
  }

  createTileMap() {
    let tableGrid = document.createElement('table');
    let tablebody = document.createElement('tbody');
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
      tablebody.appendChild(tr);
    }

    tableGrid.appendChild(tablebody);

    this[_table] = tableGrid;

    return this[_table];
  }

  move(x, y, xDirection, yDirection) {
    const movement = super.buildMovement(x, y, xDirection, yDirection);
    if (movement.length <= 0) {
      return false;
    }
    else {
      for (let i = movement.length - 1; i >= 1; i--) {
        console.log(movement[i]);
      }
    }
  }
}