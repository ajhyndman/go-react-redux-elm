import React from 'react';

import Board from './Board.jsx';
import ControlPanel from './ControlPanel.jsx';


const Container = () => (
    <div>
        <div className="container">
            <Board />
        </div>
        <div
            className="page-footer blue-grey darken-2"
            style={{
                marginTop: 20,
                padding: 20,
            }}
        >
            <div className="container">
                <ControlPanel />
            </div>
        </div>
    </div>
);


export default Container;
