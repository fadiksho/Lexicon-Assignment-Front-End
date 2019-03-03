export class SimpleEvent {
  constructor(name) {
    this.name = name;
    this.handlers = [];
  }
  registerHandler(handler) {
    this.handlers.push(handler);
  }
}

let _events = {};
export class GameEvent {

  static get events() {
    return _events;
  }

  static registerEvent(eventName) {
    let GameEvent = new SimpleEvent(eventName);
    this.events[eventName] = GameEvent;

  }

  static addEventListener(eventName, handler) {
    this.events[eventName].registerHandler(handler);
  }

  static dispatchEvent(eventName) {
    this.events[eventName].handlers.forEach(function (callback) {
      callback();
    });
  }
}