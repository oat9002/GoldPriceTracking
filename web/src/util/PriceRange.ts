import dayjs from "./Dayjs";

export const priceRanges = [
    { value: 3, label: "Last 3 days", amount: 3, unit: "day" },
    { value: 5, label: "Last 5 days", amount: 5, unit: "day" },
    { value: 30, label: "Last 1 month", amount: 1, unit: "month" },
    { value: 60, label: "Last 2 months", amount: 2, unit: "month" },
    { value: 180, label: "Last 6 months", amount: 6, unit: "month" },
    { value: 365, label: "Last 1 year", amount: 1, unit: "year" },
    { value: 730, label: "Last 2 years", amount: 2, unit: "year" },
    { value: 1095, label: "Last 3 years", amount: 3, unit: "year" },
    { value: 1825, label: "Last 5 years", amount: 5, unit: "year" },
] as const;

export function getRangeStart(value: number, now = Date.now()): number {
    const range = priceRanges.find((range) => range.value === value);
    if (!range) throw new Error("Unknown price range");
    return dayjs.tz(now).subtract(range.amount, range.unit).startOf("day").valueOf();
}
