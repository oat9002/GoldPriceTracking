import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment-timezone";
import React from "react";
import Filter from "./Filter";
import "./Table.css";

function GoldTable(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const classes = makeStyles((theme) => ({
        root: {
            width: "100%",
            marginTop: theme.spacing(1),
            overflowX: "auto",
        },
        table: {
            minWidth: 300,
        },
    }))();
    const rows = mapDataForTable(props.prices);
    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    function mapDataForTable(goldPrices) {
        if (goldPrices === null || goldPrices.length === 0) {
            return [];
        }

        console.log(goldPrices);

        return goldPrices
            .map((x) =>
                Object.create({
                    date: moment(x.created_at)
                        .tz("Asia/Bangkok")
                        .format("YYYY-MM-DD HH:mm"),
                    buy: x.buy,
                    sell: x.sell,
                })
            )
            .reverse();
    }

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value);
    }

    function onFilterChangeHandler(value) {
        props.onChangeNumOfRec(value);
        setPage(0);
    }

    return (
        <div className="table">
            <div className="filter">
                <Filter setValue={onFilterChangeHandler} />
            </div>
            <Paper className={classes.root}>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">
                                Date
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Buy(baht)
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Sell(baht)
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row, idx) => (
                                <TableRow key={idx}>
                                    <TableCell align="center">
                                        {row.date}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.buy}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.sell}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
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
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

export default GoldTable;