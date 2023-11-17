import React, { useEffect, useState } from 'react';
import './EditButton.css';
import { retrieveFighter } from '../../../services/FighterHttp';
import { retrieveSchedule } from '../../../services/ScheduleHttp';
import SmallBtn from '../../UI/SmallBtn';
import EditDialog from '../ModifySchedule/EditDialog';
import DeleteDialog from '../ModifySchedule/DeleteDialog';

const EditSchedule = (props) => {
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [fighters, setFighters] = useState([]);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchFighters = async () => {
      const fighterData = await retrieveFighter();
      const scheduleData = await retrieveSchedule();
      setSchedules(scheduleData);
      setFighters(fighterData);
    };
    fetchFighters();
  }, []);

  const handleEditOpen = () => {
    setEditDialog(true);
  };

  const handleEditClose = () => {
    setEditDialog(false);
  };

  const handleDeleteOpen = () => {
    setDeleteDialog(true);
  };

  const handleDeleteClose = () => {
    setDeleteDialog(false);
  };

  const getPlaceDefaultValue = () => {
    const placeValue =
      schedules &&
      schedules.find((schedule) => schedule.place === props.scheduleInfo.place);

    if (placeValue) {
      const { place } = placeValue;
      return place;
    }
  };

  const getDateDefaultValue = () => {
    const dateValue =
      schedules &&
      schedules.find(
        (schedule) =>
          schedule.date.toString() === props.scheduleInfo.date.toString()
      );

    if (dateValue) {
      const { date } = dateValue;
      const dateFormat = new Date(date);

      const estDate = new Date(dateFormat.getTime() - 5 * 60 * 60 * 1000);

      const formattedDate = estDate
        .toISOString()
        .slice(0, 16)
        .replace('T', ' ');

      return formattedDate;
    }

    return '';
  };

  return (
    <React.Fragment>
      <div className='edit-button-wrapper'>
        <SmallBtn handleClickOpen={handleEditOpen} buttonType='edit'>
          Edit
        </SmallBtn>
        <SmallBtn deleteHandler={handleDeleteOpen} buttonType='delete'>
          Delete
        </SmallBtn>
        <EditDialog
          fighters={fighters}
          open={editDialog}
          placeHandler={getPlaceDefaultValue}
          dateHandler={getDateDefaultValue}
          openHandler={handleEditOpen}
          closeHandler={handleEditClose}
          scheduleInfo={props.scheduleInfo}
          scheduleHandler={props.scheduleHandler}
          scheduleData={props.scheduleData}
          countDown={props.countDownHandler}
        />
        <DeleteDialog
          open={deleteDialog}
          scheduleInfo={props.scheduleInfo}
          openHandler={handleDeleteOpen}
          closeHandler={handleDeleteClose}
          scheduleHandler={props.scheduleHandler}
          scheduleData={props.scheduleData}
        />
      </div>
      <div className='mobile-edit-button'>
        <button className='mobile-edit'>Edit</button>
        <button className='mobile-delete'>Delete</button>
      </div>
    </React.Fragment>
  );
};

export default EditSchedule;
