// @flow
/* eslint-env jest */
import Observable from 'zen-observable';

import Subject from './Subject';

describe('Subject', () => {
  test('has observable methods', () => {
    const subject = new Subject();

    expect(typeof subject.subscribe).toBe('function');
  });

  test('has observer methods', () => {
    const subject = new Subject();

    expect(typeof subject.complete).toBe('function');
    expect(typeof subject.error).toBe('function');
    expect(typeof subject.next).toBe('function');
  });

  test('can observe another observable', () => {
    const counter = Observable.from([0, 1, 2, 3]);
    const subject = new Subject();
    const mockObserver = jest.fn();

    subject.subscribe(mockObserver);
    counter.subscribe(subject);

    expect(mockObserver).toHaveBeenCalledTimes(4);
    expect(mockObserver.mock.calls).toEqual([[0], [1], [2], [3]]);
  });

  test('can be triggered programmatically', () => {
    const subject = new Subject();
    const mockObserver = jest.fn();

    subject.subscribe(mockObserver);

    subject.next(0);
    subject.next(1);
    subject.next(2);
    subject.next(3);

    expect(mockObserver).toHaveBeenCalledTimes(4);
    expect(mockObserver.mock.calls).toEqual([[0], [1], [2], [3]]);
  });

  test('will support multiple subscribers', () => {
    const subject = new Subject();
    const mockObserver = jest.fn();
    const mockObserver2 = jest.fn();

    subject.subscribe(mockObserver);
    subject.subscribe(mockObserver2);

    subject.next(0);
    subject.next(1);
    subject.next(2);
    subject.next(3);

    expect(mockObserver).toHaveBeenCalledTimes(4);
    expect(mockObserver.mock.calls).toEqual([[0], [1], [2], [3]]);
    expect(mockObserver2).toHaveBeenCalledTimes(4);
    expect(mockObserver2.mock.calls).toEqual([[0], [1], [2], [3]]);
  });
});
