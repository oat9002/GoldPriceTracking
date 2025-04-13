import { priceLastDay } from "../mock/mock";
import { Price } from "../models/model";
import { getPricesLastByDay } from "../services/priceService";

export async function fetchGoldPrices(numOfDay: number): Promise<Price[]> {
    if (isMock()) {
        return priceLastDay;
    }

    return getPricesLastByDay(numOfDay);
}

export function formatNumber(number: number, lang = "th-TH") {
    return number.toLocaleString(lang);
}

export function isMock() {
    return !import.meta.env.VITE_SERVER_URL || import.meta.env.VITE_SERVER_URL === "";
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
