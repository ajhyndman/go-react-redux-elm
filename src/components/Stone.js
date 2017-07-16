import React from 'react';
import Dimensions from 'react-dimensions'


const Stone = function (props) {
    const w = props.containerWidth;

    return (
        <div
            style={{
                background: (props.color === 'black' ? '#101015' : '#EEEEF0' ),
                borderRadius: 9001,
                boxShadow: (
                    (props.color === 'black'
                        ? 'inset 0 ' + (w / 6) + 'px ' + (w / 3) + 'px 0 rgba(255,255,255,.2),'
                        : 'inset 0 ' + (-w / 6) + 'px ' + (w / 3) + 'px 0 rgba(0,0,0,.16),')
                    + '0 ' + (w / 12) + 'px ' + (w / 6) + 'px 0 rgba(0,0,0,.16),'
                    + '0 ' + (w / 12) + 'px ' + (w / 4) + 'px 0 rgba(0,0,0,.12)'
                ),
                position: 'absolute',
                top: '5%',
                right: '5%',
                bottom: '5%',
                left: '5%',
            }}
        />
    );
};

Stone.propTypes = {
    color: React.PropTypes.string.isRequired,
    containerWidth: React.PropTypes.number.isRequired,
};


export default Dimensions()(Stone);
