import React from "react";
import { Alert, Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import Filter from "./Filter";
import PricePanelSkeleton from "./PricePanelSkeleton";
import dayjs from "./util/Dayjs";
import { formatNumber } from "./util/Util";
import { priceRanges } from "./util/PriceRange";
import Graph from "./Graph";
import GoldTable from "./Table";
import * as firebase from "./libs/firebase";
import { setGoldPrice, setIsLoading } from "./reducers/goldPrice";
import { useAppDispatch, useAppSelector } from "./reduxHook";
import { fetchGoldPrices } from "./util/Util";

function Home() {
    const numOfDay = useAppSelector((state) => state.goldPrice.numOfDay);
    const dispatch = useAppDispatch();
    const prices = useAppSelector((state) => state.goldPrice.prices);
    const isLoading = useAppSelector((state) => state.goldPrice.isLoading);
    const [error, setError] = React.useState(false);
    const [retry, setRetry] = React.useState(0);
    const [loadedRange, setLoadedRange] = React.useState<number | null>(null);
    const latest = prices?.[0];
    const rangeLabel = priceRanges.find((range) => range.value === loadedRange)?.label;
    const displayRange = loadedRange ?? numOfDay;
    const aggregation =
        displayRange >= 365
            ? "Monthly median prices"
            : displayRange >= 60
              ? "Weekly median prices"
              : displayRange >= 30
                ? "Daily median prices"
                : "Individual price updates";

    function changeLabel(value: number) {
        return Number.isFinite(value)
            ? `${value > 0 ? "+" : ""}${formatNumber(value)} THB since previous update`
            : "Change unavailable";
    }

    React.useEffect(() => {
        firebase.logAnalyticEvent(
            firebase.eventName.screenView,
            {
                screen_name: "Home",
            },
            null
        );
    }, []);

    React.useEffect(() => {
        let active = true;
        setError(false);
        dispatch(setIsLoading(true));
        fetchGoldPrices(numOfDay)
            .then((goldPrices) => {
                if (!active) return;
                dispatch(setGoldPrice(goldPrices ?? []));
                setLoadedRange(numOfDay);
                dispatch(setIsLoading(false));
            })
            .catch(() => {
                if (!active) return;
                dispatch(setIsLoading(false));
                setError(true);
            });
        return () => {
            active = false;
        };
    }, [dispatch, numOfDay, retry]);

    return (
        <Container maxWidth="lg" sx={{ py: 2 }}>
            <Stack spacing={3}>
                <Paper elevation={0} sx={{ p: 0 }}>
                    <Typography component="h1" variant="h5" gutterBottom>
                        Latest gold price
                    </Typography>
                    <Typography color="text.secondary">
                        {latest ? (
                            <>
                                Last price update:{" "}
                                <time dateTime={new Date(latest.createdAt).toISOString()}>
                                    {dayjs.tz(latest.createdAt).format("D MMM YYYY, HH:mm")}
                                </time>{" "}
                                (Bangkok time)
                            </>
                        ) : (
                            "Prices in Thai baht (THB). All times are Bangkok time."
                        )}
                    </Typography>
                    {latest && (
                        <Box
                            component="dl"
                            sx={{
                                display: "grid",
                                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                                gap: 2,
                                mb: 0,
                                mt: 2,
                            }}
                        >
                            {[
                                {
                                    label: "Buy price (THB)",
                                    price: latest.buy,
                                    change: latest.buyDifferent,
                                },
                                {
                                    label: "Sell price (THB)",
                                    price: latest.sell,
                                    change: latest.sellDifferent,
                                },
                            ].map((item) => (
                                <Box key={item.label}>
                                    <Typography component="dt" color="text.secondary">
                                        {item.label}
                                    </Typography>
                                    <Typography
                                        component="dd"
                                        variant="h3"
                                        sx={{
                                            m: 0,
                                            mt: 0.5,
                                            typography: { xs: "h4", sm: "h3" },
                                            fontWeight: 600,
                                            fontVariantNumeric: "tabular-nums",
                                        }}
                                    >
                                        {formatNumber(item.price)}
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color={
                                                item.change > 0
                                                    ? "success.dark"
                                                    : item.change < 0
                                                      ? "error.dark"
                                                      : "text.secondary"
                                            }
                                            sx={{ display: "block", mt: 0.5 }}
                                        >
                                            {changeLabel(item.change)}
                                        </Typography>
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Paper>
                <Paper elevation={0} sx={{ p: 0 }}>
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1.5}
                        sx={{
                            justifyContent: "space-between",
                            alignItems: { sm: "center" },
                            mb: 1,
                        }}
                    >
                        <Typography component="h2" variant="h6">
                            Price trend
                        </Typography>
                        <Filter />
                    </Stack>
                    {isLoading ? (
                        <PricePanelSkeleton />
                    ) : (
                        <>
                            {error && (
                                <Alert
                                    severity="error"
                                    sx={{ mb: 2 }}
                                    action={
                                        <Button
                                            color="inherit"
                                            onClick={() => setRetry((value) => value + 1)}
                                        >
                                            Retry
                                        </Button>
                                    }
                                >
                                    Could not load prices.{" "}
                                    {latest
                                        ? "Previous results remain visible."
                                        : "Try again to load prices."}
                                </Alert>
                            )}
                            {error && loadedRange !== null && (
                                <Typography
                                    role="status"
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 2 }}
                                >
                                    Showing previous results: {rangeLabel}.
                                </Typography>
                            )}
                            <Box component="section" aria-label="Gold price results">
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mt: 0, mb: 1 }}
                                >
                                    {aggregation}. Prices in THB.
                                </Typography>
                                {latest ? (
                                    <Graph range={displayRange} />
                                ) : (
                                    <Typography>
                                        {isLoading
                                            ? "Fetching price history…"
                                            : error
                                              ? "Price history unavailable."
                                              : "No prices found for this period. Choose a longer time period."}
                                    </Typography>
                                )}
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <GoldTable key={numOfDay} />
                            </Box>
                        </>
                    )}
                </Paper>
            </Stack>
        </Container>
    );
}

export default Home;
