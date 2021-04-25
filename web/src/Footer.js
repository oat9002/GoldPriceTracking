import { Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexshrink: 0,
        paddingBottom: theme.spacing(2),
    },
    footer: {
        flexGrow: 1,
        paddingTop: theme.spacing(2),
    },
    footerHeader: {
        fontWeight: "bold",
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Divider />
            <div className={classes.footer}>
                <Grid container justify="space-around">
                    <Grid item>
                        <Typography gutterBottom>GoldPriceTracking</Typography>
                    </Grid>
                    <Grid item>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography
                                    className={classes.footerHeader}
                                    gutterBottom
                                >
                                    Resources
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Link to="/termsAndCondition">
                                    <Typography variant="body2" gutterBottom>
                                        Terms and Condition
                                    </Typography>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/privacyPolicy">
                                    <Typography variant="body2" gutterBottom>
                                        Privacy Policy
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Footer;
