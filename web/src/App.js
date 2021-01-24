import "firebase/analytics";
import firebase from "firebase/app";
import Header from "Header";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionCreators from "./actions/goldPrice";
import "./App.css";
import Graph from "./Graph";
import Loading from "./Loading";
import Notification from "./Notification";
import GoldTable from "./Table";
import { fetchGoldPrices } from "./util/Util";

function App() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [errorMsg, setErrMsg] = React.useState(null);
    const numOfDay = useSelector((state) => state.goldPrice.numOfDay);
    const dispatch = useDispatch();
    const analytics = firebase.analytics();

    React.useEffect(() => {
        analytics.logEvent(
            firebase.analytics.EventName.SCREEN_VIEW.toString(),
            {
                screen_name: "Home",
            },
            null
        );
    }, [analytics]);

    React.useEffect(() => {
        setIsLoading(true);
        fetchGoldPrices(numOfDay)
            .then((goldPrices) => {
                dispatch(actionCreators.setGoldPrice(goldPrices));
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
                setErrMsg("Cannot fetch gold data. Please try again");
            });
    }, [dispatch, numOfDay]);

    return (
        <div className="content">
            {isLoading ? <Loading /> : null}
            <Header />
            <div className="graph">
                <Graph />
            </div>
            <div className="Table">
                <GoldTable />
            </div>
            {errorMsg ? (
                <Notification
                    text={errorMsg}
                    severity="error"
                    variant="filled"
                />
            ) : null}
        </div>
    );
}

export default App;
