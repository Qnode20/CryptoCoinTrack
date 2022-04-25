import {
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CoinInfo from './CoinInfo';
import { SingleCoin } from '../../config/api';
import { numberWithCommas } from '../../services/utils/format';
import { CryptoState } from '../../context/CryptoContext';

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  useEffect(() => {
    axios
      .get(SingleCoin(id))
      .then(function (response) {
        setCoin(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);
  console.log(coin);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      paddingTop: '4rem',
      margin: '0 20px',
    },
    sidebar: {
      width: '30%',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      border: '2px solid grey',
    },
    heading: {
      fontWeight: 'bold',
      marginBottom: 20,
      fontFamily: 'Montserrat',
      display: 'flex',
      justifyContent: 'center',
    },
    description: {
      display: 'flex',
      textAlign: 'start',
      fontFamily: 'Montserrat',
    },
    marketData: {
      alignSelf: 'start',
      width: '100%',
      [theme.breakpoints.down('md')]: {
        display: 'flex',
        justifyContent: 'space-around',
      },
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        height: '20px',
      },
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        alignItems: 'start',
        height: '20px',
      },
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  }));

  const classes = useStyles();

  if (!coin)
    return <LinearProgress style={{ backgroundColor: 'gold' }} />;

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item sm={3}>
          <Paper className={classes.paper}>
            <div className={classes.marketData}>
              <Typography
                component="span"
                style={{
                  fontFamily: 'Montserrat',
                  fontWeight: 'bold',
                }}
              >
                Rank: {numberWithCommas(coin?.market_cap_rank)}
              </Typography>
            </div>
          </Paper>
        </Grid>

        <Grid item sm={3}>
          <Paper className={classes.paper}>
            <div className={classes.marketData}>
              <Typography
                component="span"
                style={{
                  fontWeight: 'bold',
                  fontFamily: 'Montserrat',
                  overflowWrap: 'break-word',
                  wordWrap: 'break-word',
                  hyphens: 'auto',
                }}
              >
                Circulating :
                {numberWithCommas(
                  coin?.market_data.circulating_supply,
                )}
              </Typography>
            </div>
          </Paper>
        </Grid>

        <Grid item sm={3}>
          <Paper className={classes.paper}>
            <div className={classes.marketData}>
              <Typography
                component="span"
                style={{
                  fontFamily: 'Montserrat',
                  fontWeight: 'bold',
                }}
              >
                Current Price : {symbol}
                {numberWithCommas(
                  coin?.market_data.current_price[
                    currency.toLowerCase()
                  ],
                )}
              </Typography>
            </div>
          </Paper>
        </Grid>

        <Grid item sm={3}>
          <Paper className={classes.paper}>
            <div className={classes.marketData}>
              <Typography
                component="span"
                style={{
                  fontFamily: 'Montserrat',
                  fontWeight: 'bold',
                }}
              >
                Market Cap : {symbol}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6),
                )}
                M
              </Typography>
            </div>
          </Paper>
        </Grid>

        <Grid item sm={3}>
          <Paper className={classes.paper}>
            <div
              style={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                onClick={() =>
                  window.open(coin?.links.homepage[0], '_blank')
                }
                src={coin?.image.large}
                alt={coin?.name}
                height="100"
              />
            </div>
            <Typography component="span" className={classes.heading}>
              {coin?.name}
            </Typography>
            <Typography
              component="span"
              className={classes.description}
            >
              {ReactHtmlParser(coin?.description.en.split('.')[0])}.
            </Typography>
            <Typography
              component="span"
              style={{ marginTop: '10px', fontWeight: 'bold' }}
            >
              Links :
            </Typography>
            <Typography>
              component="span"
              {coin?.links.homepage.map((link, index) => (
                <Typography
                  component="span"
                  key={index}
                  style={{
                    width: '100%',
                  }}
                >
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#000',
                      fontSize: '15px',
                      fontFamily: 'Montserrat',
                      overflowWrap: 'break-word',
                      wordWrap: 'break-word',
                      hyphens: 'auto',
                    }}
                  >
                    {link}
                    {'\n'}
                  </a>
                </Typography>
              ))}
            </Typography>
          </Paper>
        </Grid>

        <Grid item sm={9}>
          <Paper className={classes.paper}>
            <CoinInfo coin={coin} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default CoinPage;
