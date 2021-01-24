import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import GitHub from "@material-ui/icons/GitHub";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import React from "react";

const useStyles = makeStyles({
    list: {
        width: 300,
    },
});

export default function TemporaryDrawer(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const onCloseHandler = () => {
        setOpen(false);
        props.onClose();
    };
    const githubOnClick = () => {
        window.open("https://github.com/oat9002/GoldPriceTracking", "_blank");
        setOpen(false);
        onCloseHandler();
    };

    const donateOnClick = () => {
        setOpen(false);
        onCloseHandler();
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
                <ListItem button onClick={githubOnClick}>
                    <ListItemIcon>
                        <GitHub />
                    </ListItemIcon>
                    <ListItemText primary="Github" />
                </ListItem>
                <ListItem button onClick={donateOnClick}>
                    <ListItemIcon>
                        <MonetizationOnIcon />
                    </ListItemIcon>
                    <ListItemText primary="Donate (comming soon)" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <Drawer anchor="right" open={open} onClose={onCloseHandler}>
            {list()}
        </Drawer>
    );
}
