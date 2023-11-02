import React, { useState, useEffect } from 'react';
import Schedule from './components/Schedules/Schedule';
import HorizontalNav from './components/Nav/HorizontalNav';
import VerticalNav from './components/Nav/VerticalNav';
import { retrieveSchedule } from './services/ScheduleHttp';
import './App.css';

function App() {
  const [boxingSchedules, setBoxingSchedules] = useState([]);
  const [filteredSchedule, setFilteredSchedule] = useState();

  useEffect(() => {
    retrieveSchedule().then((data) => setBoxingSchedules(data));
  }, [boxingSchedules]);

  const scheduleHandler = async (updatedSchedule) => {
    await setBoxingSchedules([...updatedSchedule]);
    console.log(updatedSchedule);
  };

  const filterHandler = (filteredItems) => {
    setFilteredSchedule(filteredItems);
  };

  return (
    <div className='appWrapper'>
      <div className='hor_nav'>
        <HorizontalNav />
      </div>
      <div className='ver_nav'>
        <VerticalNav />
      </div>
      <div className='contents'>
        {boxingSchedules.length > 0 && (
          <Schedule
            schedule={filteredSchedule ? filteredSchedule : boxingSchedules}
            scheduleHandler={scheduleHandler}
            filterHandler={filterHandler}
          />
        )}
      </div>
    </div>
  );
}

export default App;
