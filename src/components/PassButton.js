import React from 'react';
import 'materialize-css';

import C from '../utils/constants';
import store from '../store';


const ConnectedPassButton = (props) => (
    <button
        className="waves-effect waves-light btn blue-grey darken-4"
        onClick={props.onClick}
    >
        Pass
    </button>
);

ConnectedPassButton.propTypes = {
    onClick: React.PropTypes.func,
};

const PassButton = React.createClass({
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
    onClick: function () {
        store.dispatch({ type: C.actionTypes.PASS });
    },
    render: function () {
        const state = store.getState();
        return <ConnectedPassButton onClick={this.onClick} />;
    },
});


export default PassButton;
