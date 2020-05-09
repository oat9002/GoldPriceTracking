import moment from "moment-timezone";
import React from "react";
import { useSelector } from "react-redux";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function Graph() {
    const fontFamily = "Roboto";
    const prices = useSelector((state) => state.goldPrice.prices);
    const graphData = getGraphData(prices);
    const { min, max } = getMaxAndMinPrice(prices);

    function getGraphData(rawData) {
        if (rawData === null || rawData.length === 0) {
            return [];
        }

        return rawData.map((element) =>
            Object.create({
                buy: element.buy,
                sell: element.sell,
                created_at: moment(element.created_at)
                    .tz("Asia/Bangkok")
                    .format("YYYY/MM/DD HH:mm"),
            })
        );
    }

    function getMaxAndMinPrice(rawData) {
        let price = {
            min: 0,
            max: 0,
        };

        rawData.forEach((element, idx) => {
            if (idx === 0) {
                price.min = element.buy;
                price.max = element.sell;
            } else {
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

    return (
        <ResponsiveContainer
            width={window.innerWidth * 0.97}
            height={window.innerHeight * 0.4}
        >
            <LineChart data={graphData}>
                <XAxis
                    dataKey="created_at"
                    tick={{ fontSize: "0.8em", fontFamily }}
                />
                <YAxis domain={[min, max]} tick={{ fontFamily }} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip wrapperStyle={{ fontFamily }} />
                <Legend wrapperStyle={{ fontFamily }} />
                <Line type="monotone" dataKey="buy" stroke="#56b8ff" />
                <Line type="monotone" dataKey="sell" stroke="#f4426b" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default React.memo(Graph);
