import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { updateScheduleById } from '../../../services/ScheduleHttp';

const EditDialog = (props) => {
  const firstFighterRef = useRef(null);
  const secondFighterRef = useRef(null);
  const dateRef = useRef(null);
  const placeRef = useRef(null);

  const updateSchedule = async () => {
    try {
      const scheduleBeUpdated = {
        fighter_1: firstFighterRef.current.value,
        fighter_2: secondFighterRef.current.value,
        place: placeRef.current.value,
        date: dateRef.current.value,
      };
      console.log(props.scheduleInfo.id);
      await updateScheduleById(props.scheduleInfo.id, scheduleBeUpdated);
    } catch (error) {
      console.error(`Error occured during updating the schedule!:${error}`);
    }
  };

  return (
    <Dialog open={props.open} onClose={props.closeHandler}>
      <DialogTitle style={{ fontSize: '1.8rem' }}>Edit Schedule</DialogTitle>
      <DialogContent style={{ fontSize: '1.8rem' }}>
        <DialogContentText>
          {' '}
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <Autocomplete
          id='size-small-standard'
          size='small'
          options={props.fighters}
          getOptionLabel={(option) => option.name}
          defaultValue={props.fighters.find(
            (fighter) => fighter.name === props.scheduleInfo.firstFighter
          )}
          renderInput={(params) => (
            <TextField
              style={{ marginTop: '1rem' }}
              {...params}
              label='Fighter 1'
              variant='standard'
              InputLabelProps={{
                shrink: true,
              }}
              inputRef={firstFighterRef}
            />
          )}
        />
        <Autocomplete
          id='size-small-standard'
          size='small'
          options={props.fighters}
          getOptionLabel={(option) => option.name}
          defaultValue={props.fighters.find(
            (fighter) => fighter.name === props.scheduleInfo.secondFighter
          )}
          renderInput={(params) => (
            <TextField
              style={{ marginTop: '1rem' }}
              {...params}
              label='Fighter 2'
              variant='standard'
              InputLabelProps={{
                shrink: true,
              }}
              inputRef={secondFighterRef}
            />
          )}
        />
        <TextField
          fullWidth
          id='filled-required'
          label='Place'
          variant='standard'
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginTop: '1rem' }}
          defaultValue={props.placeHandler()}
          inputRef={placeRef}
        />

        <TextField
          fullWidth
          id='filled-required'
          label='Date and Time'
          variant='standard'
          type='datetime-local'
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{ inputProps: {} }}
          placeholder=''
          style={{ marginTop: '1rem' }}
          defaultValue={props.dateHandler()}
          inputRef={dateRef}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            updateSchedule();
          }}
        >
          Save
        </Button>
        <Button onClick={props.closeHandler}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;