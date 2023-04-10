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
        setNumberOfRec: (state, action: PayloadAction<number>) => {
            state.numOfDay = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setSuccessNotification: (state, action: PayloadAction<Notification>) => {
            state.notification = action.payload;
        },
        setErrorNotification: (state, action: PayloadAction<Notification>) => {
            state.notification = action.payload;
        },
    },
});

export default reducer.reducer;

export const {
    setGoldPrice,
    setNumberOfRec,
    setIsLoading,
    setSuccessNotification,
    setErrorNotification,
} = reducer.actions;
