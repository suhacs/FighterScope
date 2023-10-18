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
          style={{ marginTop: '1rem' }}
        >
          This is a success alert — check it out!
        </Alert>
      )}
      {props.onSubmitted === 'Error' && (
        <Alert
          variant='filled'
          severity='error'
          style={{ marginTop: '1rem' }}
          className='invalid-error'
        >
          This is an error alert — check it out!
        </Alert>
      )}
    </React.Fragment>
  );
};

export default ShowAlert;
