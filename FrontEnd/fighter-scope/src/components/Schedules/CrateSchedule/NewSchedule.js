import React, { useState } from 'react';
import AddButton from '../../UI/AddButton';
import CreateNewSchedule from './CreateNewSchedule';
import './CreateNewSchedule.css';
import { Box } from '@mui/material';

const NewSchedule = () => {
  const [scheduleUploader, setScheduleUploader] = useState(true);

  const scheduleHandler = () => {
    console.log(scheduleHandler);
    setScheduleUploader(!scheduleUploader);
  };
  return (
    <div className='new-schedule-wrapper'>
      <AddButton onClick={scheduleHandler}>New Schedule 🗓️</AddButton>
      {scheduleUploader && <CreateNewSchedule />}
    </div>
  );
};

export default NewSchedule;
