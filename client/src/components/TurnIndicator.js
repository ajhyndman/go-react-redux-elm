import React from 'react';
import PropTypes from 'prop-types';

import C from '../utils/constants';
import store from '../store';
import Stone from './Stone';

const ConnectedTurnIndicator = props =>
  <div
    style={{
      display: 'inline-block',
      height: props.size,
      position: 'relative',
      width: props.size,
    }}
  >
    <Stone color={props.color} />
  </div>;

ConnectedTurnIndicator.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

class TurnIndicator extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(
      function() {
        this.forceUpdate();
      }.bind(this),
    );
  }

  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const state = store.getState();
    return (
      <ConnectedTurnIndicator
        color={state.get('turn') === C.BLACK ? 'black' : 'white'}
        {...this.props}
      />
    );
  }
}

export default TurnIndicator;
