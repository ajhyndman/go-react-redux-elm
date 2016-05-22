/* globals document */
import React from 'react';
import ReactDOM from 'react-dom';
import 'materialize-css';

import GoBoard from './components.jsx';


// Renders the game board
ReactDOM.render(
    <GoBoard />,
    document.getElementById('app')
);
