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
import React from "react";
import styled from "styled-components";

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

const OperateBy = styled.span``;

function Donation() {
    const [amount, setAmount] = React.useState("20");
    const [isAmountError, setIsAmountError] = React.useState(false);
    const classes = useStyles();
    const onAmountChangeHandler = (event) => {
        const value = event.target.value;

        setAmount(value);
        setIsAmountError(Number.isNaN(+value) ? true : false);
    };
    const onDonateClickHandler = (event) => {
        event.preventDefault();
        const form = document.querySelector("#omise");

        // @ts-ignore
        // eslint-disable-next-line no-undef
        OmiseCard.configure({
            publicKey: "pkey_test_5l9ewesw6om0qxdj448",
        });
        // @ts-ignore
        // eslint-disable-next-line no-undef
        OmiseCard.open({
            // @ts-ignore
            amount: amount * 100,
            currency: "THB",
            defaultPaymentMethod: "credit_card",
            onCreateTokenSuccess: (nonce) => {
                if (nonce.startsWith("tokn_")) {
                    // @ts-ignore
                    form.omiseToken.value = nonce;
                } else {
                    // @ts-ignore
                    form.omiseSource.value = nonce;
                }

                // @ts-ignore
                form.submit();
            },
        });
    };

    React.useEffect(() => {
        const script = document.createElement("script");

        script.src = "https://cdn.omise.co/omise.js";
        script.async = true;

        document.getElementById("omise").appendChild(script);

        return () => {
            document.getElementById("omise").removeChild(script);
        };
    }, []);

    return (
        <Paper variant="outlined" className={classes.paper}>
            <form
                id="omise"
                method="POST"
                action="http://localhost:4000/donate"
            >
                <input type="hidden" name="omiseToken" />
                <input type="hidden" name="omiseSource" />
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
                            Please fill in only number
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

export default Donation;
