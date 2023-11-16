import React, { useState, useEffect, useMemo } from 'react';
import Schedule from './components/Schedules/Schedule';
import { retrieveSchedule } from './services/ScheduleHttp';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './Root';
import './App.css';
import Fighters from './components/Fighters/Fighters';
import SignIn from './components/Authentication/SignIn/SignIn';
import SignUp from './components/Authentication/SignUp/SignUp';
import Container from '@mui/material/Container';

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

  const contents = {
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'rgb(241, 241, 241)',
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
                <Container sx={contents}>
                  {boxingSchedules && boxingSchedules.length > 0 && (
                    <Schedule
                      schedule={
                        filteredSchedule ? filteredSchedule : boxingSchedules
                      }
                      scheduleHandler={scheduleHandler}
                      filterHandler={filterHandler}
                    />
                  )}
                </Container>
              ),
            },
            {
              path: '/fighter',
              element: (
                <Container sx={contents}>
                  <Fighters />
                </Container>
              ),
            },
          ],
        },
        {
          path: '/signin',
          element: <SignIn />,
        },
        {
          path: '/signup',
          element: <SignUp />,
        },
      ]),
    [scheduleHandler, filterHandler]
  );

  return <RouterProvider router={router} />;
}

export default App;
