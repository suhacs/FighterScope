import { useState, useEffect } from 'react';
import './CountDown.css';

const CountDown = (props) => {
  const [DDay, setDDay] = useState(0);
  const targetDate = new Date(props.date);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentDate = new Date();
      //   console.log(currentDate);
      //   console.log(props.date);
      const timeDifference = targetDate - currentDate;

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      const countdownString = `D-${days} ${hours
        .toString()
        .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
      setDDay(countdownString);

      if (days < 1 && days > 0) {
        setDDay('D-DAY');
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  });

  return <p className='count-down'>{DDay}</p>;
};

export default CountDown;
