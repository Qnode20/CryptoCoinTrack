import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Grid,
} from '@material-ui/core/';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ExchangeCoins } from '../../config/api';

const columns = [
  {
    id: 'name',
    label: 'Name',
    width: '20%',
    align: 'left',
    image: 'image',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'trust_score',
    label: 'Trust Score',
    width: '10%',
    align: 'center',
  },
  {
    id: 'trust_score_rank',
    label: 'Trust score rank',
    width: '10%',
    align: 'center',
  },
  {
    id: 'trade_volume_24h_btc',
    label: '24h volume ',
    width: '20%',
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'trade_volume_24h_btc_normalized',
    label: '24 Volume (Normalized)',
    width: '10%',
    align: 'center',
    format: (value) => value.toFixed(2),
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: '3rem',
    margin: '0 20px',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    boxShadow:
      'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
    color: theme.palette.text.secondary,
  },
  container: {
    display: 'flex',
    maxHeight: 500,
    padding: 'auto',
  },
}));

export default function ExchangeTable() {
  const [exchanges, setExchanges] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExchanges = async () => {
      const res = await axios.get(ExchangeCoins);
      setExchanges(res.data);
    };
    fetchExchanges();
    // return () => fetchExchanges.abort();
  }, []);

  // console.log(exchanges);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = () => {
    return exchanges.filter(
      (coin) =>
        coin.id.toLowerCase().includes(search) ||
        coin.name.toLowerCase().includes(search),
    );
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography
              variant="h5"
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                fontFamily: 'Helvetica',
              }}
            >
              Cryptocurrency Exchanges Ranking by Trust Score
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs sm={3}>
          <Paper className={classes.paper}>
            <TextField
              label="Search Exchange.."
              variant="outlined"
              style={{ display: 'flex' }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Paper>
        </Grid>

        <Grid item xs>
          <Paper className={classes.paper}>
            <TableContainer className={classes.container}>
              <Table>
                <TableHead stickyHeader aria-label="sticky table">
                  <TableBody>
                    <TableRow>
                      {columns.map((column, index) => (
                        <TableCell
                          key={index}
                          style={{
                            border: '1px solid #ccc',
                            backgroundColor: '#DDDDDD',
                            textAlign: 'center',
                            textTransform: 'capitalize',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                          }}
                        >
                          <div> {column.label}</div>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                  <TableBody>
                    {handleSearch()
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((row, index) => {
                        return (
                          <TableRow
                            key={index}
                            hover
                            onClick={() =>
                              navigate(`/exchange/${row.id}`)
                            }
                            role="checkbox"
                            tabIndex={-1}
                          >
                            {columns.map((column, index) => {
                              const value = row[column.id];
                              return (
                                <TableCell
                                  key={index}
                                  align={column.align}
                                  style={{
                                    border: '1px solid #DFDFDE',
                                    width: column.width,
                                  }}
                                >
                                  {column.format &&
                                  typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </TableHead>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 50, 100]}
              component="div"
              count={(handleSearch()?.length / 10).toFixed(0)}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
