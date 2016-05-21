import React from 'react';

import Board from './board';


const GRID_SIZE = 40;

const BoardIntersection = React.createClass({
    propTypes: {
        board: React.PropTypes.object.isRequired,
        col: React.PropTypes.array.isRequired,
        color: React.PropTypes.string.isRequired,
        onPlay: React.PropTypes.func.isRequired,
        row: React.PropTypes.array.isRequired,
    },
    handleClick: function() {
        if (this.props.board.play(this.props.row, this.props.col)) {
            this.props.onPlay();
        }
    },
    render: function() {
        var style = {
            top: this.props.row * GRID_SIZE,
            left: this.props.col * GRID_SIZE
        };

        var classes = 'intersection ';
        if (this.props.color !== Board.EMPTY) {
            classes += this.props.color === Board.BLACK ? 'black' : 'white';
        }

        return (
            <div
                onClick={this.handleClick}
                className={classes} style={style}
            />
        );
    }
});

const BoardView = function (props) {
    var intersections = [];
    for (var i = 0; i < props.board.size; i++)
        for (var j = 0; j < props.board.size; j++)
            intersections.push(
                <BoardIntersection
                    board={props.board}
                    color={props.board.board[i][j]}
                    row={i}
                    col={j}
                    onPlay={props.onPlay}
                />
            );
    var style = {
        width: props.board.size * GRID_SIZE,
        height: props.board.size * GRID_SIZE
    };
    return <div style={style} id="board">{intersections}</div>;
};

BoardView.propTypes = {
    board: React.PropTypes.object.isRequired,
    onPlay: React.PropTypes.func.isRequired,
};

const AlertView = function (props) {
    let text = '';
    if (props.board.in_atari) {
        text = 'ATARI!';
    } else if (props.board.attempted_suicide) {
        text = 'SUICIDE!';
    }

    return (
        <div id="alerts">{text}</div>
    );
};

AlertView.propTypes = {
    board: React.PropTypes.object.isRequired,
};

const PassView = React.createClass({
    propTypes: {
        board: React.PropTypes.object.isRequired,
    },
    handleClick: function(e) {
        this.props.board.pass();
    },
    render: function() {
        return (
            <input
                id="pass-btn"
                onClick={this.handleClick}
                type="button"
                value="Pass"
            />
        );
    }
});

const ContainerView = React.createClass({
    propTypes: {
        board: React.PropTypes.object.isRequired,
    },
    getInitialState: function() {
        return {'board': this.props.board};
    },
    onBoardUpdate: function() {
        this.setState({'board': this.props.board});
    },
    render: function() {
        return (
            <div>
                <AlertView board={this.state.board} />
                <PassView board={this.state.board} />
                <BoardView
                    board={this.state.board}
                    onPlay={this.onBoardUpdate}
                />
            </div>
        );
    }
});

export default ContainerView;
