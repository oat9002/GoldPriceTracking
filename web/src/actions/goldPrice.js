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

export const setErrMessage = (errMsg) => {
    return {
        errMsg,
        type: SET_ERR_MESSAGE,
    };
};

export const SET_GOLD_PRICE = "SET_GOLD_PRICE";
export const SET_NUMBER_OF_REC = "SET_NUMBER_OF_RECS";
export const SET_IS_LOADING = "SET_IS_LOADING";
export const SET_ERR_MESSAGE = "SET_ERR_MESSAGE";
