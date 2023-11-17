import React, { useRef, useState, useEffect } from 'react';
import styles from './SignIn.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { signIn } from '../../../services/AuthHttp';
import { saveToken } from '../../../data/token';
import { useNavigate } from 'react-router-dom';
import ShowAlert from '../../UI/ShowAlert';
import { getToken } from '../../../data/token';
import { clearToken } from '../../../data/token';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const buttonText = isLoggedIn ? 'Log out' : 'Sign In';

  useEffect(() => {
    const token = getToken();
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [isLoggedIn]);

  const emailRef = useRef();
  const passwdRef = useRef();
  const navigate = useNavigate();

  const handleSignInOrLogOut = async () => {
    const userData = {
      id: emailRef.current.value,
      password: passwdRef.current.value,
    };

    const noData = !emailRef.current.value || !passwdRef.current.value;
    const isValidEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    setAuthError();
    isLoggedIn && clearToken() && window.location.reload();

    if (noData) {
      setAuthError('Please fill in both email and password!');
      setTimeout(() => setAuthError(), [3000]);
    } else if (!isValidEmail.test(emailRef.current.value)) {
      setAuthError('Please check the email format!');
      setTimeout(() => setAuthError(), [3000]);
    } else {
      try {
        setIsLoading(true);
        const userAuthInfo = await signIn(userData);
        if (userAuthInfo) {
          saveToken(userAuthInfo);
          setIsLoading(false);
          navigate('/');
        } else {
          setIsLoading(false);
          setAuthError('Invalid email address or password');
          setTimeout(() => setAuthError(), [3000]);
        }
      } catch (err) {
        console.log('Error occured !' + err);
      }
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

      {!isLoggedIn && (
        <Box
          component='form'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > :not(style)': { m: '1.2rem', width: '70%', height: '5vh' },
            '& input': { backgroundColor: 'white' },
            marginTop: '15rem',
          }}
          autoComplete='on'
          className={styles.textFieldContainer}
        >
          <TextField
            id='outlined-basic'
            label='Email Address'
            variant='filled'
            inputRef={emailRef}
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
      )}
      <div className={styles.button}>
        <Button
          variant='contained'
          size='large'
          onClick={handleSignInOrLogOut}
          sx={{
            width: '60%',
            minHeight: '5vh',
            borderRadius: 0,
            backgroundColor: '#CDE880',
            '&:hover': {
              backgroundColor: '#D4F477',
            },
            color: 'black',
          }}
          style={{ fontSize: '1rem' }}
        >
          {buttonText}
        </Button>
      </div>
      <ShowAlert authError={authError} />
      {!isLoggedIn && (
        <div className={styles.noaccount}>
          No account?{' '}
          <span className={styles.signup}>
            <a
              href='/signup'
              style={{ textDecoration: 'none', color: '#CDE880' }}
            >
              Sign up
            </a>
          </span>{' '}
        </div>
      )}
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
