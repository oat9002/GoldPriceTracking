import React from 'react';
import moment from 'moment-timezone';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function Graph(props) {
  const fontFamily = 'Roboto';
  const graphData = getGraphData(props.prices);

  function getGraphData(rawData) {
    if (rawData === null || rawData.length === 0) {
      return [];
    }

    return rawData.map(element => Object.create({
      buy: element.buy,
      sell: element.sell,
      created_at: moment(element.created_at).tz('Asia/Bangkok').format('YYYY/MM/DD HH:mm')
    }));
  }


  return (
    <ResponsiveContainer width={window.innerWidth * 0.98} height={window.innerHeight * 0.4}>
      <LineChart data={graphData}>
        <XAxis dataKey="created_at" tick={{ fontSize: '0.8em', fontFamily }} />
        <YAxis domain={[props.minPrice, props.maxPrice]} tick={{ fontFamily }} />/>
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip wrapperStyle={{ fontFamily }} />
        <Legend wrapperStyle={{ fontFamily }} />
        <Line type="monotone" dataKey="buy" stroke="#56b8ff" />
        <Line type="monotone" dataKey="sell" stroke="#f4426b" />
      </LineChart>
    </ResponsiveContainer>
  );
}
