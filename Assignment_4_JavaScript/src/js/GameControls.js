const _historyMovement = Symbol();
const _maxMoveCount = Symbol();
const _currentIndex = Symbol();
const _currentMoveCount = Symbol();

export class GameControl {

  constructor() {
    this[_historyMovement] = [];
    this[_maxMoveCount] = 0;
    this[_currentMoveCount] = 0;
    this[_currentIndex] = 0;
  }

  get currentMoveCount() {
    return this[_currentIndex];
  }

  get maxMoveCount() {
    return this[_historyMovement].length;
  }

  canPlay(moveAmount) {
    let index = moveAmount + this.currentMoveCount;

    if (index >= 0 && index <= this.maxMoveCount) {
      return true;
    }
    return false;
  }

  get history() {
    return this[_historyMovement];
  }

  saveMove(movement) {
    this[_historyMovement].push(movement);
    this[_currentIndex] += 1;
    this[_currentMoveCount] = this[_currentIndex];
    this[_maxMoveCount] = this[_currentIndex];
  }

  getMove(value) {
    let moveIndex = this[_currentIndex] + value;
    return this[_historyMovement].slice(
      Math.min(this[_currentIndex], moveIndex),
      Math.max(this[_currentIndex], moveIndex)
    );
  }
}