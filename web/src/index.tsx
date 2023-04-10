import { configureStore } from "@reduxjs/toolkit";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import * as firebase from "./libs/firebase";
import goldPriceReducer from "./reducers/goldPrice";
import registerServiceWorker from "./registerServiceWorker";

firebase.initializeFirebase();

const store = configureStore({
    reducer: {
        goldPrice: goldPriceReducer,
    },
});
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

registerServiceWorker();
