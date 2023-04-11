import { configureStore } from "@reduxjs/toolkit";
import goldPriceReducer from "./reducers/goldPrice";

const store = configureStore({
    reducer: {
        goldPrice: goldPriceReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
