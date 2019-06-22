import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment-timezone';
import Filter from './Filter';
import axios from './util/Axios';
import './Table.css';

function GoldTable() {
    const classes = makeStyles(theme => ({
        root: {
            width: '100%',
            marginTop: theme.spacing(1),
            overflowX: 'auto',
        },
        table: {
            minWidth: 300,
        },
    }))();

    const [numOfRec, setNumOfRec] = React.useState(5);

    function mapDataForTable(goldPrices) {
        let data = goldPrices.map(x => Object.create({
            date: moment(x.created_at).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm'),
            buy: x.buy,
            sell: x.sell
        }));

        return data;
    }

    const rows = mapDataForTable([{ date: moment(), buy: 10, sell: 5 }, { date: moment(), buy: 10, sell: 5 }, { date: moment(), buy: 10, sell: 5 }]);

    return (
        <div className='table'>
            <div className="filter">
                <Filter setValue={setNumOfRec} />
            </div>
            <Paper className={classes.root}>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Date</TableCell>
                            <TableCell align='center'>Buy(baht)</TableCell>
                            <TableCell align='center'>Sell(baht)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, idx) => (
                            <TableRow key={idx}>
                                <TableCell align='center'>{row.date}</TableCell>
                                <TableCell align='center'>{row.buy}</TableCell>
                                <TableCell align='center'>{row.sell}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}

export default GoldTable;