import {
  GameEvent
} from './GameEvent';

const _table = Symbol();
const _updateCellImage = Symbol();
const _tileGrid = Symbol();
export class TileGridTable {

  constructor(tileGrid) {
    this[_tileGrid] = tileGrid;
    GameEvent.addEventListener('gameEndEvent', () => {
      this[_table].style.borderColor = '#008000';
    });
  }

  // the grid will be table cells with images
  createTileMap() {
    let tableGrid = document.createElement('table');
    // Create the table body (rows, columns)
    for (let i = 0; i < this[_tileGrid].tiles.length; i++) {
      let tr = document.createElement('tr');
      for (let j = 0; j < this[_tileGrid].tiles[i].length; j++) {
        let td = document.createElement('td');
        let tile = document.createElement('img');
        tile.src = `./images/${this[_tileGrid].tiles[i][j].tileImage}`;
        td.style.width = this[_tileGrid].tileDimensionInPrecent + '%';
        td.style.height = this[_tileGrid].tileDimensionInPrecent + '%';
        td.appendChild(tile);
        tr.appendChild(td);
      }
      tableGrid.appendChild(tr);
    }
    tableGrid.style.border = '2px solid #FFC107';

    this[_table] = tableGrid;
    return this[_table];
  }

  // sync the tile grid and table cell
  updateTiles(tiles) {
    tiles.forEach(tile => {
      this[_updateCellImage](tile);
    });
  }

  // updatet the cell
  [_updateCellImage](tile) {
    let tileImage = this[_table].rows[tile.row].cells.item(tile.column).firstChild;
    tileImage.src = `./images/${tile.tileImage}`;
  }
}