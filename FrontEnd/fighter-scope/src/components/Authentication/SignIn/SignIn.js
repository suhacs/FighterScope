import styles from './SignIn.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SignIn = () => {
  return (
    <div className={styles.SignIn}>
      <img className={styles.Deco} src='auth_deco.png' width='50%' />
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
          '& > :not(style)': { m: '1.2rem', width: '40%' },
          '& input': { backgroundColor: 'white' },
        }}
        noValidate
        autoComplete='off'
        className={styles.textFieldContainer}
      >
        <TextField id='outlined-basic' label='Email Address' variant='filled' />
        <TextField id='outlined-basic' label='Password' variant='filled' />
      </Box>
      <div className='styles.button'>
        <Button variant='contained' size='large'>
          Large
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
