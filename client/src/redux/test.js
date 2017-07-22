// @flow
/* eslint-env jest */
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
