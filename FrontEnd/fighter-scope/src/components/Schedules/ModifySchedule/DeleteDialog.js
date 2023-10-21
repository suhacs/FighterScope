import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DeleteScheduleById } from '../../../services/ScheduleHttp';

const DeleteDialog = (props) => {
  const deleteSchedule = async (id) => {
    await DeleteScheduleById(id);
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.closeHandler}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Delete Schedule'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete the shedule?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              deleteSchedule(props.scheduleInfo.id);
              props.closeHandler();
            }}
          >
            Agree
          </Button>
          <Button onClick={props.closeHandler} autoFocus>
            Disagree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
