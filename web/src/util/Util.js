import { priceLastDay } from "../mock/mock";
import axios from "./Axios";

export async function fetchGoldPrices(numOfDay) {
    if (isMock()) {
        return priceLastDay;
    }

    const response = await axios.get("/priceslastday?days=" + numOfDay);

    if (response.status !== httpStatus.ok) {
        console.log("Fetch gold price failed");
        return [];
    }

    return response.data;
}

export function formatNumber(number, lang = "th-TH") {
    return number.toLocaleString(lang);
}

export function isMock() {
    return !process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_SERVER_URL === "";
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
