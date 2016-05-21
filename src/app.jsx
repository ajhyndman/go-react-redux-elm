import Immutable from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import Redux from 'redux';
import ReactRedux from 'react-redux';

import reducers from './reducers';
import range from './utils/range';
import GoBoard from './components.jsx';


// Globals
const SIZE = 19;
const STATE = {
    empty: 0,
    black: 1,
    white: 2,
};

// Tracks only the current board state
const board = Redux.createStore(
    reducers,
    Immutable.List([...range(0, SIZE)].map(() => (
        Immutable.List([...range(0, SIZE)].map(() => STATE.empty))
    )))
);

// Renders the game board
ReactDOM.render(
    <ReactRedux.Provider store={board}>
        <GoBoard />
    </ReactRedux.Provider>,
    document.getElementById('app')
);
