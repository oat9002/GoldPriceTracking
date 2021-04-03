import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { HomeRounded } from "@material-ui/icons";
import GitHub from "@material-ui/icons/GitHub";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import React from "react";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
    list: {
        width: 300,
    },
});

function TemporaryDrawer(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const onCloseHandler = () => {
        setOpen(false);
        props.onClose();
    };
    const onMenuClickHandler = (action) => {
        action();
        setOpen(false);
        onCloseHandler();
    };
    const githubOnClick = () => {
        onMenuClickHandler(() => {
            window.open(
                "https://github.com/oat9002/GoldPriceTracking",
                "_blank"
            );
        });
    };

    const donateOnClick = () => {
        onMenuClickHandler(() => {
            props.history.push("/donate");
        });
    };

    const homeOnClick = () => {
        onMenuClickHandler(() => {
            props.history.push("/");
        });
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
                <ListItem button onClick={homeOnClick}>
                    <ListItemIcon>
                        <HomeRounded />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
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
                    <ListItemText primary="Donate" />
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

export default withRouter(TemporaryDrawer);
