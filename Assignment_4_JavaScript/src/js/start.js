
import {
  Sokoban
} from './Sokoban.js';
import { GameEvent } from './GameEvent.js';

// #region Dom elements
let gridRender = document.getElementById('gridRenderingEnginesId');
let gridRenderEngines = gridRender.getElementsByTagName('button');
let gameContainer = document.getElementById('gameContainerId');
let renderContainer = document.getElementById('renderContainerId');
let renderEngine = document.getElementById('renderEngineId');
let levelSelect = document.getElementById('levelSelectId');
let movesHistoryButtons = document.getElementById('movesHistoryButtonsId').getElementsByTagName('button');
let restartButton = document.getElementById('restartButtonId');
let movementIndex = document.getElementById('movementIndexId');
let time = document.getElementById('timeId');
// #endregion

// variable to keep track the height and width of the tileMap and the selected rendering
let gridHeight = (document.documentElement.clientHeight, window.innerHeight || 0);
let gridWidth = renderContainer.clientWidth;
let selectedRenderingEngine = "table";

// Initial Table Grid
const sokoban = new Sokoban(gridWidth, gridHeight);

// default to tableRendering
render(selectedRenderingEngine);

// Add event when level is changed
levelSelect.addEventListener('change', function() {
  sokoban.selectMap(levelSelect.value);
  render(selectedRenderingEngine);
});

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

      sokoban.setRenderEngine(selectedRenderingEngine);
    }
  });
}

// Add click event for the moves buttons
for (let i = 0; i < movesHistoryButtons.length; i++) {
  movesHistoryButtons[i].addEventListener('click', function () {
    const moveAmount = movesHistoryButtons[i].getAttribute("move-amount");
    sokoban.playMove(parseInt(moveAmount));
    movementIndex.innerText = sokoban.gameControl.indexMove;
  });
}
// Update the render engine dimension when resize
window.addEventListener('resize', function () {
  gridHeight = (document.documentElement.clientHeight, window.innerHeight || 0);
  gridWidth = renderContainer.clientWidth;
  sokoban.tileGrid.updateTileGridDimension(gridHeight, gridWidth);
  setRenderEngineDimension();
}, true);
// key event only for the game board
gameContainer.addEventListener('keydown', function (e) {
  captureKey(e);
});
// Restart Button
restartButton.addEventListener('click', function() {
  sokoban.restart();
  render(selectedRenderingEngine);
});
// Update Time
GameEvent.addEventListener('timeChangeEvent', function() {
  time.innerText = sokoban.gameControl.timeDuration;
});
GameEvent.addEventListener('indexMoveChangeEvent', function () {
  movementIndex.innerText = sokoban.gameControl.indexMove;
})
// Focus on the grid to recive key input after page load
window.addEventListener('load', function () {
  gameContainer.focus();
  // preload the image
  new Image().src = "./images/correct_box.png";;
});
// Map the keyboard keys to direction
function captureKey(keyBoardEvent) {
  keyBoardEvent.preventDefault();
  switch (keyBoardEvent.keyCode) {
    // left
    case 37:
      sokoban.move(0, -1);
      break;
      // top
    case 38:
      sokoban.move(-1, 0);
      break;
      // right
    case 39:
      sokoban.move(0, 1);
      break;
      // bottom
    case 40:
      sokoban.move(1, 0);
      break;
    default:
      break;
  }
}
// Draw the tileMap
function render(renderingEngine) {
  sokoban.setRenderEngine(renderingEngine);
  // clear the previouse render
  renderEngine.innerHTML = "";
  // create the table grid
  let tileMap = sokoban.createTileMap();
  // add the new render
  renderEngine.appendChild(tileMap);
  // set the width and height of the render
  setRenderEngineDimension();
}
// Set the width and height of the tileMap
function setRenderEngineDimension() {
  renderEngine.style.width = sokoban.tileGrid.tileGridDimension + 'px';
}