import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import * as firebase from "./libs/firebase";
import { setNumberOfDay } from "./reducers/goldPrice";
import { useAppDispatch, useAppSelector } from "./reduxHook";

import { priceRanges } from "./util/PriceRange";

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
        <FormControl size="small" sx={{ minWidth: 170 }}>
            <InputLabel id="price-period-label">Time period</InputLabel>
            <Select
                labelId="price-period-label"
                label="Time period"
                value={numOfDay}
                onChange={(event) => onChangeHandler(event.target.value)}
            >
                {priceRanges.map((range) => (
                    <MenuItem key={range.value} value={range.value}>
                        {range.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default Filter;
