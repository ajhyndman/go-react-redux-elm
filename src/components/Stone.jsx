import React from 'react';


const Stone = (props) => (
    <div
        style={{
            background: (props.color === 'black' ? '#101015' : '#EEEEF0' ),
            borderRadius: 9001,
            boxShadow: (
                (props.color === 'black'
                    ? 'inset 0 5px 11px 0 rgba(255,255,255,.2),'
                    : 'inset 0 -5px 11px 0 rgba(0,0,0,.16),')
                + '0 2px 5px 0 rgba(0,0,0,.16),'
                + '0 2px 10px 0 rgba(0,0,0,.12)'
            ),
            position: 'absolute',
            top: '5%',
            right: '5%',
            bottom: '5%',
            left: '5%',
        }}
    />
);

Stone.propTypes = {
    color: React.PropTypes.string.isRequired,
};


export default Stone;
