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
          The data was successfully registered.
        </Alert>
      )}
      {props.onSubmitted === 'Error' && (
        <Alert
          variant='filled'
          severity='error'
          style={{ marginTop: '1rem', fontSize: '1rem' }}
          className='invalid-error'
        >
          Failed to register the data. Please try again.
        </Alert>
      )}
      {props.authError && (
        <div className='warning'>
          <Alert
            variant='filled'
            severity='warning'
            style={{
              marginTop: '0.2rem',
              fontSize: '1rem',
              borderRadius: '0px',
              width: '25.8vw',
              Height: '2vh',
            }}
            className='invalid-error'
          >
            {props.authError}
          </Alert>
        </div>
      )}
    </React.Fragment>
  );
};

export default ShowAlert;
