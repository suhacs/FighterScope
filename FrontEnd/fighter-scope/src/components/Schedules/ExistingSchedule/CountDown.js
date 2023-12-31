import { useState, useEffect } from "react";
import "./CountDown.css";

const CountDown = (props) => {
  const [DDay, setDDay] = useState(0);
  const targetDate = new Date(props.date);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentDate = new Date();
      const timeDifference = targetDate - currentDate;

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );

      const countdownString = `D-${days} ${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      setDDay(countdownString);

      if (days < 1 && days > 0) {
        setDDay("D-DAY");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <p className="count-down">{DDay}</p>;
};

export default CountDown;
