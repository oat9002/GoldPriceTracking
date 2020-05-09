export const setGoldPrice = (prices) => {
    return {
        prices,
        type: SET_GOLD_PRICE,
    };
};

export const setNumberOfRecord = (numOfRec) => {
    return {
        numOfRec,
        type: SET_NUMBER_OF_REC,
    };
};

export const SET_GOLD_PRICE = "SET_GOLD_PRICE";
export const SET_NUMBER_OF_REC = "SET_NUMBER_OF_RECS";
