import React, { useRef, useEffect, useState } from 'react';
import { Container } from '@mui/material';
import './CreateNewSchedule.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createSchedule } from '../../../services/ScheduleHttp';
import { retrieveFighter } from '../../../services/FighterHttp';
import Autocomplete from '@mui/material/Autocomplete';
import ShowAlert from './ShowAlert';
import SendIcon from '@mui/icons-material/Send';

const CrateNewSchedule = (props) => {
  const [fighters, setFighters] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState('NoDisplay');

  useEffect(() => {
    const fetchFighters = async () => {
      const fighterData = await retrieveFighter();
      setFighters(fighterData);
    };
    fetchFighters();
  }, []);

  const dateRef = useRef(null);
  const fighter1Ref = useRef(null);
  const fighter2Ref = useRef(null);
  const placeRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const scheduleData = {
      date: dateRef.current.value,
      fighter_1: fighter1Ref.current.value,
      fighter_2: fighter2Ref.current.value,
      place: placeRef.current.value,
    };

    console.log(scheduleData);

    try {
      const schedulePost = await createSchedule(scheduleData);
      console.log(schedulePost);
      if (schedulePost) {
        setFormSubmitted('Display');
      } else {
        setFormSubmitted('Error');
      }
    } catch (error) {
      console.error('Error occurred during POST request:', error);
      setFormSubmitted('Error');
    }

    setTimeout(() => {
      setFormSubmitted('NoDisplay');
    }, 3000);
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
          <Autocomplete
            id='size-small-standard'
            size='small'
            options={fighters}
            getOptionLabel={(option) => option.name}
            defaultValue={fighters[0]}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='standard'
                label='Fighter1'
                inputRef={fighter1Ref}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
          <br />
          <Autocomplete
            id='size-small-standard'
            size='small'
            options={fighters}
            getOptionLabel={(option) => option.name}
            defaultValue={fighters[0]}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='standard'
                label='Fighter2'
                inputRef={fighter2Ref}
                InputLabelProps={{
                  shrink: true,
                }}
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
            inputRef={placeRef}
            style={{ marginTop: '1rem' }}
          />
          <TextField
            fullWidth
            id='filled-required'
            label='Date and Time'
            variant='standard'
            type='datetime-local'
            inputRef={dateRef}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{ inputProps: {} }}
            placeholder=''
            style={{ marginTop: '1rem' }}
          />
          <ShowAlert onSubmitted={formSubmitted} />

          <Box textAlign='center'>
            <Button
              size='large'
              variant='contained'
              type='submit'
              onClick={handleSubmit}
              startIcon={<SendIcon />}
              style={{ margin: '2rem', marginTop: '3rem' }}
            >
              Send
            </Button>
            <Button
              size='large'
              variant='outlined'
              onClick={resetHandler}
              style={{ margin: '2rem', marginTop: '3rem' }}
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
