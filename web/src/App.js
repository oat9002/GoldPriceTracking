import React, { Component } from 'react';
import Graph from './Graph';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='content'>
        <div className='title'>
          History
        </div>
        <div className='graph'>
          <Graph />
        </div>
      </div>
    );
  }
}

export default App;
