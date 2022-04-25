import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Grid,
  makeStyles,
  AppBar,
  Button,
  Toolbar,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },

  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

export default function Header() {
  const classes = useStyles();

  const navigate = useNavigate();

  return (
    <Grid container className={classes.grow}>
      <Grid item xs>
        <AppBar position="fixed" style={{ background: '#DDDDDD' }}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              CRYPTO COINS
            </Typography>
            <Button onClick={() => navigate('/')}>Coins</Button>
            <Button onClick={() => navigate('/exchange')}>
              Exchange
            </Button>
          </Toolbar>
        </AppBar>
      </Grid>
    </Grid>
  );
}
