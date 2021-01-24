import React from "react";
import { useSelector } from "react-redux";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import dayjs from "./util/Dayjs";

function Graph() {
    const fontFamily = "Roboto";
    const prices = useSelector((state) => state.goldPrice.prices);
    const graphData = getGraphData(prices);
    const { min, max } = getMaxAndMinPrice(prices);

    function getGraphData(rawData) {
        if (rawData === null || rawData.length === 0) {
            return [];
        }

        return rawData
            .map((element) => {
                return {
                    buy: element.buy,
                    sell: element.sell,
                    createdAt: dayjs(element.createdAt).format(
                        "YYYY/MM/DD HH:mm"
                    ),
                };
            })
            .reverse();
    }

    function getMaxAndMinPrice(rawData) {
        let price = {
            min: 0,
            max: 0,
        };

        if (rawData === null || rawData.length === 0) {
            return price;
        }

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

    const dataFormater = (value) => Intl.NumberFormat("en").format(value);

    return (
        <LineChart
            data={graphData}
            width={window.innerWidth * 0.97}
            height={window.innerHeight * 0.4}
        >
            <XAxis
                dataKey="createdAt"
                tick={{ fontSize: "0.8em", fontFamily }}
            />
            <YAxis
                domain={[min, max]}
                tick={{ fontFamily }}
                tickFormatter={dataFormater}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip wrapperStyle={{ fontFamily }} formatter={dataFormater} />
            <Legend wrapperStyle={{ fontFamily }} />
            <Line type="monotone" dataKey="buy" stroke="#56b8ff" />
            <Line type="monotone" dataKey="sell" stroke="#f4426b" />
        </LineChart>
    );
}

export default React.memo(Graph);
