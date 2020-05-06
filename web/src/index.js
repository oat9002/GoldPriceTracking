import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import App from "./App";
import notificationReducer from "./reducers/notification";
import registerServiceWorker from "./registerServiceWorker";

const rootReducer = combineReducers({
    notification: notificationReducer,
});

const logger = (store) => {
    return (next) => {
        return (action) => {
            console.log("[Middleware] Dispatching", action);
            const result = next(action);
            console.log("[Middle] next state", store.getState());
            return result;
        };
    };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(logger, thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();
