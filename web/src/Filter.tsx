import { FormControl, MenuItem, Select } from "@mui/material";
import * as firebase from "./libs/firebase";
import { setNumberOfDay } from "./reducers/goldPrice";
import { useAppDispatch, useAppSelector } from "./reduxHook";

function Filter() {
    const numOfDay = useAppSelector((state) => state.goldPrice.numOfDay);
    const dispatch = useAppDispatch();

    function onChangeHandler(value: string | number) {
        dispatch(setNumberOfDay(+value));

        firebase.logAnalyticEvent(firebase.eventName.click, {
            elementName: "filter",
            value,
        });
    }

    return (
        <FormControl size="small">
            <Select value={numOfDay} onChange={(event) => onChangeHandler(event.target.value)}>
                <MenuItem value={3}>Last 3 days</MenuItem>
                <MenuItem value={5}>Last 5 days</MenuItem>
                <MenuItem value={30}>Last 1 month</MenuItem>
                <MenuItem value={60}>Last 2 months</MenuItem>
                <MenuItem value={180}>Last 6 months</MenuItem>
                <MenuItem value={360}>Last 1 year</MenuItem>
                <MenuItem value={620}>Last 2 years</MenuItem>
            </Select>
        </FormControl>
    );
}

export default Filter;
