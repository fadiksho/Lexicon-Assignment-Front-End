import {
  SimpleEvent,
  GameEvent
} from './GameEvent';

const _historyMovement = Symbol();
const _maxMoveCount = Symbol();
const _indexMove = Symbol();
const _currentMoveCount = Symbol();
const _interval = Symbol();
const _isTimeRunning = Symbol();
const _startTimer = Symbol();
const _counter = Symbol();
const _updateTime = Symbol();
const _timeChangeEvent = Symbol();
const _indexMoveChangeEvent = Symbol();

export class GameControl {

  constructor() {
    this[_historyMovement] = [];
    this[_maxMoveCount] = 0;
    this[_currentMoveCount] = 0;
    this[_indexMove] = 0;
    this[_counter] = 0;
    this[_isTimeRunning] = false;
    // Register timeChangeEvent
    this[_timeChangeEvent] = new SimpleEvent('timeChangeEvent');
    GameEvent.events['timeChangeEvent'] = this[_timeChangeEvent];
    // Register indexMoveChangeEvent
    this[_indexMoveChangeEvent] = new SimpleEvent('indexMoveChangeEvent');
    GameEvent.events['indexMoveChangeEvent'] = this[_indexMoveChangeEvent];
  }

  [_updateTime]() {
    this[_counter] += 1;

    if (this[_counter] >= 60) {
      this[_counter] = 0;
      this[_minutes] += 1;
    }
    this[_seconds] = this[_counter];
  }

  stopTimer() {
    this[_isTimeRunning] = false;
    clearInterval(this[_interval]);
    GameEvent.dispatchEvent('timeChangeEvent');
  }

  [_startTimer]() {
    if (this[_isTimeRunning] === true) {
      return;
    }
    this[_isTimeRunning] = true;
    this[_interval] = setInterval(() => {
      this[_counter] += 1;
      GameEvent.dispatchEvent('timeChangeEvent');
    }, 1000);
  }

  // get the time
  get timeDuration() {
    let minutes = Math.floor(this[_counter] / 60);
    let seconds = this[_counter] % 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return `${minutes}:${seconds}`;
  }

  // get the current index move
  get indexMove() {
    return this[_indexMove];
  }
  // set the current index move
  set indexMove(value) {
    this[_indexMove] = value;
    // trigger the indexMoveChangeEvent
    GameEvent.dispatchEvent('indexMoveChangeEvent');
  }

  // get the max moves
  get maxMoveCount() {
    return this[_historyMovement].length;
  }

  // get all the moves history
  get history() {
    return this[_historyMovement];
  }

  // check if can navigate throw the (next || previous) moves
  canPlay(moveAmount) {
    let index = moveAmount + this.indexMove;

    if (index > 0 && index < this.maxMoveCount) {
      return true;
    }
    return false;
  }

  // save the move
  saveMove(movement) {
    // start the timer after the first move
    this[_startTimer]();
    // remove steps if there is once after the player moved
    this[_historyMovement] = this[_historyMovement].slice(
      0,
      this[_indexMove]
    );

    this[_historyMovement].push(movement);
    this.indexMove += 1;
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

  // reset
  reset() {
    this[_historyMovement] = [];
    this[_maxMoveCount] = 0;
    this[_currentMoveCount] = 0;
    this.indexMove = 0;
    this[_counter] = 0;
    this.stopTimer();
  }
}