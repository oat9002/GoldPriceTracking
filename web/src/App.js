import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <div className='graph'>
          <Graph></Graph>
        </div>
        <div className='title'>
          Let's see the history
        </div>
      </div>
    );
  }
}

export default App;
