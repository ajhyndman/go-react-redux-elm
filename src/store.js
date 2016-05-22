import Immutable from 'immutable';
import { createStore } from 'redux';

import C from './utils/constants';
import reducers from './reducers';
import range from './utils/range';


// Tracks only the current board state
const store = createStore(
    reducers,
    Immutable.Map({
        turn: C.BLACK,
        board: Immutable.List([...range(0, C.SIZE)].map(() => (
            Immutable.List([...range(0, C.SIZE)].map(() => C.EMPTY))
        ))),
    })
);


export default store;
