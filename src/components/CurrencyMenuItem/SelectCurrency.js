import React from 'react';
import { CryptoState } from '../../context/CryptoContext';
import { makeStyles, Select, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  sectionMobile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '50px',
  },
}));

const SelectCurrency = () => {
  const classes = useStyles();
  const { currency, setCurrency } = CryptoState();

  return (
    <div className={classes.sectionMobile}>
      <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <MenuItem value={'USD'}>USD</MenuItem>
        <MenuItem value={'INR'}>INR</MenuItem>
        <MenuItem value={'EUR'}>EUR</MenuItem>
        <MenuItem value={'GBP'}>GBP</MenuItem>
      </Select>
    </div>
  );
};

export default SelectCurrency;
