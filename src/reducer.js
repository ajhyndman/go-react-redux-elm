import Immutable from 'immutable';

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

let prevState = Immutable.Map({});




// get the valid neighbours of the current point
const getNeighbours = function (board, point) {
    const up = { row: point.row - 1, col: point.col };
    const right = { row: point.row, col: point.col + 1 };
    const down = { row: point.row + 1, col: point.col };
    const left = { row: point.row, col: point.col - 1 };
    return [up, right, down, left].filter(
        // if the neighbour is inside the board
        (neighbour) => (
            (neighbour.row >= 0 && neighbour.row < board.size)
            &&
            (neighbour.col >= 0 && neighbour.col < board.get(neighbour.row).size)
        )
    );
};

// calculate the liberties of the group of a color at this point
// NOTE: This function *can* currently count liberties multiple times,
//       but it doesn't matter, because we only care if it's zero.
const getLiberties = function (board, point, color) {
    if (board.get(point.row).get(point.col) === C.VISITED) {
        return 0; // we already counted this point
    } else if (board.get(point.row).get(point.col) === C.EMPTY) {
        return 1; // point is a liberty
    } else if (board.get(point.row).get(point.col) !== color) {
        return 0; // point has an opposing stone in it
    }
    const neighbours = getNeighbours(board, point);
    const visitedBoard = board.setIn([point.row, point.col], C.VISITED);
    return neighbours.reduce(
        (liberties, neighbour) => liberties + getLiberties(visitedBoard, neighbour, color),
        0
    );
};

// find all of the stones connected to this one
const removeGroup = function (board, point) {
    const color = board.get(point.row).get(point.col);
    const removedThisStone = board.setIn([point.row, point.col], C.EMPTY);
    const neighbours = getNeighbours(board, point);
    return neighbours.reduce(
        (lastBoard, neighbour) => (
            lastBoard.get(neighbour.row).get(neighbour.col) === color
                ? removeGroup(lastBoard, neighbour)
                : lastBoard
        ),
        removedThisStone
    );
};





/**
 * Redux Reducer function
 */
const reducer = function (appState, action) {
    const player = appState.get('turn');
    const opponent = (player === C.BLACK ? C.WHITE : C.BLACK);
    switch (action.type) {
    case C.actionTypes.PLACE_STONE:
        const pointState = appState.get('board')
                                        .get(action.row)
                                        .get(action.col);
        const point = { row: action.row, col: action.col };
        if (pointState === C.EMPTY) {
            const placedStone = appState.withMutations((map) => (
                map.setIn(['board', action.row, action.col], player)
                    .set('turn', opponent)
            ));
            const neighbours = getNeighbours(placedStone.get('board'), point);
            const removedDeadStones = neighbours.reduce(
                (lastBoard, neighbour) => (
                    (lastBoard.get(neighbour.row).get(neighbour.col) === opponent
                        && getLiberties(lastBoard, neighbour, opponent) === 0)
                            ? removeGroup(lastBoard, neighbour)
                            : lastBoard
                ),
                placedStone.get('board')
            );
            const liberties = getLiberties(
                removedDeadStones,
                point,
                player
            );
            if (liberties === 0) {
                console.log('You have attempted suicide!');
                return appState;
            }
            const final = placedStone.set('board', removedDeadStones);
            if (final.get('board').equals(prevState.get('board'))) {
                console.log('You have invoked Ko.  You may not play here this turn.')
                return appState;
            }
            prevState = appState;
            return final;
        }
        return appState;
    case C.actionTypes.PASS:
        return appState.set('turn', (player === C.BLACK ? C.WHITE : C.BLACK));
    default:
        return appState;
    }
};


export default reducer;
