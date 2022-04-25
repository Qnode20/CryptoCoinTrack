import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {
  TableCell,
  LinearProgress,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
  Grid,
} from '@material-ui/core';
import axios from 'axios';
import { CoinList } from '../../config/api';
import Banner from '../../components/Banner/Banner';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../../context/CryptoContext';
import { numberWithCommas } from '../../services/utils/format';
import SelectCurrency from '../../components/CurrencyMenuItem/SelectCurrency';

export default function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();

  const useStyles = makeStyles((theme) => ({
    root: {
      margin: '50px',
    },
    title: {
      display: 'flex',
      boxShadow:
        'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
    },
    banner: {
      height: '200',
      boxShadow:
        'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
      backgroundColor: 'transparent',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },

    currencySelection: {
      display: 'flex',
    },
    paperBox: {
      height: 300,
      margin: 10,
    },
    contentData: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: '10px',
      maxHeight: '500px',
    },
    row: {
      cursor: 'pointer',
      backgroundColor: '#A7BBC7',
      '&:hover': {
        backgroundColor: '#93B5C6',
      },
      fontFamily: 'Montserrat',
    },
    pagination: {
      '& .MuiPaginationItem-root': {
        color: 'black',
      },
    },
  }));

  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
      if (data.error) {
        console.log(data.error);
        setLoading(false);
        return;
      }
      setCoins(data);
      setLoading(false);
    };

    fetchCoins();
    // return () => fetchCoins.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search),
    );
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.title}>
            <Typography
              variant="inherit"
              style={{
                fontFamily: 'Montserrat',
                fontSize: '25px',
                margin: '10px',
                fontWeight: 'bold',
              }}
            >
              Cryptocurrency Prices by Market Cap
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={6} sm={6}>
          <Paper>
            <TextField
              label="Search For a Crypto Currency.."
              variant="outlined"
              style={{ display: 'flex' }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Paper>
        </Grid>

        <Grid item xs={3} sm={3}>
          <Paper
            style={{
              display: 'flex',
            }}
          >
            <SelectCurrency />
          </Paper>
        </Grid>

        <Grid item xs sm>
          <Paper style={{ backgroundColor: '#bbd9f57e' }}>
            {loading ? (
              <LinearProgress
                style={{ backgroundColor: '#143F6B' }}
              />
            ) : (
              <>
                <Banner />
              </>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.contentData}>
            <TableContainer>
              {loading ? (
                <LinearProgress
                  style={{
                    backgroundColor: '#D6E5FA',
                    height: '10px',
                  }}
                />
              ) : (
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {[
                        'Coin',
                        'Price',
                        '24h Change',
                        'Market Cap',
                      ].map((head, index) => (
                        <TableCell
                          style={{
                            textAlign: 'center',
                            fontFamily: 'Montserrat',
                            fontWeight: 'bold',
                          }}
                          key={index}
                        >
                          {head}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {handleSearch()
                      .slice((page - 1) * 10, (page - 1) * 10 + 10)
                      .map((row) => {
                        const profit =
                          row.price_change_percentage_24h > 0;
                        return (
                          <TableRow
                            onClick={() =>
                              navigate(`/coins/${row.id}`)
                            }
                            className={classes.row}
                            key={row.name}
                          >
                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '20px',
                                borderRight: profit
                                  ? '50px solid #97DBAE'
                                  : '50px solid #FD5D5D',
                                gap: 2,
                              }}
                            >
                              <img
                                src={row?.image}
                                alt={row.name}
                                height="40"
                                style={{ marginRight: '20px' }}
                              />
                              <div>
                                <span
                                  style={{
                                    textTransform: 'uppercase',
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    marginRight: '10px',
                                  }}
                                >
                                  {row.symbol}
                                </span>
                                <span>{row.name}</span>
                              </div>
                            </TableCell>

                            <TableCell align="center">
                              {symbol}{' '}
                              {numberWithCommas(
                                row.current_price.toFixed(2),
                              )}
                            </TableCell>

                            <TableCell
                              align="center"
                              style={{
                                color:
                                  profit > 0
                                    ? 'rgb(14, 203, 129)'
                                    : 'red',
                                fontWeight: 500,
                              }}
                            >
                              {profit && '+'}
                              {row.price_change_percentage_24h.toFixed(
                                2,
                              )}
                              %
                            </TableCell>

                            <TableCell align="center">
                              {symbol}{' '}
                              {numberWithCommas(
                                row.market_cap
                                  .toString()
                                  .slice(0, -6),
                              )}
                              M
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              )}
            </TableContainer>
            {/* Comes from @material-ui/lab */}
            <Pagination
              count={(handleSearch()?.length / 10).toString()}
              style={{
                padding: 2,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
              classes={{ ul: classes.pagination }}
              onChange={(_, value) => {
                setPage(value);
                window.scroll(0, 450);
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
