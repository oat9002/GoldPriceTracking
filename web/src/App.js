import React, { Component } from 'react';
import Graph from './Graph';
import GoldTable from './Table';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daysBack: 5
    }
  }

  onChangeDaysBack = (days) => {
    this.setState({
      daysBack: days
    });
  }

  render() {
    return (
      <div className='content'>
        <div className='title'>
          History
        </div>
        <div className='graph'>
          <Graph daysBack={this.state.daysBack}/>
        </div>
        <div className='Table'>
          <GoldTable daysBack={this.state.daysBack} onChangeDaysBack={this.onChangeDaysBack}/> 
        </div>
      </div>
    );
  }
}

export default App;
