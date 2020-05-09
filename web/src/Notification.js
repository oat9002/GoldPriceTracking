import { Alert, Snackbar } from "@material-ui/core";
import React from "react";

function Notification(props) {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={props.autoHideDuration ?? 5000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={props.severity}>
                {props.text}
            </Alert>
        </Snackbar>
    );
}

export default Notification;
