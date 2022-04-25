import { makeStyles } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CoinPage, ExchangeTable, ExchangePage } from './Pages/index';
import { Header, Content } from './layouts/index';

const useStyles = makeStyles(() => ({
  App: {
    color: 'white',
    paddingTop: '1.3rem',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Header />
      <div className={classes.App}>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/coins/:id" element={<CoinPage />} />
          <Route path="/exchange" element={<ExchangeTable />} />
          <Route path="/exchange/:id" element={<ExchangePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
