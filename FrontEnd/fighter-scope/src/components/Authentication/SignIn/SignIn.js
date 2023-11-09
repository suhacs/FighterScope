import React, { useRef, useState } from 'react';
import styles from './SignIn.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { signIn } from '../../../services/AuthHttp';
import { saveToken } from '../../../data/token';
import { useNavigate } from 'react-router-dom';
import ShowAlert from '../../UI/ShowAlert';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState();

  const idRef = useRef();
  const passwdRef = useRef();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setIsLoading(true);
    setAuthError();
    const userData = {
      id: idRef.current.value,
      password: passwdRef.current.value,
    };

    const noData = !idRef.current.value || !passwdRef.current.value;
    const isValidEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (noData) {
      setAuthError('Please fill in both email and password');
      setTimeout(() => setAuthError(), [3000]);
    } else if (!idRef.current.value.match(isValidEmail)) {
      setAuthError('Please check the email format');
    }

    try {
      const userAuthInfo = await signIn(userData);
      if (userAuthInfo) {
        saveToken(userAuthInfo);
        setIsLoading(false);
        navigate(-1);
      } else {
        setIsLoading(false);
        setAuthError('Invalid email address or password');
        setTimeout(() => setAuthError(), [3000]);
      }
    } catch (err) {
      console.log('Error occured !');
    }
  };
  return (
    <div className={styles.SignIn}>
      <img
        className={styles.Deco}
        src='auth_deco.png'
        width='50%'
        alt='authDeco'
      />
      <h1 className={styles.message}>
        WELCOME TO <br />
        <span className={styles.red}>FIGHTER SCOPE</span>
      </h1>
      <Box
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > :not(style)': { m: '1.2rem', width: '27.5vw', height: '5vh' },
          '& input': { backgroundColor: 'white' },
        }}
        autoComplete='on'
        className={styles.textFieldContainer}
      >
        <TextField
          id='outlined-basic'
          label='Email Address'
          variant='filled'
          inputRef={idRef}
          type='email'
          required
        />
        <TextField
          id='outlined-basic'
          label='Password'
          variant='filled'
          type='password'
          inputRef={passwdRef}
          required
        />
      </Box>
      <div className={styles.button}>
        <Button
          variant='contained'
          size='large'
          onClick={handleSignIn}
          sx={{
            width: '27.5vw',
            minHeight: '5vh',
            borderRadius: 0,
            backgroundColor: '#CDE880',
            '&:hover': {
              backgroundColor: '#D4F477',
            },
            color: 'black',
          }}
          style={{ fontSize: '0.7vw' }}
        >
          Sign In
        </Button>
      </div>
      <ShowAlert authError={authError} />
      <div className={styles.noaccount}>
        No account? <span className={styles.signup}>Sign up</span>{' '}
      </div>
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '2rem',
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default SignIn;
