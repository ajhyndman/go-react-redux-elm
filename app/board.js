/*jslint devel: true */
/*eslint no-console: 0 */
import _ from 'underscore';

import range from './utils/range';


/*
 * board.js - Game logic for the board game Go
 */
class Board {
    constructor(size) {
        this.currentColor = Board.BLACK;
        this.size = size;
        this.board = this.createBoard(size);
        this.lastMovePassed = false;
        this.inAtari = false;
        this.attemptedSuicide = false;
    }
}

Board.EMPTY = 0;
Board.BLACK = 1;
Board.WHITE = 2;

/*
 * Returns a size x size matrix with all entries initialized to Board.EMPTY
 */
Board.prototype.createBoard = function (size) {
    return [...range(0, size)].map(() => (
        [...range(0, size)].map(() => Board.EMPTY)
    ));
};

/*
 * Switches the current player
 */
Board.prototype.switchPlayer = function () {
    this.currentColor =
        this.currentColor === Board.BLACK ? Board.WHITE : Board.BLACK;
};

/*
 * At any point in the game, a player can pass and let his opponent play
 */
Board.prototype.pass = function () {
    if (this.lastMovePassed) {
        this.endGame();
    }
    this.lastMovePassed = true;
    this.switchPlayer();
};

/*
 * Called when the game ends (both players passed)
 */
Board.prototype.endGame = function () {
    console.log('GAME OVER');
};

/*
 * Attempt to place a stone at (i,j). Returns true iff the move was legal
 */
Board.prototype.play = function (i, j) {
    console.log('Played at ' + i + ', ' + j);
    this.attemptedSuicide = this.inAtari = false;

    if (this.board[i][j] !== Board.EMPTY) {
        return false;
    }

    var color = this.board[i][j] = this.currentColor;
    var captured = [];
    var neighbors = this.getAdjacentIntersections(i, j);
    var atari = false;

    var self = this;
    _.each(neighbors, function (n) {
        var state = self.board[n[0]][n[1]];
        if (state !== Board.EMPTY && state !== color) {
            var group = self.getGroup(n[0], n[1]);
            console.log(group);
            if (group.liberties === 0) {
                captured.push(group);
            } else if (group.liberties === 1) {
                atari = true;
            }
        }
    });

    // detect suicide
    if (_.isEmpty(captured) && this.getGroup(i, j).liberties === 0) {
        this.board[i][j] = Board.EMPTY;
        this.attemptedSuicide = true;
        return false;
    }

    _.each(captured, function (group) {
        _.each(group.stones, function (stone) {
            self.board[stone[0]][stone[1]] = Board.EMPTY;
        });
    });

    if (atari) { this.inAtari = true; }

    this.lastMovePassed = false;
    this.switchPlayer();
    return true;
};

/*
 * Given a board position, returns a list of [i,j] coordinates representing
 * orthagonally adjacent intersections
 */
Board.prototype.getAdjacentIntersections = function (i, j) {
    var neighbors = [];
    if (i > 0) {
        neighbors.push([i - 1, j]);
    }
    if (j < this.size - 1) {
        neighbors.push([i, j + 1]);
    }
    if (i < this.size - 1) {
        neighbors.push([i + 1, j]);
    }
    if (j > 0) {
        neighbors.push([i, j - 1]);
    }
    return neighbors;
};

/*
 * Performs a breadth-first search about an (i,j) position to find recursively
 * orthagonally adjacent stones of the same color (stones with which it shares
 * liberties). Returns null for if there is no stone at the specified position,
 * otherwise returns an object with two keys: 'liberties', specifying the
 * number of liberties the group has, and 'stones', the list of [i,j]
 * coordinates of the group's members.
 */
Board.prototype.getGroup = function (i, j) {

    var color = this.board[i][j];
    if (color === Board.EMPTY) {
        return null;
    }

    var visited = {}; // for O(1) lookups
    var visitedList = []; // for returning
    var queue = [[i, j]];
    var count = 0;

    while (queue.length > 0) {
        var stone = queue.pop();
        if (visited[stone]) {
            continue;
        }

        var neighbors = this.getAdjacentIntersections(stone[0], stone[1]);
        var self = this;
        _.each(neighbors, function (n) {
            var state = self.board[n[0]][n[1]];
            if (state === Board.EMPTY) {
                count += 1;
            }
            if (state === color) { queue.push([n[0], n[1]]); }
        });

        visited[stone] = true;
        visitedList.push(stone);
    }

    return {
        'liberties': count,
        'stones': visitedList
    };
};


export default Board;
