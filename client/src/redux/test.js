// @flow
/* eslint-env jest */
import Observable from 'zen-observable';

import { createStore } from '.';

describe('redux', () => {
  describe('createStore', () => {
    test('is a function', () => {
      expect(typeof createStore).toBe('function');
    });

    test('accepts a reducer and initial state', () => {
      const reducer = (state, action) => state;
      createStore(reducer, {});
    });

    test('store has a dispatch, getState and subscribe method', () => {
      const reducer = (state, action) => state;
      const store = createStore(reducer, {});

      expect(typeof store.dispatch).toBe('function');
      expect(typeof store.getState).toBe('function');
      expect(typeof store.subscribe).toBe('function');
    });

    test('store calls subscribe every time an action is dispatched', () => {
      const reducer = (state, action) => state;
      const store = createStore(reducer, {});
      const subscriber = jest.fn();
      store.subscribe(subscriber);

      store.dispatch({ type: 'ACTION' });
      expect(subscriber).toHaveBeenCalledTimes(1);

      store.dispatch({ type: 'ACTION' });
      store.dispatch({ type: 'ACTION' });
      store.dispatch({ type: 'ACTION' });
      expect(subscriber).toHaveBeenCalledTimes(4);
    });

    test('getState returns the reducer applied to the set of actions dispatched', () => {
      const Actions = {
        decrement: { type: 'DECREMENT' },
        increment: { type: 'INCREMENT' },
      };
      const init = { value: 0 };
      const reducer = (state = init, action) => {
        switch (action.type) {
          case Actions.decrement.type:
            return { value: state.value - 1 };
          case Actions.increment.type:
            return { value: state.value + 1 };
          default:
            return state;
        }
      };

      const store = createStore(reducer);

      const actionList = [
        Actions.increment,
        Actions.increment,
        Actions.increment,
        Actions.increment,
        Actions.increment,
      ];

      expect(store.getState()).toEqual(init);

      actionList.forEach(store.dispatch);

      expect(store.getState()).toEqual(actionList.reduce(reducer, init));
    });
  });
});

describe('playground', () => {
  describe('Observable', () => {
    test('.of emits arguments sequentially', () => {
      const log = Observable.of(1, 2, 3);

      const subscriber = jest.fn();

      log.subscribe(subscriber);

      expect(subscriber).toHaveBeenCalledTimes(3);
      expect(subscriber.mock.calls).toEqual([[1], [2], [3]]);
    });

    test('.from accepts a generator', () => {
      function* range(max: number) {
        for (let i = 0; i < max; i += 1) {
          yield i;
        }
        return;
      }
      const log = Observable.from(range(3));

      const subscriber = jest.fn();

      log.subscribe(subscriber);

      expect(subscriber).toHaveBeenCalledTimes(3);
      expect(subscriber.mock.calls).toEqual([[0], [1], [2]]);
    });

    test('Constructor form accepts a function', () => {
      function* range(max: number) {
        for (let i = 0; i < max; i += 1) {
          yield i;
        }
        return;
      }
      const log = new Observable(observer => {
        const myRange = range(3);
        [...myRange].forEach(value => {
          observer.next(value);
        });
      });

      const subscriber = jest.fn();

      log.subscribe(subscriber);

      expect(subscriber).toHaveBeenCalledTimes(3);
      expect(subscriber.mock.calls).toEqual([[0], [1], [2]]);
    });

    test('Constructor form handles async events', () => {
      jest.useFakeTimers();

      const log = new Observable(observer => {
        setTimeout(() => observer.next(0), 1000);
        setTimeout(() => observer.next(1), 2000);
        setTimeout(() => observer.next(2), 3000);
      });

      const subscriber = jest.fn();
      log.subscribe(subscriber);

      expect(subscriber).toHaveBeenCalledTimes(0);

      jest.runAllTimers();
      expect(subscriber).toHaveBeenCalledTimes(3);
      expect(subscriber.mock.calls).toEqual([[0], [1], [2]]);
    });
  });

  test('Constructor form lets us bind observer to external variable', () => {
    jest.useFakeTimers();
    const subscriber = jest.fn();

    let observer;
    const log = new Observable(o => {
      observer = o;
    });

    log.subscribe(subscriber);
    observer.next('apple');

    expect(subscriber).toHaveBeenCalledTimes(1);
    expect(subscriber.mock.calls).toEqual([['apple']]);

    setTimeout(() => {
      observer.next('banana');
    }, 1000);

    jest.runAllTimers();
    expect(subscriber).toHaveBeenCalledTimes(2);
    expect(subscriber.mock.calls).toEqual([['apple'], ['banana']]);
  });

  test('can be reduced incrementally', () => {
    const Actions = {
      decrement: { type: 'DECREMENT' },
      increment: { type: 'INCREMENT' },
    };
    const init = { value: 0 };
    const reducer = (state = init, action) => {
      switch (action.type) {
        case Actions.decrement.type:
          return { value: state.value - 1 };
        case Actions.increment.type:
          return { value: state.value + 1 };
        default:
          return state;
      }
    };

    const actionList = [
      Actions.increment,
      Actions.increment,
      Actions.increment,
      Actions.increment,
      Actions.increment,
    ];
    const log = Observable.from(actionList);

    const subscriber = jest.fn();

    log.subscribe(subscriber);

    expect(subscriber).toHaveBeenCalledTimes(5);
    expect(subscriber).toHaveBeenCalledWith({ type: 'INCREMENT' });

    let state = init;
    const stateLog = log.map(next => {
      state = reducer(state, next);
      return state;
    });

    const stateSubscriber = jest.fn();
    stateLog.subscribe(stateSubscriber);
    expect(stateSubscriber).toHaveBeenCalledTimes(5);
    expect(stateSubscriber.mock.calls).toEqual([
      [{ value: 1 }],
      [{ value: 2 }],
      [{ value: 3 }],
      [{ value: 4 }],
      [{ value: 5 }],
    ]);
  });
});
