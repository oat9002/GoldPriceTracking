import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TableChart from "@material-ui/icons/TableChart";
import React, { PureComponent } from "react";
import "./App.css";
import Graph from "./Graph";
import Loading from "./Loading";
import GoldTable from "./Table";
import { fetchGoldPrices } from "./util/Util";

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            numOfRec: 10,
            prices: null,
            isLoading: false,
        };

        this.maxPrice = 0;
        this.minPrice = 0;
    }

    componentDidMount() {
        this.intializeGraphData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.numOfRec !== this.state.numOfRec) {
            this.intializeGraphData();
        }
    }

    onChangeNumOfRec = (days) => {
        this.setState({
            numOfRec: days,
        });
    };

    intializeGraphData = async () => {
        this.setState(
            {
                isLoading: true,
            },
            async () => {
                try {
                    const goldPrices = await fetchGoldPrices(
                        this.state.numOfRec
                    );
                    const maxAndMin = this.getMaxAndMinPrice(goldPrices);

                    this.maxPrice = maxAndMin.max;
                    this.minPrice = maxAndMin.min;

                    this.setState({
                        prices: goldPrices,
                        isLoading: false,
                    });
                } catch (err) {
                    console.log(err);
                }
            }
        );
    };

    getMaxAndMinPrice = (rawData) => {
        let price = {
            min: 0,
            max: 0,
        };

        rawData.forEach((element, idx) => {
            if (idx === 0) {
                price.min = element.buy;
                price.max = element.sell;
            } else {
                if (element.buy < price.min) {
                    price.min = element.buy;
                }
                if (element.sell > price.max) {
                    price.max = element.sell;
                }
            }
        });

        return price;
    };

    render() {
        return (
            <div className="content">
                {this.state.isLoading ? <Loading /> : null}
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="h4">History</Typography>
                        <span className="titleIcon">
                            <TableChart fontSize="large" />
                        </span>
                    </Toolbar>
                </AppBar>
                <div className="graph">
                    <Graph
                        prices={this.state.prices}
                        maxPrice={this.maxPrice}
                        minPrice={this.minPrice}
                    />
                </div>
                <div className="Table">
                    <GoldTable
                        numOfRec={this.state.numOfRec}
                        onChangeNumOfRec={this.onChangeNumOfRec}
                        prices={this.state.prices}
                    />
                </div>
            </div>
        );
    }
}

export default App;
