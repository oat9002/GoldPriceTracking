import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as actionCreators from "./actions/goldPrice";
import Graph from "./Graph";
import * as firebase from "./libs/firebase";
import GoldTable from "./Table";
import { fetchGoldPrices } from "./util/Util";

const GraphWrapper = styled.div`
    position: relative;
    width: 90vw;
    margin-top: 3%;
`;
const TableWrapper = styled.div`
    margin: 0 8px 40px 8px;
`;

function Home() {
    // @ts-ignore
    const numOfDay = useSelector((state) => state.goldPrice.numOfDay);
    const dispatch = useDispatch();

    React.useEffect(() => {
        firebase.logAnalyticEvent(
            firebase.eventName.screenView,
            {
                screen_name: "Home",
            },
            null
        );
    }, []);

    React.useEffect(() => {
        dispatch(actionCreators.setIsLoading(true));
        fetchGoldPrices(numOfDay)
            .then((goldPrices) => {
                dispatch(actionCreators.setGoldPrice(goldPrices));
                dispatch(actionCreators.setIsLoading(false));
            })
            .catch(() => {
                dispatch(actionCreators.setIsLoading(false));
                dispatch(
                    actionCreators.setErrorNotification("Cannot fetch gold data. Please try again")
                );
            });
    }, [dispatch, numOfDay]);

    return (
        <>
            <GraphWrapper>
                <Graph />
            </GraphWrapper>
            <TableWrapper>
                <GoldTable />
            </TableWrapper>
        </>
    );
}

export default Home;
