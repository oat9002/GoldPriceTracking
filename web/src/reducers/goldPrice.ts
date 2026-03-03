import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Notification, Price } from "../models/model";

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

const reducer = createSlice({
    name: "goldPrice",
    initialState,
    reducers: {
        setGoldPrice: (state, action: PayloadAction<Price[]>) => {
            state.prices = action.payload;
        },
        setNumberOfDay: (state, action: PayloadAction<number>) => {
            const previousNumOfDay = state.numOfDay;
            state.numOfDay = action.payload;

            if (state.numOfDay < previousNumOfDay) {
                state.prices = state.prices.filter(
                    (price) => price.createdAt >= Date.now() - state.numOfDay * 24 * 60 * 60 * 1000
                );
            }
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setSuccessNotification: (state, action: PayloadAction<string>) => {
            state.notification = {
                message: action.payload,
                severity: "success",
            };
        },
        setErrorNotification: (state, action: PayloadAction<string>) => {
            state.notification = {
                message: action.payload,
                severity: "error",
            };
        },
    },
});

export default reducer.reducer;

export const {
    setGoldPrice,
    setNumberOfDay,
    setIsLoading,
    setSuccessNotification,
    setErrorNotification,
} = reducer.actions;
