import React from 'react';
import './AddButton.css';
import Button from '@mui/material/Button';

const AddButton = (props) => {
  return (
    <div className='button'>
      <Button
        sx={{
          m: 1,
          color: 'black',
          borderColor: 'gray',
          ':hover': { borderColor: 'gray' },
        }}
        component='label'
        variant='outlined'
        onClick={props.onClick}
      >
        {props.children}
      </Button>
    </div>
  );
};

export default AddButton;
