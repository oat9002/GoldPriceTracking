import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React from "react";

function Filter(props) {
    const [numOfRec, setNumOfRec] = React.useState(10);

    function onChangeHandler(event) {
        setNumOfRec(event.target.value);
        if (props.setValue) {
            props.setValue(event.target.value);
        }
    }

    return (
        <Select value={numOfRec} onChange={onChangeHandler}>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={500}>500</MenuItem>
        </Select>
    );
}

export default Filter;
