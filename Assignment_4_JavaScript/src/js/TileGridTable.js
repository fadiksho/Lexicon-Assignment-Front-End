const _table = Symbol();
const _updateCellImage = Symbol();
const _map = Symbol();
export class TileGridTable {

  constructor(tileGrid) {
    this[_map] = tileGrid;
  }

  createTileMap() {
    let tableGrid = document.createElement('table');
    // Create the table body (rows, columns)
    for (let i = 0; i < this[_map].rows; i++) {
      let tr = document.createElement('tr');
      for (let j = 0; j < this[_map].columns; j++) {
        let td = document.createElement('td');
        let tile = document.createElement('img');
        tile.src = `./images/${this[_map].tileGrid[i][j].tileImage}`;
        td.style.width = this[_map].tileDimensionInPrecent + '%';
        td.style.height = this[_map].tileDimensionInPrecent + '%';
        td.appendChild(tile);
        tr.appendChild(td);
      }
      tableGrid.appendChild(tr);
    }

    this[_table] = tableGrid;

    return this[_table];
  }
  // {row: 0, column: 0, "P", …}
  // {row: 0, column: 1, "B", …} // tile
  // {row: 0, column: 2, " ", …} // target Tile

  doNextMovement(movement) {
    for (let i = movement.length - 1; i > 0; i--) {

      let targetTile = this[_map].getTile(movement[i].row, movement[i].column);
      let tile = this[_map].getTile(movement[i - 1].row, movement[i - 1].column);

      targetTile.hostType = tile.hostType;
      tile.hostType = ' ';

      this[_updateCellImage](tile);
      this[_updateCellImage](targetTile);
    }
  }

  doPreviousMovement(movement) {
    debugger
    for (let i = movement.length - 1; i >= 0; i--) {
      // update the tile
      let x = movement[i].row + xDirection;
      let y = movement[i].column + yDirection;
      let tile = this[_map].getTile(movement[i].row, movement[i].column);
      let targetTile = this[_map].getTile(x, y);

      targetTile.hostType = tile.hostType;
      tile.hostType = ' ';

      this[_updateCellImage](tile);
      this[_updateCellImage](targetTile);
    }
  }

  [_updateCellImage](tile) {
    let tileImage = this[_table].rows[tile.row].cells.item(tile.column).firstChild;
    tileImage.src = `./images/${tile.tileImage}`;
  }
}