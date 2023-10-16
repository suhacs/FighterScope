import React, { useState, useEffect } from 'react';
import Schedule from './components/ScheduleComponent/Schedule';
import HorizontalNav from './components/Nav/HorizontalNav';
import VerticalNav from './components/Nav/VerticalNav';
import SearchBar from './components/SearchingAndNews/SearchBar.js';
import retreiveSchedule from './services/ScheduleHttp';
import Container from '@mui/material/Conteainer';
import './App.css';

function App() {
  const [boxingSchedules, setBoxingSchedules] = useState([]);

  useEffect(() => {
    retreiveSchedule().then((data) => setBoxingSchedules(data));
  }, []);
  console.log(boxingSchedules);

  return (
    <div className='appWrapper'>
      <div className='hor_nav'>
        <HorizontalNav />
      </div>
      <div className='ver_nav'>
        <VerticalNav />
      </div>
      <div className='contents'>
        <SearchBar />
        {boxingSchedules.length > 0 && <Schedule schedule={boxingSchedules} />}
      </div>
    </div>
  );
}

export default App;
