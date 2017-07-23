// @flow
import Observable from 'zen-observable';

type Subscriber = () => void;

const SERVER_URI = 'ws://localhost:8080';

const socket = new WebSocket(SERVER_URI);

export function createStore<T>(
  reducer: (state?: T, action: Object) => T,
  init?: T,
) {
  // This is our primary event stream
  const next = action => {
    if (socket.readyState !== WebSocket.OPEN) return;
    socket.send(JSON.stringify(action));
  };

  const actionLog = new Observable(observer => {
    socket.addEventListener('message', message => {
      observer.next(JSON.parse(message.data));
    });
  });
  actionLog.subscribe(action => {
    // PASS
    // ES6 Observables require a subscriber, or they will not produce events.
    console.log(action.type, action);
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
      next(action);
    },
    getState() {
      console.log('getState was called, and returned:', state);
      return state;
    },
    subscribe(subscriber: Subscriber) {
      storeSubscribers.push(subscriber);
    },
  };
}
