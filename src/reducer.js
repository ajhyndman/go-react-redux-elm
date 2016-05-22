import C from './utils/constants';


/**
 * The store for this go board game is just one giant 2D array.
 *
 * Each entry in the grid represents the appState of that position on the board.
 * appStates may be: EMPTY, BLACK, or WHITE.
 *
 * e.g. (for a 3x3 board)
 * [
 *     [EMPTY, EMPTY, EMPTY],
 *     [EMPTY, BLACK, EMPTY],
 *     [WHITE, EMPTY, EMPTY],
 * ]
 *
 */


const reducer = function (appState, action) {
    switch (action.type) {
        case "PLACE_STONE":
            const turn = appState.get('turn');
            const positionState = appState.get('board')
                                          .get(action.row)
                                          .get(action.col);
            if (positionState === C.EMPTY) {
                return appState.withMutations((map) => (
                    map.setIn(['board', action.row, action.col], turn)
                        .set('turn', (turn === C.BLACK ? C.WHITE : C.BLACK))
                ));
            }
            return appState;
        case C.actionTypes.PASS:
            return appState.set('turn', (turn === C.BLACK ? C.WHITE : C.BLACK));
        default:
            return appState;
    }
};


export default reducer;
