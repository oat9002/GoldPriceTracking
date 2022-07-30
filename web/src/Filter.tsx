import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionCreators from "./actions/goldPrice";
import * as firebase from "./libs/firebase";
import { RootReducer } from "./reducers/goldPrice";

function Filter() {
    const numOfDay = useSelector<RootReducer, number>((state) => state.goldPrice.numOfDay);
    const dispatch = useDispatch();

    function onChangeHandler(event: React.ChangeEvent<{ name?: string; value: unknown }>) {
        dispatch(actionCreators.setNumberOfDay(+event.target.value));

        firebase.logAnalyticEvent(firebase.eventName.click, {
            elementName: "filter",
            value: event.target.value,
        });
    }

    return (
        <Select value={numOfDay} onChange={(event) => onChangeHandler(event)}>
            <MenuItem value={3}>Last 3 days</MenuItem>
            <MenuItem value={5}>Last 5 days</MenuItem>
            <MenuItem value={30}>Last 1 month</MenuItem>
            <MenuItem value={60}>Last 2 months</MenuItem>
            <MenuItem value={180}>Last 6 months</MenuItem>
            <MenuItem value={360}>Last 1 year</MenuItem>
            <MenuItem value={620}>Last 2 years</MenuItem>
        </Select>
    );
}

export default Filter;
