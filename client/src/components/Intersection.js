import React from 'react';
import PropTypes from 'prop-types';

import C from '../utils/constants';
import Stone from './Stone';
import store from '../store';

const ConnectedIntersection = function(props) {
  return (
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
          cursor: props.state === C.EMPTY ? 'pointer' : 'auto',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      >
        {props.isStarPoint
          ? <div
              style={{
                background: '#63380E',
                borderRadius: 9000,
                height: 6,
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 6,
              }}
            />
          : null}
        {/* Grid Lines */}
        <div
          style={{
            background: '#63380E',
            height: '1px',
            position: 'absolute',
            top: '50%',
            right: props.isRightEdge ? '50%' : 0,
            left: props.isLeftEdge ? '50%' : 0,
            transform: 'translateY(-50%)',
          }}
        />
        <div
          style={{
            background: '#63380E',
            position: 'absolute',
            left: '50%',
            top: props.isTopEdge ? '50%' : 0,
            bottom: props.isBottomEdge ? '50%' : 0,
            transform: 'translateX(-50%)',
            width: '1px',
          }}
        />
        {(function() {
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
};

ConnectedIntersection.propTypes = {
  isTopEdge: PropTypes.bool.isRequired,
  isRightEdge: PropTypes.bool.isRequired,
  isLeftEdge: PropTypes.bool.isRequired,
  isBottomEdge: PropTypes.bool.isRequired,
  isStarPoint: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  state: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

class Intersection extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onClick() {
    store.dispatch({
      col: this.props.col,
      row: this.props.row,
      type: C.actionTypes.PLACE_STONE,
    });
  }

  render() {
    return <ConnectedIntersection {...this.props} onClick={this.onClick} />;
  }
}

Intersection.propTypes = {
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
};

export default Intersection;
