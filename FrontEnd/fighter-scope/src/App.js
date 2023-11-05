import React, { useState, useEffect, useMemo } from 'react';
import Schedule from './components/Schedules/Schedule';
import { retrieveSchedule } from './services/ScheduleHttp';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './Root';
import './App.css';
import Fighters from './components/Fighters/Fighters';

function App() {
  const [boxingSchedules, setBoxingSchedules] = useState();
  const [filteredSchedule, setFilteredSchedule] = useState();

  useEffect(() => {
    retrieveSchedule().then((data) => setBoxingSchedules(data));
  }, [boxingSchedules]);

  const scheduleHandler = (updatedSchedule) => {
    setBoxingSchedules([...updatedSchedule]);
    console.log(updatedSchedule);
  };

  const filterHandler = (filteredItems) => {
    setFilteredSchedule(filteredItems);
  };

  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: '/',
          element: <RootLayout />,
          children: [
            {
              path: '/',
              element: (
                <div className='contents'>
                  {boxingSchedules && boxingSchedules.length > 0 && (
                    <Schedule
                      schedule={
                        filteredSchedule ? filteredSchedule : boxingSchedules
                      }
                      scheduleHandler={scheduleHandler}
                      filterHandler={filterHandler}
                    />
                  )}
                </div>
              ),
            },
            {
              path: '/fighter',
              element: (
                <div className='contents'>
                  <Fighters />
                </div>
              ),
            },
          ],
        },
      ]),
    [scheduleHandler, filterHandler]
  );

  return <RouterProvider router={router} />;
}

export default App;
