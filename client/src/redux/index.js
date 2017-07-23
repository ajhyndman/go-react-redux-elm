// @flow
import Observable from 'zen-observable';

type Subscriber = () => void;

export function createStore<T>(
  reducer: (state?: T, action: Object) => T,
  init?: T,
) {
  // This is our primary event stream
  let actionObserver;
  const actionLog = new Observable(o => {
    actionObserver = o;
  });
  actionLog.subscribe(() => {
    // PASS
    // ES6 Observables require a subscriber, or they will not produce events.
  });

  // Map our primary event stream to a stream of events containing our
  // current "reduced" store state
  let state = reducer(init, { type: '@@redux/INIT' });
  const stateLog = actionLog.map(action => {
    state = reducer(state, action);
    return state;
  });

  // ES6 Observables may only have one subscriber at a time.  This means
  // that we must handle notifying multiple redux store ubscribers ourselves
  const storeSubscribers: Subscriber[] = [];
  stateLog.subscribe(() => {
    storeSubscribers.forEach(subscriber => {
      subscriber();
    });
  });

  return {
    dispatch(action: Object) {
      actionObserver.next(action);
    },
    getState() {
      return state;
    },
    subscribe(subscriber: Subscriber) {
      storeSubscribers.push(subscriber);
    },
  };
}
