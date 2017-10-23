import React, { Component } from 'react';
import Graph from './Graph';

class App extends Component {
  render() {
    return (
      <div>
        <div className='graph'>
          <Graph />
        </div>
        <div className='title'>
          Let's see the history
        </div>
      </div>
    );
  }
}

export default App;
