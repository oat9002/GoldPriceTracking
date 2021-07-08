import {
    SET_ERROR_NOTIFICATION,
    SET_GOLD_PRICE,
    SET_IS_LOADING,
    SET_NUMBER_OF_REC,
    SET_SUCCESS_NOTIFICATION,
} from "../actions/goldPrice";

const initialState = {
    numOfDay: 3,
    prices: [],
    isLoading: false,
    notification: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GOLD_PRICE:
            return {
                ...state,
                prices: action.prices,
            };

        case SET_NUMBER_OF_REC:
            return {
                ...state,
                numOfDay: action.numOfDay,
            };
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };
        case SET_SUCCESS_NOTIFICATION:
        case SET_ERROR_NOTIFICATION:
            return {
                ...state,
                notification: action.notification,
            };
        default:
            return state;
    }
};

export default reducer;
