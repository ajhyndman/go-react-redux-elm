import React from 'react';

import Board from './components/Board';
import ControlPanel from './components/ControlPanel';

const App = () =>
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
  </div>;

export default App;
