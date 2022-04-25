import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ExchangeId } from '../../config/api';
import moment from 'moment';
import {
  Paper,
  makeStyles,
  Grid,
  // Typography,
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'base', label: 'Name', minWidth: 170 },
  { id: 'target', label: 'Target', minWidth: 100 },
  {
    id: 'target_coin_id',
    label: 'Target Coin',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'volume',
    label: 'Volume',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'timestamp',
    label: 'Time_Stamp',
    minWidth: 170,
    align: 'right',
    format: (value) => moment(value).format('YYYY-MM-DD HH:mm:ss'),
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: '3rem',
    margin: '0 20px',
  },
  paper: {
    textAlign: 'center',
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  container: {
    maxHeight: 430,
  },
  wrapper: {
    color: '#000',
    fontSize: '15px',
    fontFamily: 'Montserrat',
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    hyphens: 'auto',
    textAlign: 'left',
  },
}));

export default function ExchangePage() {
  const { id } = useParams();
  const [exchange, setExchange] = useState({});
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(ExchangeId(id));
      setExchange(result.data);
    };
    fetchData();
  }, [id]);

  console.log(exchange);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <p
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                fontFamily: 'Helvetica',
              }}
            >
              Cryptocurrency Exchanges
            </p>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <img
              src={exchange?.image}
              alt={exchange?.name}
              height="100"
              style={{ border: '1px solid gray' }}
            />
            <p
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              {exchange.name}
            </p>
          </Paper>

          <Grid item xs style={{ marginTop: '5px' }}>
            <Paper className={classes.paper}>
              <p className={classes.wrapper}>
                Facebook : {exchange?.facebook_url}
              </p>
              <p className={classes.wrapper}>
                Reddit :{exchange?.reddit_url}
              </p>
              <p className={classes.wrapper}>URL : {exchange?.url}</p>
              <p className={classes.wrapper}>
                Year established : {exchange?.year_established}
              </p>
              <p className={classes.wrapper}>
                Country : {exchange?.country}
              </p>
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column, index) => (
                      <TableCell
                        key={index}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(exchange?.tickers || [])
                    .slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          {columns.map((column, index) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                key={index}
                                align={column.align}
                              >
                                {column.format &&
                                column.id === 'timestamp'
                                  ? column.format(value)
                                  : column.format &&
                                    column.id === 'volume'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={(exchange?.tickers || []).length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.linkInfo}>
            <p>Facebook : </p>
            <p>{exchange?.facebook_url}</p>
            <p>Reddit :{exchange?.reddit_url}</p>
            <p>URL : {exchange?.url}</p>
            <p>Year established : {exchange?.year_established}</p>
            <p>Country : {exchange?.country}</p>
          </Paper>
        </Grid> */}

      {/* <Grid item xs>
          <Paper className={classes.paper}>
            {(exchange?.tickers || []).map((ticker, index) => {
              return (
                <div key={index}>
                  <p>Base : {ticker.base}</p>
                  <p>{ticker.timestamp}</p>
                </div>
              );
            })}
          </Paper>
        </Grid> */}
      {/* </Grid> */}
    </div>
  );
}
