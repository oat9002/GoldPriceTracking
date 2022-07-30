import { Snackbar } from "@material-ui/core";
import { Alert, Color } from "@material-ui/lab";
import React from "react";

interface NotificationProps {
    autoHideDuration?: number;
    severity: NotificationSeverity;
    variant: NotificationVariant | null;
    text: string;
}

export type NotificationVariant = "standard" | "filled" | "outlined";
export type NotificationSeverity = Color;

function Notification(props: NotificationProps) {
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
            <Alert onClose={handleClose} severity={props.severity} variant={props.variant}>
                {props.text}
            </Alert>
        </Snackbar>
    );
}

export default Notification;
