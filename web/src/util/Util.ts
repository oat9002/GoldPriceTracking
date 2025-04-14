import { Price } from "../models/model";
import { getPricesLastByDay } from "../services/priceService";

export async function fetchGoldPrices(numOfDay: number): Promise<Price[]> {
    return getPricesLastByDay(numOfDay);
}

export function formatNumber(number: number, lang = "th-TH") {
    return number.toLocaleString(lang);
}

export const httpStatus = {
    ok: 200,
    internalServerError: 500,
    badRequest: 400,
};

export const notificationSeverity = {
    error: "error",
    success: "success",
};
