import { SET_GOLD_PRICE, SET_NUMBER_OF_REC } from "../actions/goldPrice";

const initialState = {
    numOfDay: 0,
    prices: [],
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
        default:
            return state;
    }
};

export default reducer;
