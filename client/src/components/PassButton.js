import React from 'react';
import PropTypes from 'prop-types';
import 'materialize-css';

import C from '../utils/constants';
import store from '../store';

const ConnectedPassButton = props =>
  <button
    className="waves-effect waves-light btn blue-grey darken-4"
    onClick={props.onClick}
  >
    Pass
  </button>;

ConnectedPassButton.propTypes = {
  onClick: PropTypes.func,
};

class PassButton extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

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

  onClick() {
    store.dispatch({ type: C.actionTypes.PASS });
  }

  render() {
    return <ConnectedPassButton onClick={this.onClick} />;
  }
}

export default PassButton;
