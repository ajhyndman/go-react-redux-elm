import React from 'react';
import ReactDOM from 'react-dom';

// import { range } from './utils';
import Board from './board';
import { ContainerView } from './components.jsx!';

// [...range(0, 10, 2)].forEach((value) => console.log(value));

var board = new Board(19);

ReactDOM.render(
    <ContainerView board={board} />,
    document.getElementById('app')
);
