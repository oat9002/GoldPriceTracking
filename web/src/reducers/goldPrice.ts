import {
    SET_ERROR_NOTIFICATION,
    SET_GOLD_PRICE,
    SET_IS_LOADING,
    SET_NUMBER_OF_REC,
    SET_SUCCESS_NOTIFICATION,
} from "../actions/goldPrice";
import { Action } from "./../actions/goldPrice";
import { Notification, Price } from "./../models/model";

export interface RootReducer {
    goldPrice: RootState;
}

export interface RootState {
    numOfDay: number;
    prices: Price[];
    isLoading: boolean;
    notification?: Notification;
}

const initialState: RootState = {
    numOfDay: 3,
    prices: [],
    isLoading: false,
    notification: null,
};

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case SET_GOLD_PRICE:
            return {
                ...state,
                prices: action.payload.prices,
            };

        case SET_NUMBER_OF_REC:
            return {
                ...state,
                numOfDay: action.payload.numOfDay,
            };
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload.isLoading,
            };
        case SET_SUCCESS_NOTIFICATION:
        case SET_ERROR_NOTIFICATION:
            return {
                ...state,
                notification: action.payload.notification,
            };
        default:
            return state;
    }
};

export default reducer;
