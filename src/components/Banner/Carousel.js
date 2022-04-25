import axios from 'axios';
import { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../context/CryptoContext';
import { numberWithCommas } from '../../services/utils/format';

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, symbol]);

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;
    console.log(trending);
    return (
      <>
        <Link to={`/coins/${coin.id}`}>
          <div
            style={{
              display: 'flex',
              border:
                profit > 0
                  ? '1px solid rgb(14, 203, 129)'
                  : '1px solid red',
              flexDirection: 'row',
              margin: '0 5px',
              borderRadius: '5px',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '30%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={coin?.image} alt={coin.name} height="50" />
            </div>

            <div
              style={{
                display: 'flex',
                width: '70%',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}
            >
              <p style={{ fontSize: '11px' }}>{coin?.symbol}</p>
              <p
                style={{
                  fontSize: '11px',
                  color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                }}
              >
                {profit && '+'}
                {coin?.price_change_percentage_24h?.toFixed(2)}%
              </p>
              <p style={{ color: 'black', fontSize: '11px' }}>
                {symbol}{' '}
                {numberWithCommas(coin?.current_price.toFixed(2))}
              </p>
            </div>
          </div>
        </Link>
      </>
    );
  });

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  return (
    <>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </>
  );
};

export default Carousel;
