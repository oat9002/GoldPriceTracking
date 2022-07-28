import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { HomeRounded } from "@material-ui/icons";
import DescriptionIcon from "@material-ui/icons/Description";
import GitHub from "@material-ui/icons/GitHub";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import PolicyIcon from "@material-ui/icons/Policy";
import React from "react";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
    list: {
        width: 300,
    },
});

function TemporaryDrawer(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
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
            window.open("https://github.com/oat9002/GoldPriceTracking", "_blank");
        });
    };

    const donateOnClick = () => {
        onMenuClickHandler(() => {
            window.open("https://www.buymeacoffee.com/oatto", "_blank");
        });
    };

    const homeOnClick = () => {
        onMenuClickHandler(() => {
            navigate("/");
        });
    };

    const termsAndConditionOnClick = () => {
        onMenuClickHandler(() => {
            navigate("/termsAndCondition");
        });
    };

    const privacyPolicyOnClick = () => {
        onMenuClickHandler(() => {
            navigate("/privacyPolicy");
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
                        <LocalCafeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Buy me a coffee" />
                </ListItem>
                <ListItem button onClick={termsAndConditionOnClick}>
                    <ListItemIcon>
                        <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="Terms and Condition" />
                </ListItem>
                <ListItem button onClick={privacyPolicyOnClick}>
                    <ListItemIcon>
                        <PolicyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Privacy policy" />
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

export default TemporaryDrawer;
