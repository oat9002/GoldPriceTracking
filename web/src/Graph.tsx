import { useTheme } from "@mui/material/styles";
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
import { ValueType } from "recharts/types/component/DefaultTooltipContent";
import { Price } from "./models/model";
import { useAppSelector } from "./reduxHook";
import dayjs from "./util/Dayjs";

interface GraphData {
    buy: number;
    sell: number;
    createdAt: string;
}

function Graph({ range }: { range: number }) {
    const theme = useTheme();
    const fontFamily = theme.typography.fontFamily;
    const prices = useAppSelector((state) => state.goldPrice.prices);
    const numOfDay = range;

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

    const graphData = getGraphData(prices);
    const { min, max } = getMaxAndMinPrice(prices);

    const dataFormater = (value: ValueType) => Intl.NumberFormat("en").format(value as number);

    return (
        <ResponsiveContainer width="100%" height={320} minWidth={0}>
            <LineChart
                accessibilityLayer
                data={graphData}
                margin={{ top: 12, right: 12, bottom: 8, left: 4 }}
            >
                <XAxis
                    dataKey="createdAt"
                    minTickGap={48}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                        fontSize: theme.typography.caption.fontSize,
                        fontFamily,
                        fill: theme.palette.text.secondary,
                    }}
                />
                <YAxis
                    domain={[min, max]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontFamily, fill: theme.palette.text.secondary }}
                    tickFormatter={dataFormater}
                />
                <CartesianGrid
                    vertical={false}
                    strokeDasharray="3 3"
                    stroke={theme.palette.divider}
                />
                <Tooltip
                    wrapperStyle={{ fontFamily }}
                    formatter={dataFormater}
                    contentStyle={{
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        border: 0,
                        borderRadius: theme.shape.borderRadius,
                    }}
                />
                <Legend wrapperStyle={{ fontFamily }} />
                <Line
                    type="monotone"
                    dataKey="buy"
                    name="Buy (THB)"
                    dot={graphData.length === 1}
                    stroke={theme.palette.primary.main}
                    strokeWidth={2}
                    isAnimationActive={false}
                />
                <Line
                    type="monotone"
                    dataKey="sell"
                    name="Sell (THB)"
                    dot={graphData.length === 1}
                    stroke={theme.palette.grey[600]}
                    strokeWidth={2}
                    strokeDasharray="6 4"
                    isAnimationActive={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default Graph;
