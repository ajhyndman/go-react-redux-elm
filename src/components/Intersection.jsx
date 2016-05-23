import React from 'react';
import 'materialize-css';

import C from '../utils/constants';
import Stone from './Stone.jsx';
import store from '../store';


const ConnectedIntersection = (props) => (
    <div
        style={{
            float: 'left',
            lineHeight: '1',
            paddingTop: props.width + '%',
            position: 'relative',
            textAlign: 'center',
            width: props.width + '%',
        }}
    >
        <div
            onClick={props.onClick}
            style={{
                cursor: (props.state === C.EMPTY ? 'pointer' : 'auto'),
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            }}
        >
            <div
                style={{
                    background: '#63380E',
                    height: '1px',
                    position: 'absolute',
                    top: '50%',
                    right: 0,
                    left: 0,
                    transform: 'translateY(-50%)',
                }}
            />
            <div
                style={{
                    background: '#63380E',
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    bottom: 0,
                    transform: 'translateX(-50%)',
                    width: '1px',
                }}
            />
            {(function () {
                if (props.state === C.BLACK) {
                    return <Stone color="black" />;
                } else if (props.state === C.WHITE) {
                    return <Stone color="white" />;
                }
                return null;
            })()}
        </div>
    </div>
);

ConnectedIntersection.propTypes = {
    onClick: React.PropTypes.func,
    state: React.PropTypes.number.isRequired,
    turn: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
};

const Intersection = React.createClass({
    propTypes: {
        col: React.PropTypes.number.isRequired,
        row: React.PropTypes.number.isRequired,
    },
    shouldComponentUpdate: function (nextProps) {
        return nextProps !== this.props;
    },
    componentWillUnmount: function () {
        this.unsubscribe();
    },
    onClick: function () {
        store.dispatch({
            col: this.props.col,
            row: this.props.row,
            type: C.actionTypes.PLACE_STONE
        });
    },
    render: function () {
        return (
            <ConnectedIntersection
                {...this.props}
                turn={store.getState().get('turn')}
                onClick={this.onClick}
            />
        );
    },
});


export default Intersection;
