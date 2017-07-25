// @flow

type Subscription = { unsubscribe: () => void };
type Next<T> = (event: T) => void;
type Start = (subscription: Subscription) => void;

type Observer<T> = {
  complete?: () => void,
  error?: (error: Error) => void,
  next?: Next<T>,
  start?: Start,
};

function wrapWithObserver<T>(
  observerOrNext: Observer<T> | Next<T>,
): Observer<T> {
  if (typeof observerOrNext !== 'function') return observerOrNext;
  return {
    next: observerOrNext,
  };
}

class Subject<T> {
  _observers: Set<Observer<T>>;
  constructor() {
    this._observers = new Set();
  }
  complete() {
    this._observers.forEach(observer => {
      if (observer.complete) observer.complete();
    });
  }
  error(error: Error) {
    this._observers.forEach(observer => {
      if (observer.error) observer.error(error);
    });
  }
  next(event: T) {
    this._observers.forEach(observer => {
      if (observer.next) observer.next(event);
    });
  }
  subscribe(observerOrNext: Observer<T> | Next<T>) {
    const observer = wrapWithObserver(observerOrNext);
    const subscription = {
      unsubscribe() {
        // observer.disconnect();
        this._observers.delete(observer);
      },
    };

    this._observers.add(observer);
    if (observer.start) observer.start(subscription);
    return subscription;
  }
  // $FlowIssue: Computed properties are not supported by flow yet.
  [Symbol.observable || '@@observable']() {
    return this;
  }
}

export default Subject;
