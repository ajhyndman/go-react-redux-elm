import Immutable from 'immutable';
import { createStore } from 'redux';

import C from './utils/constants';
import reducer from './reducer';



const initialState = Immutable.Map({
    turn: C.BLACK,
    board: Immutable.List(Immutable.Range(0, C.SIZE).map(() => (
        Immutable.List(Immutable.Range(0, C.SIZE).map(() => C.EMPTY))
    ))),
});

// Tracks only the current board state
const store = createStore(
    reducer,
    initialState
);


export default store;
