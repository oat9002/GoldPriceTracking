import {
    Box,
    Typography,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Price } from "./models/model";
import { RootReducer } from "./reducers/goldPrice";
import dayjs from "./util/Dayjs";
import { formatNumber } from "./util/Util";

function GoldTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const tableRef = React.useRef<HTMLDivElement>(null);
    const prices = useSelector<RootReducer, Price[]>((state) => state.goldPrice.prices);
    const rows = mapDataForTable(prices);
    const activePage = Math.min(page, Math.max(0, Math.ceil(rows.length / rowsPerPage) - 1));

    function mapDataForTable(goldPrices: Price[]) {
        if (goldPrices === null || goldPrices.length === 0) {
            return [];
        }

        return goldPrices.map((x) => {
            return {
                date: dayjs.tz(x.createdAt).format("DD MMM YYYY, HH:mm"),
                buy: formatNumber(x.buy),
                sell: formatNumber(x.sell),
            };
        });
    }

    function handleChangePage(newPage: number) {
        tableRef.current?.scrollIntoView({ block: "start" });
        setPage(newPage);
    }

    function handleChangeRowsPerPage(
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    function renderTableContent() {
        if (rows.length === 0) {
            return (
                <TableRow>
                    <TableCell align="center" colSpan={3}>
                        No price updates for this period.
                    </TableCell>
                </TableRow>
            );
        }

        return rows
            .slice(activePage * rowsPerPage, activePage * rowsPerPage + rowsPerPage)
            .map((row, idx) => (
                <TableRow key={idx} hover>
                    <TableCell
                        component="th"
                        scope="row"
                        sx={{ whiteSpace: "nowrap", fontWeight: 400 }}
                    >
                        {row.date}
                    </TableCell>
                    <TableCell align="right" sx={{ fontVariantNumeric: "tabular-nums" }}>
                        {row.buy}
                    </TableCell>
                    <TableCell align="right" sx={{ fontVariantNumeric: "tabular-nums" }}>
                        {row.sell}
                    </TableCell>
                </TableRow>
            ));
    }

    return (
        <Box ref={tableRef}>
            <Typography id="price-history-title" component="h2" variant="h6" gutterBottom>
                Price history
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Individual updates in THB. All times are Bangkok time.
            </Typography>
            <TableContainer tabIndex={0} role="region" aria-labelledby="price-history-title">
                <Table size="small" sx={{ minWidth: 300 }} aria-labelledby="price-history-title">
                    <TableHead>
                        <TableRow sx={{ bgcolor: "action.hover" }}>
                            <TableCell scope="col">Date</TableCell>
                            <TableCell scope="col" align="right">
                                Buy (THB)
                            </TableCell>
                            <TableCell scope="col" align="right">
                                Sell (THB)
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{renderTableContent()}</TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={activePage}
                backIconButtonProps={{
                    "aria-label": "Previous Page",
                }}
                nextIconButtonProps={{
                    "aria-label": "Next Page",
                }}
                onPageChange={(_, page) => handleChangePage(page)}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
}

export default GoldTable;
