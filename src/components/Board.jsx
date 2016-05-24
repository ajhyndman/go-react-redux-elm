import React from 'react';
import 'materialize-css';

import C from '../utils/constants';
import Intersection from './Intersection.jsx';
import store from '../store';


const ConnectedBoard = function (props) {
    const size = 100 / props.board.size;

    return (
        <div className="row">
            <div
                className="card col s12 m8 push-m2 l6 push-l3"
                style={{ background: '#DCB771', padding: '12px' }}
            >
                {props.board.map((row, i) => (
                    <div
                        className="clearfix"
                        key={i}
                        style={{ height: size + '%', position: 'relative' }}
                    >
                        {row.map((state, j) => (
                            <Intersection
                                col={j}
                                key={j}
                                row={i}
                                state={state}
                                width={size}
                                isTopEdge={i === 0}
                                isRightEdge={j === C.SIZE - 1}
                                isBottomEdge={i === C.SIZE - 1}
                                isLeftEdge={j === 0}
                                isStarPoint={(
                                    ([3, C.SIZE - 4, (C.SIZE - 1) / 2].indexOf(i) >= 0)
                                    && ([3, C.SIZE - 4, (C.SIZE - 1) / 2].indexOf(j) >= 0)
                                )}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

ConnectedBoard.propTypes = {
    board: React.PropTypes.object.isRequired,
};

const Board = React.createClass({
    componentDidMount: function () {
        this.unsubscribe = store.subscribe(function () {
            this.forceUpdate();
        }.bind(this));
    },
    shouldComponentUpdate: function (nextProps) {
        return nextProps !== this.props;
    },
    componentWillUnmount: function () {
        this.unsubscribe();
    },
    render: function () {
        const state = store.getState();
        return <ConnectedBoard board={state.get('board')} />;
    },
});




export default Board;
