import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function CompareTable(props){
  const classes = useStyles();

  return(
    <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Stock Symbol</TableCell>
          <TableCell align="right">Open</TableCell>
          <TableCell align="right">High</TableCell>
          <TableCell align="right">Low</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.rows.map((row) => (
          <TableRow key={row.name}>
            <TableCell component="th" scope="row">
              {row.symbol}
            </TableCell>
            <TableCell align="right">{row["1. open"]}</TableCell>
            <TableCell align="right">{row["2. high"]}</TableCell>
            <TableCell align="right">{row["3. low"]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}