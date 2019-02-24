const _tileMap = Symbol();
const _rows = Symbol();
const _columns = Symbol();
const _tileMapDimension = Symbol();
const _tileDimensionInPrecent = Symbol();
const _CalculateTileDimensionInPrecent = Symbol();

export class TableGrid {
  
  constructor(tileMap, tileMapWidth, tileMapHeight) {
    if (tileMap[0] === undefined || tileMap[0].constructor !== Array) {
      throw new Error('invalid tile map');
    }
    this[_tileMap] = tileMap;
    this[_rows] = this[_tileMap].length;
    this[_columns] = this[_tileMap][0].length;
    this[_tileMapDimension] = Math.min(tileMapWidth, tileMapHeight);
    this[_tileDimensionInPrecent] = this[_CalculateTileDimensionInPrecent]();
  }

  get tileMapDimension() {
    return this[_tileMapDimension];
  }

  get getTableTile() {
    let tableGrid = document.createElement('table');
    let tablebody = document.createElement('tbody');
    
    // Create the table body (rows, columns)
    for (let i = 0; i < this[_rows]; i++) {
      let tr = document.createElement('tr');
      for (let j = 0; j < this[_columns]; j++) {
        let td = document.createElement('td');
        let tile = document.createElement('img');
        tile.src = "./images/c.png";
        td.style.width = this[_tileDimensionInPrecent] + '%';
        td.style.height = this[_tileDimensionInPrecent] + '%';
        // td.style.display = 'inline-block';
        
        td.appendChild(tile);
        tr.appendChild(td);
      }
      tablebody.appendChild(tr);
    }
    tableGrid.appendChild(tablebody);

    return tableGrid;
  }

  [_CalculateTileDimensionInPrecent]() {
    let tileMapRib = Math.max(this[_rows], this[_columns]);
    let tileDimension = this[_tileMapDimension] / tileMapRib;
    let tileMapDimensionInPrecent = tileDimension / this[_tileMapDimension] * 100;
    return tileMapDimensionInPrecent;
  }

  updateTileMapDimension(height, width) {
    this[_tileMapDimension] = Math.min(height, width);
  }
}