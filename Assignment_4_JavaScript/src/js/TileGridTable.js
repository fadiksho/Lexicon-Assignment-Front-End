import { TileGrid } from './TileGrid.js';

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
        tile.src = `./images/${super.tileGrid[i][j].image}`;
        td.style.width = super.tileDimensionInPrecent + '%';
        td.style.height = super.tileDimensionInPrecent + '%';
        td.appendChild(tile);
        tr.appendChild(td);
      }
      tablebody.appendChild(tr);
    }
    tableGrid.appendChild(tablebody);

    return tableGrid;
  }
}
