import {
    SET_ERR_MESSAGE,
    SET_GOLD_PRICE,
    SET_IS_LOADING,
    SET_NUMBER_OF_REC,
} from "../actions/goldPrice";

const initialState = {
    numOfDay: 0,
    prices: [],
    isLoading: false,
    errMsg: null,
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
        case SET_ERR_MESSAGE:
            return {
                ...state,
                errMsg: action.errMsg,
            };
        default:
            return state;
    }
};

export default reducer;
