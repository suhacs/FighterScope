import React from 'react';
import Card from '../UI/Card';
import './Schedule.css';
import DateBox from './ExistingSchedule/DateBox';
import FighterPlaceTime from './ExistingSchedule/FighterPlaceTime';
import CountDown from './ExistingSchedule/CountDown';
import SearchBar from './SearchBar/SearchBar';
import NewSchedule from './CrateSchedule/NewSchedule';
import EditSchedule from './ModifySchedule/EditSchedule';

function Schedule(props) {
  const sortedSchedule = [...props.schedule].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const currentDate = new Date();

  return (
    <React.Fragment>
      <SearchBar />
      <NewSchedule />
      <Card className='schedule-wrapper'>
        {sortedSchedule.map(
          (item) =>
            currentDate < item.date && (
              <div className='inner-schedule-wrapper' key={item.id}>
                <DateBox date={item.date} />
                <FighterPlaceTime info={item} date={item.date} />
                <CountDown date={item.date} />
                <EditSchedule scheduleInfo={item} />
              </div>
            )
        )}
      </Card>
    </React.Fragment>
  );
}

export default Schedule;
