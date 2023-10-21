import React, { useState, useEffect } from 'react';
import Schedule from './components/Schedules/Schedule';
import HorizontalNav from './components/Nav/HorizontalNav';
import VerticalNav from './components/Nav/VerticalNav';
import { retrieveSchedule } from './services/ScheduleHttp';

import './App.css';

function App() {
  const [boxingSchedules, setBoxingSchedules] = useState([]);

  useEffect(() => {
    retrieveSchedule().then((data) => setBoxingSchedules(data));
  }, []);

  return (
    <div className='appWrapper'>
      <div className='hor_nav'>
        <HorizontalNav />
      </div>
      <div className='ver_nav'>
        <VerticalNav />
      </div>
      <div className='contents'>
        {boxingSchedules.length > 0 && <Schedule schedule={boxingSchedules} />}
      </div>
    </div>
  );
}

export default App;
