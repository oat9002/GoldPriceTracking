import React from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment-timezone';

const numberOfLatestPrices = 50;
const getLatestPricesUrl = 'https://167d8d9e.ngrok.io/prices?number=' + numberOfLatestPrices; 

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prices: null,
      maxPrice: 0,
      minPrice: 0
    };
    this.getGraphData = this.getGraphData.bind(this);
    this.getMaxAndMinPrice = this.getMaxAndMinPrice.bind(this);
  }

  componentWillMount() {
    axios.get(getLatestPricesUrl)
      .then(res => {
        return this.getGraphData(res.data);  
      })
      .then(data => {
        this.setState({
          prices: data
        });
        return data;
      })
      .then(data => {
        return this.getMaxAndMinPrice(data);
      })
      .then(price => {
        this.setState({
          max: price.max,
          min: price.min
        })
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

  getMaxAndMinPrice(rawData) {
    let price = {
      min: 0,
      max: 0
    }
    rawData.forEach((element, idx) => {
      if(idx === 0) {
        price.min = element.buy;
        price.max = element.sell;
      }
      else {
        if(element.buy < price.min) {
          price.min = element.buy;
        }
        if(element.sell > price.max) {
          price.max = element.sell;
        }
      }
    })
    return price;
  }

  render() {
    return (  
      <ResponsiveContainer width={window.innerWidth * 0.8} height={window.innerHeight * 0.8}>
        <LineChart data={this.state.prices}>
          <XAxis dataKey="created_at" />
          <YAxis domain={[this.minPrice, this.maxPrice]} />/>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="buy" stroke="#56b8ff" />
          <Line type="monotone" dataKey="sell" stroke="#f4426b" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
