import React from 'react';
import 'materialize-css';

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
                        <div
                            style={{
                                color: '#222233',
                                left: '-2em',
                                position: 'absolute',
                                transform: 'translateX(-100%)',
                            }}
                        >
                            {i + 1}
                        </div>
                        {row.map((state, j) => (
                            <Intersection
                                col={j}
                                key={j}
                                row={i}
                                state={state}
                                width={size}
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
