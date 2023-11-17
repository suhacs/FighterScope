import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AddButton from '../../UI/AddButton';
import CreateNewSchedule from './CreateNewSchedule';
import './CreateNewSchedule.css';

const theme = createTheme();

const NewSchedule = () => {
  const [scheduleUploader, setScheduleUploader] = useState(true);

  const scheduleHandler = () => {
    setScheduleUploader(!scheduleUploader);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className='new-schedule-wrapper'>
        <AddButton onClick={scheduleHandler}> NEW 🗓️</AddButton>
        {scheduleUploader && <CreateNewSchedule />}
      </div>
    </ThemeProvider>
  );
};

export default NewSchedule;
