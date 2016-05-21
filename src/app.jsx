import Immutable from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import Redux from 'redux';
import ReactRedux from 'react-redux';

import constants from './utils/constants';
import GoBoard from './components.jsx';
import reducers from './reducers';
import range from './utils/range';


// Globals
const SIZE = 19;

// Tracks only the current board state
const board = Redux.createStore(
    reducers,
    Immutable.List([...range(0, SIZE)].map(() => (
        Immutable.List([...range(0, SIZE)].map(() => constants.EMPTY))
    )))
);

// Renders the game board
ReactDOM.render(
    <ReactRedux.Provider store={board}>
        <GoBoard />
    </ReactRedux.Provider>,
    document.getElementById('app')
);
