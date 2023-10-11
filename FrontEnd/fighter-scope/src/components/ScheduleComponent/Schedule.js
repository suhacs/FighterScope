import React, { useState } from 'react';
import Card from './Card';
import './Schedule.css';
import DateBox from './DateBox';
import FighterPlaceTime from './FighterPlaceTime';
import CountDown from './CountDown';

function Schedule(props) {
  const [schedulePaseed, setSchedulePassed] = useState(false);

  const schedulePassHandler = () => {
    setSchedulePassed(true);
  };

  const sortedSchedule = [...props.schedule].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const currentDate = new Date();

  return (
    <Card className='schedule-wrapper'>
      {sortedSchedule.map(
        (item) =>
          currentDate < item.date && (
            <div className='inner-schedule-wrapper' key={item.id}>
              <DateBox date={item.date} />
              <FighterPlaceTime info={item} date={item.date} />
              <CountDown
                date={item.date}
                onSchedulePassed={schedulePassHandler}
              />
            </div>
          )
      )}
    </Card>
  );
}

export default Schedule;
