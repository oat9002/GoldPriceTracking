import React from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from 'moment-timezone';

const numberOfLatestPrices = 10;
const getLatestPricesUrl = "http://localhost:4000/prices?number=" + numberOfLatestPrices;//"https://6ef244bd.ngrok.io/prices?number=";

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prices: null
    };
    this.getGraphData = this.getGraphData.bind(this);
  }

  componentWillMount() {
    axios.get(getLatestPricesUrl)
      .then(res => {
        console.log(res);
        return this.getGraphData(res.data);  
      })
      .then(data => {
        this.setState({
          prices: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getGraphData(rawData) {
    let revisedData = [];
    if(rawData !== null && rawData.length !== 0) {
      rawData.forEach((element, idx) => {
        let date = moment(element.created_at).tz('Asia/Bangkok');
        revisedData[idx] = {
          buy: element.buy,
          sell: element.sell,
          created_at: date.format('L') + ' ' + date.format('LT')
        };
      }, this);
      return revisedData;
    }
    else {
      revisedData.push({
        buy: null,
        sell: null,
        created_at: null
      });
      return revisedData;
    }
  }
// TODO: Create Graph
  render() {
    return (
      <div>
        <LineChart width={730} height={250} data={this.state.prices}>
          <XAxis dataKey="created_at" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="buy" stroke="#8884d8" />
          <Line type="monotone" dataKey="sell" stroke="#82ca9d" />
        </LineChart>
      </div>
    );
  }
}
