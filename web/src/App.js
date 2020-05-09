import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TableChart from "@material-ui/icons/TableChart";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionCreators from "./actions/goldPrice";
import "./App.css";
import Graph from "./Graph";
import Loading from "./Loading";
import GoldTable from "./Table";
import { fetchGoldPrices } from "./util/Util";

function App() {
    const [isLoading, setIsLoading] = React.useState(true);
    const numOfRec = useSelector((state) => state.goldPrice.numOfRec);
    const dispatch = useDispatch();

    React.useEffect(() => {
        setIsLoading(true);
        try {
            fetchGoldPrices(numOfRec).then((goldPrices) => {
                dispatch(actionCreators.setGoldPrice(goldPrices));
                setIsLoading(false);
            });
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }, [dispatch, numOfRec]);

    return (
        <div className="content">
            {isLoading ? <Loading /> : null}
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h4">History</Typography>
                    <span className="titleIcon">
                        <TableChart fontSize="large" />
                    </span>
                </Toolbar>
            </AppBar>
            <div className="graph">
                <Graph />
            </div>
            <div className="Table">
                <GoldTable />
            </div>
        </div>
    );
}

export default App;
