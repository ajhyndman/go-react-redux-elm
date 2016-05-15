import React from 'react';
import ReactDOM from 'react-dom';

import Board from './board';
import { ContainerView } from './components.jsx!';


let board = new Board(19);

ReactDOM.render(
    <ContainerView board={board} />,
    document.getElementById('app')
);
