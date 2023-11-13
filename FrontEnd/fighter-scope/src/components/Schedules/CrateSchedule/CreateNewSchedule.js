import React, { useRef, useEffect, useState } from 'react';
import { Container, TextField, Button, Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import SendIcon from '@mui/icons-material/Send';
import { createSchedule } from '../../../services/ScheduleHttp';
import { retrieveFighter } from '../../../services/FighterHttp';
import ShowAlert from '../../UI/ShowAlert';

const commonInputStyle = {
  variant: 'standard',
  InputLabelProps: {
    shrink: true,
  },
};

const CreateNewSchedule = () => {
  const [fighters, setFighters] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState('NoDisplay');
  const dateRef = useRef(null);
  const fighter1Ref = useRef(null);
  const fighter2Ref = useRef(null);
  const placeRef = useRef(null);

  useEffect(() => {
    const fetchFighters = async () => {
      const fighterData = await retrieveFighter();
      setFighters(fighterData);
    };
    fetchFighters();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const scheduleData = {
      date: dateRef.current.value,
      fighter_1: fighter1Ref.current.value,
      fighter_2: fighter2Ref.current.value,
      place: placeRef.current.value,
    };

    try {
      await createSchedule(scheduleData);
      setFormSubmitted('Display');
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
            size='small'
            options={fighters}
            getOptionLabel={(option) => option.name}
            defaultValue={fighters[0]}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Fighter1'
                inputRef={fighter1Ref}
                {...commonInputStyle}
              />
            )}
          />
          <br />
          <Autocomplete
            size='small'
            options={fighters}
            getOptionLabel={(option) => option.name}
            defaultValue={fighters[0]}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Fighter2'
                inputRef={fighter2Ref}
                {...commonInputStyle}
              />
            )}
          />
          <TextField
            fullWidth
            id='filled-required'
            label='Place'
            inputRef={placeRef}
            style={{ marginTop: '1rem' }}
            {...commonInputStyle}
          />
          <TextField
            fullWidth
            id='filled-required'
            label='Date and Time'
            type='datetime-local'
            inputRef={dateRef}
            style={{ marginTop: '1rem' }}
            {...commonInputStyle}
          />
          <ShowAlert onSubmitted={formSubmitted} />

          <Box textAlign='center' sx={{ margin: '2rem', marginTop: '3rem' }}>
            <Button
              size='large'
              variant='contained'
              type='submit'
              startIcon={<SendIcon />}
            >
              Send
            </Button>
            <Button
              size='large'
              variant='outlined'
              onClick={resetHandler}
              sx={{ marginLeft: '2rem' }}
            >
              Reset
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
};

export default CreateNewSchedule;
