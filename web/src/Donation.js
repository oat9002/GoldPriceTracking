import {
    Button,
    FormControl,
    FormHelperText,
    Input,
    InputAdornment,
    InputLabel,
    makeStyles,
    Paper,
    Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import * as actionCreators from "./actions/goldPrice";
import axios from "./util/Axios";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    paper: {
        position: "relative",
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
        marginTop: theme.spacing(5),
        padding: theme.spacing(5),
        textAlign: "right",
    },
    operateBy: {
        position: "absolute",
        bottom: theme.spacing(1),
        right: theme.spacing(5),
        color: theme.palette.grey[400],
    },
}));

function Donation(props) {
    const [amount, setAmount] = React.useState("100");
    const [isAmountError, setIsAmountError] = React.useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();
    const onAmountChangeHandler = (event) => {
        const value = event.target.value;

        setAmount(value);
        setIsAmountError(Number.isNaN(+value) || +value < 20 ? true : false);
    };
    const onDonateClickHandler = (event) => {
        event.preventDefault();
        const token = {
            omiseToken: null,
            omiseSource: null,
        };
        const realAmount = +amount * 100;

        // @ts-ignore
        // eslint-disable-next-line no-undef
        OmiseCard.configure({
            publicKey: "pkey_test_5l9ewesw6om0qxdj448",
        });
        // @ts-ignore
        // eslint-disable-next-line no-undef
        OmiseCard.open({
            // @ts-ignore
            amount: realAmount,
            currency: "THB",
            defaultPaymentMethod: "credit_card",
            otherPaymentMethods: "internet_banking,truemoney,rabbit_linepay",
            onCreateTokenSuccess: (nonce) => {
                if (nonce.startsWith("tokn_")) {
                    token.omiseToken = nonce;
                } else {
                    token.omiseSource = nonce;
                }

                dispatch(actionCreators.setIsLoading(true));

                axios
                    .post("/donate", {
                        description: "Donate for gold price tracking",
                        amount: realAmount,
                        currency: "THB",
                        token,
                    })
                    .then((res) => {
                        dispatch(actionCreators.setIsLoading(false));

                        if (
                            res.data.status === "pending" &&
                            res.data.authorizeUrl
                        ) {
                            window.location = res.data.authorizeUrl;
                        } else if (res.data.status === "successful") {
                            dispatch(
                                actionCreators.setSuccessNotification(
                                    "Donate complete"
                                )
                            );
                        } else {
                            dispatch(
                                actionCreators.setErrorNotification(
                                    `Donate failed, ${res.data.failureMessage}`
                                )
                            );
                        }
                    })
                    .catch(() => {
                        dispatch(actionCreators.setIsLoading(false));
                        dispatch(
                            actionCreators.setErrorNotification("Donate failed")
                        );
                    });
            },
        });
    };

    React.useEffect(() => {
        const script = document.createElement("script");

        script.src = "https://cdn.omise.co/omise.js";
        script.async = true;

        document.getElementById("omise").appendChild(script);

        if (props.complete) {
            dispatch(actionCreators.setSuccessNotification("Donate complete"));
        }

        return () => {
            document.getElementById("omise").removeChild(script);
            document.body.removeChild(
                document.getElementById("omise-checkout-iframe-app")
            );
        };
    }, [dispatch, props.complete]);

    return (
        <Paper variant="outlined" className={classes.paper}>
            <form id="omise">
                <FormControl
                    fullWidth
                    className={classes.margin}
                    error={isAmountError}
                >
                    <InputLabel htmlFor="standard-adornment-amount">
                        Amount
                    </InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        value={amount}
                        onChange={onAmountChangeHandler}
                        startAdornment={
                            <InputAdornment position="start">฿</InputAdornment>
                        }
                        error={isAmountError}
                    />
                    {isAmountError ? (
                        <FormHelperText id="component-error-text">
                            Please fill in only number and must be greater than
                            or equal to 20
                        </FormHelperText>
                    ) : null}
                </FormControl>
                <Button
                    type="submit"
                    id="checkoutButton"
                    variant="contained"
                    color="primary"
                    onClick={onDonateClickHandler}
                >
                    Donate
                </Button>
            </form>
            <Typography variant="caption" className={classes.operateBy}>
                by Omise
            </Typography>
        </Paper>
    );
}

Donation.propTypes = {
    complete: PropTypes.bool,
};

export default Donation;
