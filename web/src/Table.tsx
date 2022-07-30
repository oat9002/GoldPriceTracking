import styled from "@emotion/styled";
import {
    Paper,
    styled as muiStyled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Filter from "./Filter";
import { theme } from "./libs/mui";
import { Price } from "./models/model";
import { RootReducer } from "./reducers/goldPrice";
import dayjs from "./util/Dayjs";
import { formatNumber } from "./util/Util";

const FilterWrapper = styled.div`
    text-align: right;
`;
const StyledTableCell = muiStyled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const StyledPaper = styled(Paper)`
    width: 100%;
    margin-top: ${theme.spacing(1)};
    overflow-x: "auto";
`;
const StyledTable = styled(Table)`
    min-width: 300px;
`;

function GoldTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const tableRef = React.useRef(null);
    const prices = useSelector<RootReducer, Price[]>((state) => state.goldPrice.prices);
    const rows = mapDataForTable(prices);

    function mapDataForTable(goldPrices: Price[]) {
        if (goldPrices === null || goldPrices.length === 0) {
            return [];
        }

        return goldPrices.map((x) => {
            return {
                date: dayjs.tz(x.createdAt).format("YYYY-MM-DD HH:mm"),
                buy: formatNumber(x.buy),
                sell: formatNumber(x.sell),
            };
        });
    }

    function handleChangePage(newPage: number) {
        window.scrollTo(0, tableRef.current.offsetTop);
        setPage(newPage);
    }

    function handleChangeRowsPerPage(
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) {
        setRowsPerPage(+event.target.value);
    }

    function renderTableContent() {
        if (rows.length === 0) {
            return (
                <TableRow>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">No data</TableCell>
                    <TableCell align="center"></TableCell>
                </TableRow>
            );
        }

        return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => (
            <TableRow key={idx}>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.buy}</TableCell>
                <TableCell align="center">{row.sell}</TableCell>
            </TableRow>
        ));
    }

    return (
        <div ref={tableRef}>
            <FilterWrapper>
                <Filter />
            </FilterWrapper>
            <StyledPaper>
                <StyledTable size="small">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Date</StyledTableCell>
                            <StyledTableCell align="center">Buy(baht)</StyledTableCell>
                            <StyledTableCell align="center">Sell(baht)</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{renderTableContent()}</TableBody>
                </StyledTable>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        "aria-label": "Previous Page",
                    }}
                    nextIconButtonProps={{
                        "aria-label": "Next Page",
                    }}
                    onPageChange={(_, page) => handleChangePage(page)}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </StyledPaper>
        </div>
    );
}

export default React.memo(GoldTable);
