import React, { useState } from 'react';
import AddButton from '../../UI/AddButton';
import CreateNewSchedule from './CreateNewSchedule';

const AddNewSchedule = () => {
  const [scheduleUploader, setScheduleUploader] = useState(true);

  const scheduleHandler = () => {
    console.log(scheduleHandler);
    setScheduleUploader(!scheduleUploader);
  };
  return (
    <React.Fragment>
      <AddButton onClick={scheduleHandler}>New Schedule 🗓️</AddButton>
      {scheduleUploader && <CreateNewSchedule />}
    </React.Fragment>
  );
};

export default AddNewSchedule;
