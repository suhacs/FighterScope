import React from 'react';
import Alert from '@mui/material/Alert';
import './ShowAlert.css';

const ShowAlert = (props) => {
  return (
    <React.Fragment>
      {props.onSubmitted === 'Display' && (
        <Alert
          variant='filled'
          severity='success'
          style={{ marginTop: '1rem', fontSize: '1rem' }}
        >
          The schedule was successfully registered.
        </Alert>
      )}
      {props.onSubmitted === 'Error' && (
        <Alert
          variant='filled'
          severity='error'
          style={{ marginTop: '1rem', fontSize: '1rem' }}
          className='invalid-error'
        >
          Failed to register the schedule. Please try again.
        </Alert>
      )}
    </React.Fragment>
  );
};

export default ShowAlert;
