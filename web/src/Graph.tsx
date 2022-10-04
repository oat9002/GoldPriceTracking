import React from "react";
import { useSelector } from "react-redux";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { ValueType } from "recharts/types/component/DefaultTooltipContent";
import { Price } from "./models/model";
import { RootReducer } from "./reducers/goldPrice";
import dayjs from "./util/Dayjs";

interface GraphData {
    buy: number;
    sell: number;
    createdAt: string;
}

function Graph() {
    const fontFamily = "Roboto";
    const prices = useSelector<RootReducer, Price[]>((state) => state.goldPrice.prices);
    const [width, setWidth] = React.useState(calculateWidth());
    const [height, setHeight] = React.useState(calculateHeight());
    const graphData = getGraphData(prices);
    const { min, max } = getMaxAndMinPrice(prices);
    const windowsResizeHandler = React.useCallback(() => {
        setWidth(calculateWidth());
        setHeight(calculateHeight());
    }, []);

    React.useEffect(() => {
        window.addEventListener("resize", windowsResizeHandler);
    }, [windowsResizeHandler]);

    function calculateHeight() {
        return window.innerHeight * 0.4;
    }

    function calculateWidth() {
        return window.innerWidth * 0.97;
    }

    function getGraphData(rawData: Price[]): GraphData[] {
        if (rawData === null || rawData.length === 0) {
            return [];
        }

        return rawData
            .map((element) => {
                return {
                    buy: element.buy,
                    sell: element.sell,
                    createdAt: dayjs.tz(element.createdAt).format("YYYY/MM/DD HH:mm"),
                };
            })
            .reverse();
    }

    function getMaxAndMinPrice(rawData: Price[]) {
        const price = {
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

    const dataFormater = (value: ValueType) => Intl.NumberFormat("en").format(value as number);

    return (
        <LineChart data={graphData} width={width} height={height}>
            <XAxis dataKey="createdAt" tick={{ fontSize: "0.8em", fontFamily }} />
            <YAxis domain={[min, max]} tick={{ fontFamily }} tickFormatter={dataFormater} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip wrapperStyle={{ fontFamily }} formatter={dataFormater} />
            <Legend wrapperStyle={{ fontFamily }} />
            <Line type="monotone" dataKey="buy" stroke="#56b8ff" />
            <Line type="monotone" dataKey="sell" stroke="#f4426b" />
        </LineChart>
    );
}

export default React.memo(Graph);
