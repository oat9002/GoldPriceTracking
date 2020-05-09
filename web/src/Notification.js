import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import PropTypes from "prop-types";
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

Notification.propTypes = {
    autoHideDuration: PropTypes.number,
    severity: PropTypes.oneOf(["warning", "success", "error", "info"]),
    text: PropTypes.string,
};

export default Notification;
