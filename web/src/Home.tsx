import styled from "@emotion/styled";
import React from "react";
import Graph from "./Graph";
import GoldTable from "./Table";
import * as firebase from "./libs/firebase";
import { setErrorNotification, setGoldPrice, setIsLoading } from "./reducers/goldPrice";
import { useAppDispatch, useAppSelector } from "./reduxHook";
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
    const numOfDay = useAppSelector((state) => state.goldPrice.numOfDay);
    const dispatch = useAppDispatch();

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
        dispatch(setIsLoading(true));
        fetchGoldPrices(numOfDay)
            .then((goldPrices) => {
                dispatch(setGoldPrice(goldPrices));
                dispatch(setIsLoading(false));
            })
            .catch((err) => {
                console.error("Error fetching gold prices:", err);
                dispatch(setIsLoading(false));
                dispatch(setErrorNotification("Cannot fetch gold data. Please try again"));
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
