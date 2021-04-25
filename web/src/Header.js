import { IconButton, makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { TableChart } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { withRouter } from "react-router-dom";
import TemporaryDrawer from "./Drawer";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        paddingLeft: theme.spacing(1),
        cursor: "pointer",
    },
}));

function Header(props) {
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const classes = useStyles();
    const goToHome = () => props.history.replace("/");

    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography
                        variant="h4"
                        onClick={goToHome}
                        style={{ cursor: "pointer" }}
                    >
                        History
                    </Typography>
                    <div className={classes.title} onClick={goToHome}>
                        <TableChart fontSize="large" />
                    </div>
                    <IconButton
                        color="inherit"
                        onClick={() => setOpenDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <TemporaryDrawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            />
        </div>
    );
}

export default withRouter(Header);
