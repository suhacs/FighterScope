import styles from './SignUp.module.css';
import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { signUp } from '../../../services/AuthHttp';
import ShowAlert from '../../UI/ShowAlert';

const SignUp = () => {
  const nameRef = useRef();
  const nickNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [signUpError, setSignUpError] = useState();

  const handleSignUp = async () => {
    const isVacantForm =
      !nameRef.current.value ||
      !nickNameRef.current.value ||
      !emailRef.current.value ||
      !passwordRef.current.value;

    const isValidEmailType =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const isValidPassword = passwordRef.current.value.trim().length > 8;

    if (isVacantForm) {
      setSignUpError('Please fill in all the forms!');
      setTimeout(() => setSignUpError(), 3000);
    } else if (!isValidEmailType.test(emailRef.current.value)) {
      setSignUpError('Invalid email format');
      setTimeout(() => setSignUpError(), 3000);
    } else if (!isValidPassword) {
      setSignUpError('Password should be at least 8 characters');
      setTimeout(() => setSignUpError(), 3000);
    } else {
      const userData = {
        name: nameRef.current.value,
        nickName: nickNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };

      try {
        (await signUp(userData))
          ? setSignUpError('NoError')
          : setSignUpError('Email or nickname is already in use');
        setTimeout(() => setSignUpError(), 3000);
      } catch (err) {
        setSignUpError('Error Occured!');
        console.error('Error occured while during sign up!');
      }
    }
  };
  return (
    <div className={styles.SignUp}>
      <img
        className={styles.Deco}
        src='auth_deco.png'
        width='50%'
        alt='authDeco'
      />
      <h1 className={styles.message}>
        SIGN UP FOR <br />
        <span className={styles.red}>FIGHTER SCOPE</span>
      </h1>

      <Box
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > :not(style)': { m: '1.2rem', width: '70%', height: '5vh' },
          '& input': { backgroundColor: 'white' },
        }}
        autoComplete='on'
        className={styles.textFieldContainer}
      >
        {' '}
        <TextField
          id='outlined-basic'
          label='Name'
          variant='filled'
          inputRef={nameRef}
          required
        />
        <TextField
          id='outlined-basic'
          label='Nickname'
          variant='filled'
          inputRef={nickNameRef}
          required
        />
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
          inputRef={passwordRef}
          required
        />
        <span className={styles.password}>* Password minimum 9 characters</span>
      </Box>
      <div className={styles.button}>
        <Button
          variant='contained'
          size='large'
          onClick={handleSignUp}
          sx={{
            marginTop: '-1.7rem',
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
          Sign UP
        </Button>
      </div>
      {signUpError && <ShowAlert signUpError={signUpError} />}
      <div className={styles.noaccount}>
        No account?{' '}
        <span className={styles.signup}>
          <a
            href='/signin'
            style={{ textDecoration: 'none', color: '#CDE880' }}
          >
            Sign in
          </a>
        </span>{' '}
      </div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '2rem',
        }}
      >
        {/* <CircularProgress /> */}
      </Box>
    </div>
  );
};

export default SignUp;
