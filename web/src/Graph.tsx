import React from "react";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { ValueType } from "recharts/types/component/DefaultTooltipContent";
import { Price } from "./models/model";
import { useAppSelector } from "./reduxHook";
import dayjs from "./util/Dayjs";

interface GraphData {
    buy: number;
    sell: number;
    createdAt: string;
}

function Graph() {
    const fontFamily = "Roboto";
    const prices = useAppSelector((state) => state.goldPrice.prices);
    const numOfDay = useAppSelector((state) => state.goldPrice.numOfDay);
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
    }, [windowsResizeHandler, prices, numOfDay]);

    function calculateHeight() {
        return window.innerHeight * 0.4;
    }

    function calculateWidth() {
        return window.innerWidth * 0.97;
    }

    function median(values: number[]): number {
        if (values.length === 0) {
            return 0;
        }
        const sorted = [...values].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        if (sorted.length % 2 === 0) {
            return (sorted[mid - 1] + sorted[mid]) / 2;
        }
        return sorted[mid];
    }

    function getBucketKey(createdAt: number): string {
        const d = dayjs.tz(createdAt);

        if (numOfDay >= 365) {
            return d.format("M/YY");
        }
        if (numOfDay >= 60) {
            return d.startOf("week").format("D/M/YY");
        }
        if (numOfDay >= 30) {
            return d.format("D/M/YY");
        }
        return d.format("D/M/YY HH:mm");
    }

    function getGraphData(rawData: Price[]): GraphData[] {
        if (rawData === null || rawData.length === 0) {
            return [];
        }

        const data = [...rawData].reverse();
        const groups: Record<string, { buys: number[]; sells: number[] }> = {};

        data.forEach((el) => {
            const key = getBucketKey(el.createdAt);

            if (!groups[key]) {
                groups[key] = { buys: [], sells: [] };
            }

            groups[key].buys.push(el.buy);
            groups[key].sells.push(el.sell);
        });

        return Object.entries(groups).map(([date, { buys, sells }]) => ({
            buy: median(buys),
            sell: median(sells),
            createdAt: date,
        }));
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
