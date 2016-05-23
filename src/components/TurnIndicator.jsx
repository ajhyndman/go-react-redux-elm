import React from 'react';

import C from '../utils/constants';
import store from '../store';
import Stone from './Stone.jsx';


const ConnectedTurnIndicator = (props) => (
    <div style={{ display: 'inline-block', height: props.size, position: 'relative', width: props.size }}>
        <Stone color={props.color} />
    </div>
);

ConnectedTurnIndicator.propTypes = {
    color: React.PropTypes.string.isRequired,
    size: React.PropTypes.number.isRequired,
};

const TurnIndicator = React.createClass({
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
        return (
            <ConnectedTurnIndicator
                color={state.get('turn') === C.BLACK ? 'black' : 'white'}
                {...this.props}
            />
        );
    },
});


export default TurnIndicator;
