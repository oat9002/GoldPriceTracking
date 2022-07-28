import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import "./index.css";
import * as firebase from "./libs/firebase";
import goldPrice from "./reducers/goldPrice";
import registerServiceWorker from "./registerServiceWorker";

firebase.initializeFirebase();

const rootReducer = combineReducers({
    goldPrice: goldPrice,
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

registerServiceWorker();
