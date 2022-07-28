import { notificationSeverity } from "../util/Util";
import { Price } from "./../models/model";

export interface Action {
    type: string;
    payload: any;
}

export const setGoldPrice = (prices: Price[]): Action => {
    return {
        payload: {
            prices,
        },
        type: SET_GOLD_PRICE,
    };
};

export const setNumberOfDay = (numOfDay: number): Action => {
    return {
        payload: {
            numOfDay,
        },
        type: SET_NUMBER_OF_REC,
    };
};

export const setIsLoading = (isLoading: boolean): Action => {
    return {
        payload: {
            isLoading,
        },
        type: SET_IS_LOADING,
    };
};

export const setErrorNotification = (message: string): Action => {
    return {
        payload: {
            notification: {
                message,
                severity: notificationSeverity.error,
            },
        },
        type: SET_ERROR_NOTIFICATION,
    };
};

export const setSuccessNotification = (message: string): Action => {
    return {
        payload: {
            notification: {
                message,
                severity: notificationSeverity.success,
            },
        },
        type: SET_SUCCESS_NOTIFICATION,
    };
};

export const SET_GOLD_PRICE = "SET_GOLD_PRICE";
export const SET_NUMBER_OF_REC = "SET_NUMBER_OF_RECS";
export const SET_IS_LOADING = "SET_IS_LOADING";
export const SET_SUCCESS_NOTIFICATION = "SET_SUCCESS_NOTIFICATION";
export const SET_ERROR_NOTIFICATION = "SET_ERROR_NOTIFICATION";
