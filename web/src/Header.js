import { IconButton, makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { TableChart } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        paddingLeft: theme.spacing(1),
    },
}));

function Header() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h4">History</Typography>
                    <div className={classes.title}>
                        <TableChart fontSize="large" />
                    </div>
                    <IconButton color="inherit">
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
