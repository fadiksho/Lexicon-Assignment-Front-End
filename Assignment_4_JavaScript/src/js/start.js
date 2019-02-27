import {
  TileGridTable
} from './TileGridTable.js';
import {
  tileMap01
} from './SokobanBase.js';

let selectedRenderingEngine = "table";

let gridRender = document.getElementById('gridRenderingEnginesId');
let gridRenderEngines = gridRender.getElementsByTagName('button');
let renderContainer = document.getElementById('renderContainerId');
let renderEngine = document.getElementById('renderEngineId');

let gridHeight = (document.documentElement.clientHeight, window.innerHeight || 0);
let gridWidth = renderContainer.clientWidth;

// Initial Table Grid
const tableGrid = new TileGridTable(tileMap01.mapGrid, gridWidth, gridHeight);

// Draw the table grid
render('table');

// Add click event for each rendering engine
for (let i = 0; i < gridRenderEngines.length; i++) {
  gridRenderEngines[i].addEventListener('click', function () {
    const renderingEngine = gridRenderEngines[i].getAttribute("toggle-rendering");
    if (renderingEngine !== selectedRenderingEngine) {
      // Remove active class from the old render engine
      gridRender.querySelector(`[toggle-rendering="${selectedRenderingEngine}"]`).classList.remove('active');
      // Add active class to the new rendering engine
      gridRenderEngines[i].classList.add('active');
      // Update the selected rendering engine
      selectedRenderingEngine = renderingEngine;

      render(selectedRenderingEngine);
    }
  });
}

// Update the render engine dimension when resize
window.addEventListener('resize', function () {
  gridHeight = (document.documentElement.clientHeight, window.innerHeight || 0);
  gridWidth = renderContainer.clientWidth;
  tableGrid.updateTileGridDimension(gridHeight, gridWidth);
  setRenderEngineDimension();
}, true);

// key event only for the game board
renderContainer.addEventListener('keydown', function (e) {
  captureKey(e);
});

function captureKey(keyBoardEvent) {
  keyBoardEvent.preventDefault();
  switch (keyBoardEvent.keyCode) {
    // left
    case 37:
      tableGrid.move(tableGrid.player.xPosition, tableGrid.player.yPosition, 0, -1);
      break;
      // top
    case 38:
      tableGrid.move(tableGrid.player.xPosition, tableGrid.player.yPosition, -1, 0);
      break;
      // right
    case 39:
      tableGrid.move(tableGrid.player.xPosition, tableGrid.player.yPosition, 0, 1);
      break;
      // bottom
    case 40:
      tableGrid.move(tableGrid.player.xPosition, tableGrid.player.yPosition, 1, 0);
      break;
    default:
      break;
  }
}

// draw the table grid
function render(renderingEngine) {
  // clear the previouse render
  renderEngine.innerHTML = "";
  // create the table grid
  let table = tableGrid.createTileMap();
  // add the new render
  renderEngine.appendChild(table);
  // set the width and height of the render
  setRenderEngineDimension();
}

function setRenderEngineDimension() {
  renderEngine.style.width = tableGrid.tileGridDimension + 'px';
  renderEngine.style.height = tableGrid.tileGridDimension + 'px';
}