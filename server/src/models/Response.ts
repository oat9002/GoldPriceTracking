import { Price } from "./Price";

interface ApiError {
    message: string;
}
interface ErrorResponse {
    error?: ApiError;
}
interface MessageResponse extends ErrorResponse {
    message: string;
}

export interface WelcomeResponse extends MessageResponse {}

export interface GetPricesResponse extends ErrorResponse {
    prices?: Price[];
}

export interface GetPricesLastDayResponse extends ErrorResponse {
    prices?: Price[];
}
export interface RetrieveAndSavePriceResponse extends ErrorResponse {
    isSuccess: boolean;
}

export interface DonateResponse extends ErrorResponse {}
