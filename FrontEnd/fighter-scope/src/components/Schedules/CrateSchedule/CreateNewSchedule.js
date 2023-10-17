import React, { useRef } from 'react';
import { Container } from '@mui/material';
import './CreateNewSchedule.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createSchedule } from '../../../services/ScheduleHttp';

const CrateNewSchedule = (props) => {
  const dateRef = useRef(null);
  const fighter1Ref = useRef(null);
  const fighter2Ref = useRef(null);
  const placeRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('working');

    const scheduleData = {
      date: dateRef.current.value,
      fighter_1: fighter1Ref.current.value,
      fighter_2: fighter2Ref.current.value,
      place: placeRef.current.value,
    };

    try {
      const responseData = await createSchedule(scheduleData);
      console.log('Response from server:', responseData);
    } catch (error) {
      console.error('Error occurred during POST request:', error);
    }
  };

  const resetHandler = () => {
    dateRef.current.value = '';
    fighter1Ref.current.value = '';
    fighter2Ref.current.value = '';
    placeRef.current.value = '';
  };

  return (
    <div className='newScheduleBox'>
      <Container>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id='filled-required'
            label='Fighter1'
            variant='standard'
            inputRef={fighter1Ref}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <TextField
            fullWidth
            id='filled-required'
            label='Fighter2'
            variant='standard'
            inputRef={fighter2Ref}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            id='filled-required'
            label='Place'
            variant='standard'
            InputLabelProps={{
              shrink: true,
            }}
            inputRef={placeRef}
          />
          <TextField
            fullWidth
            id='filled-required'
            label='Date'
            variant='standard'
            type='date'
            inputRef={dateRef}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder=''
          />
          <Box textAlign='center'>
            <Button
              variant='contained'
              type='submit'
              onClick={handleSubmit}
              style={{ marginTop: '1.5rem' }}
            >
              Send
            </Button>
            <Button
              variant='outlined'
              onClick={resetHandler}
              style={{ marginTop: '1.5rem' }}
            >
              Reset
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
};

export default CrateNewSchedule;
