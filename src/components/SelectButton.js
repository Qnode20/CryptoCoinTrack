import { makeStyles } from '@material-ui/core';

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles({
    selectButton: {
      border: '1px solid #4B7BE5',
      borderRadius: 5,
      fontFamily: 'Montserrat',
      textAlign: 'center',
      cursor: 'pointer',
      backgroundColor: selected ? '#4B7BE5' : '',
      color: selected ? 'white' : '',
      fontWeight: selected ? 700 : 500,
      '&:hover': {
        backgroundColor: '#D6E5FA',
        color: 'black',
      },
      width: '100%',
      padding: '10px 0',
      margin: '0 1%',
    },
  });

  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectButton}>
      {children}
    </span>
  );
};

export default SelectButton;
