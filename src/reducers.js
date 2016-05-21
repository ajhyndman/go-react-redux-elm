import ReduxImmutable from 'redux-immutable';

import constants from './utils/constants';


/**
 * The store for this go board game is just one giant 2D array.
 *
 * Each entry in the grid represents the state of that position on the board.
 * States may be: EMPTY, BLACK, or WHITE.
 *
 * e.g. (for a 3x3 board)
 * [
 *     [EMPTY, EMPTY, EMPTY],
 *     [EMPTY, BLACK, EMPTY],
 *     [WHITE, EMPTY, EMPTY],
 * ]
 *
 */


const reducer = function (state, action) {
    switch (action.type) {
        case constants.actionTypes.PLACE_STONE:
            return state;
        case constants.actionTypes.PASS:
            return state;
        case default:
            return state;
    }

};


export default reducer;
