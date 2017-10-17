import React from 'react';
import axios from 'axios';
import { LineChart, Line } from 'recharts';

const numberOfLatestPrices = 10;

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prices: null
    };
  }

  componentWillMount() {
    axios.get('https://6ef244bd.ngrok.io/prices?number=' + numberOfLatestPrices).then(res => {
      this.setState({
        prices: res
      });
    });
  }
// TODO: Create Graph
  render() {
    return (
      <div>
        <LineChart width={} height={} data={}>
          <XAxis dataKey="time" />
          <YAxis dataKey="price"/>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        </LineChart>
      </div>
    );
  }
}
