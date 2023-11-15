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
          Please fill in all the fields to register!.
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
      {props.signUpError && props.signUpError != 'NoError' && (
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
            {props.signUpError}
          </Alert>
        </div>
      )}
      {props.signUpError === 'NoError' && (
        <div className='warning'>
          <Alert
            variant='filled'
            severity='success'
            style={{
              marginTop: '0.2rem',
              fontSize: '1rem',
              borderRadius: '0px',
              width: '25.8vw',
              Height: '2vh',
            }}
          >
            Your account was successfully created!
          </Alert>
        </div>
      )}
    </React.Fragment>
  );
};

export default ShowAlert;
