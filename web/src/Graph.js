import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment-timezone';
import { fetchGoldPrices } from './util/Util';

const numberOfLatestPrices = 50;

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prices: null,
      maxPrice: 0,
      minPrice: 0
    };
  }

  async componentDidMount() {
    try {
      const goldPrices = await fetchGoldPrices(numberOfLatestPrices);
      const maxAndMin = this.getMaxAndMinPrice(goldPrices);
      const graphData = this.getGraphData(goldPrices);

      this.setState({
        prices: graphData,
        max: maxAndMin.max,
        min: maxAndMin.min,
      });
    }
    catch (err) {
      console.log(err);
    }
  }

  getGraphData = (rawData) => {
    let revisedData = [];
    if (rawData !== null && rawData.length !== 0) {
      rawData.forEach((element, idx) => {
        let date = moment(element.created_at).tz('Asia/Bangkok');
        revisedData[idx] = {
          buy: element.buy,
          sell: element.sell,
          created_at: date.format('L')
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

  getMaxAndMinPrice = (rawData) => {
    let price = {
      min: 0,
      max: 0
    };

    rawData.forEach((element, idx) => {
      if (idx === 0) {
        price.min = element.buy;
        price.max = element.sell;
      }
      else {
        if (element.buy < price.min) {
          price.min = element.buy;
        }
        if (element.sell > price.max) {
          price.max = element.sell;
        }
      }
    });

    return price;
  }

  render() {
    const fontFamily = 'Roboto';

    return (
      <ResponsiveContainer width={window.innerWidth * 0.98} height={window.innerHeight * 0.4}>
        <LineChart data={this.state.prices}>
          <XAxis dataKey="created_at" tick={{ fontSize: '0.8em', fontFamily }} />
          <YAxis domain={[this.minPrice, this.maxPrice]} tick={{ fontFamily }} />/>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip wrapperStyle={{ fontFamily }} />
          <Legend wrapperStyle={{ fontFamily }} />
          <Line type="monotone" dataKey="buy" stroke="#56b8ff" />
          <Line type="monotone" dataKey="sell" stroke="#f4426b" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
