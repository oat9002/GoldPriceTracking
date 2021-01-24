import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import MailIcon from "@material-ui/icons/Mail";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import React from "react";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
});

export default function TemporaryDrawer(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const onCloseHandler = () => {
        setOpen(false);
        props.onClose();
    };

    React.useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    const list = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={() => setOpen(false)}
            onKeyDown={() => setOpen(false)}
        >
            <List>
                {["Inbox", "Starred", "Send email", "Drafts"].map(
                    (text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    )
                )}
            </List>
        </div>
    );

    return (
        <Drawer anchor="right" open={open} onClose={onCloseHandler}>
            {list()}
        </Drawer>
    );
}
