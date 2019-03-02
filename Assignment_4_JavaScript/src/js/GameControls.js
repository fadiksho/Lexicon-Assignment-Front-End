const _historyMovement = Symbol();
const _maxMoveCount = Symbol();
const _indexMove = Symbol();
const _currentMoveCount = Symbol();

export class GameControl {

  constructor() {
    this[_historyMovement] = [];
    this[_maxMoveCount] = 0;
    this[_currentMoveCount] = 0;
    this[_indexMove] = 0;
  }

  // get the current index move
  get indexMove() {
    return this[_indexMove];
  }
  // set the current index move
  set indexMove(value) {
    this[_indexMove] = value;
  }

  // get the max moves
  get maxMoveCount() {
    return this[_historyMovement].length;
  }

  // check if can navigate throw the (next || previous) moves
  canPlay(moveAmount) {
    let index = moveAmount + this.indexMove;

    if (index > 0 && index < this.maxMoveCount) {
      return true;
    }
    return false;
  }

  // get all the moves history
  get history() {
    return this[_historyMovement];
  }

  // save the move
  saveMove(movement) {
    // remove steps if there is once after the player moved
    this[_historyMovement] = this[_historyMovement].slice(
      0,
      this[_indexMove]
    );

    this[_historyMovement].push(movement);
    this[_indexMove] += 1;
  }

  // get a move or moves from the history
  getMove(value) {
    let moveIndex = this[_indexMove] + value;
    if (moveIndex < 0) {
      moveIndex = 0;
    } else if (moveIndex > this.maxMoveCount) {
      moveIndex = this.maxMoveCount;
    }
    let startIndex = Math.min(this[_indexMove], moveIndex);
    let endIndex = Math.max(this[_indexMove], moveIndex);
    this.indexMove = moveIndex;
    let array = this[_historyMovement].slice(
      startIndex, endIndex
    );
    
    return array;
  }
}