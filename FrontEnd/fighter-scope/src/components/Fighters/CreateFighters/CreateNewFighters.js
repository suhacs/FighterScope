import React, { useRef, useState } from 'react';
import { Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createFighter } from '../../../services/FighterHttp';
import Autocomplete from '@mui/material/Autocomplete';
import ShowAlert from '../../UI/ShowAlert';
import SendIcon from '@mui/icons-material/Send';
import './CreateNewFighters.css';
import { countries } from '../../../data/countries';

const CrateNewFighters = (props) => {
  const [formSubmitted, setFormSubmitted] = useState('NoDisplay');

  const nameRef = useRef(null);
  const nationalityRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fighterData = {
      name: nameRef.current.value,
      nationality: nationalityRef.current.value,
    };

    try {
      const fighterPost = await createFighter(fighterData);
      console.log(fighterPost);
      if (fighterPost) {
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
    nameRef.current.value = '';
    nationalityRef.current.value = '';
  };

  return (
    <div className='newFighterBox'>
      <Container>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id='filled-required'
            label='Name'
            variant='standard'
            InputLabelProps={{
              shrink: true,
            }}
            inputRef={nameRef}
            style={{ marginTop: '1rem' }}
          />
          <br />
          <br />
          <Autocomplete
            id='size-small-standard'
            size='small'
            options={countries}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='standard'
                label='Nationality'
                inputRef={nationalityRef}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
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

export default CrateNewFighters;
