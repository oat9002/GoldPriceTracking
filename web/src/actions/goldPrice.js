import { notificationSeverity } from "../util/Util";

export const setGoldPrice = (prices) => {
    return {
        prices,
        type: SET_GOLD_PRICE,
    };
};

export const setNumberOfDay = (numOfDay) => {
    return {
        numOfDay,
        type: SET_NUMBER_OF_REC,
    };
};

export const setIsLoading = (isLoading) => {
    return {
        isLoading,
        type: SET_IS_LOADING,
    };
};

export const setErrorNotification = (message) => {
    return {
        notification: {
            message,
            severity: notificationSeverity.error,
        },
        type: SET_ERROR_NOTIFICATION,
    };
};

export const setSuccessNotification = (message) => {
    return {
        notification: {
            message,
            severity: notificationSeverity.success,
        },
        type: SET_SUCCESS_NOTIFICATION,
    };
};

export const SET_GOLD_PRICE = "SET_GOLD_PRICE";
export const SET_NUMBER_OF_REC = "SET_NUMBER_OF_RECS";
export const SET_IS_LOADING = "SET_IS_LOADING";
export const SET_SUCCESS_NOTIFICATION = "SET_SUCCESS_NOTIFICATION";
export const SET_ERROR_NOTIFICATION = "SET_ERROR_NOTIFICATION";
