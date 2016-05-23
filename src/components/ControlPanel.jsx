import React from 'react';

import PassButton from './PassButton.jsx';
import TurnIndicator from './TurnIndicator.jsx';


const ControlPanel = () => (
    <div className="row" style={{ textAlign: 'center' }}>
        <div className="col s4" style={{ textAlign: 'center' }}>
            <TurnIndicator size={36} />
        </div>
        <div className="col s4" style={{ textAlign: 'center' }}>
            <PassButton />
        </div>
    </div>
);


export default ControlPanel;
