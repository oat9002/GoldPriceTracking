import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import "firebase/analytics";
import firebase from "firebase/app";
import React from "react";

function Filter(props) {
    const [numOfDay, setNumOfDay] = React.useState(0);
    const analytics = firebase.analytics();

    function onChangeHandler(event) {
        setNumOfDay(event.target.value);
        if (props.setValue) {
            props.setValue(event.target.value);
        }

        analytics.logEvent("filter_click", {
            value: event.target.value,
        });
    }

    return (
        <Select value={numOfDay} onChange={onChangeHandler}>
            <MenuItem value={0}>Today</MenuItem>
            <MenuItem value={1}>Last 1 day</MenuItem>
            <MenuItem value={2}>Last 2 days</MenuItem>
            <MenuItem value={3}>Last 3 days</MenuItem>
            <MenuItem value={5}>Last 5 days</MenuItem>
            <MenuItem value={30}>Last 1 month</MenuItem>
            <MenuItem value={60}>Last 2 months</MenuItem>
            <MenuItem value={180}>Last 6 months</MenuItem>
            <MenuItem value={360}>Last 1 year</MenuItem>
        </Select>
    );
}

export default Filter;
