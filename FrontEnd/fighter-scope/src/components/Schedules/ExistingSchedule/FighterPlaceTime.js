import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './FighterPlaceTime.css';
import CountDown from './CountDown';

const getWrapperStyle = () => ({
  display: 'inline-block',
});

const getFightersStyle = () => ({
  fontSize: 'clamp(1rem, 2.8vw, 1.8rem)',
  fontWeight: 'bold',
  textAlign: 'left',
  marginLeft: '1rem',
  marginTop: '1rem',
  marginBottom: '0rem',
});

const getPlaceTimeStyle = () => ({
  textAlign: 'left',
  marginTop: '0.1rem',
  marginLeft: '1rem',
  fontSize: 'clamp(0.7rem, 1.8vw, 1.1rem)',
});

const FighterPlaceTime = (props) => {
  const time = props.date.toLocaleString(['en-US'], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Box sx={getWrapperStyle()} className='fighter-place-time-wrapper'>
      <Typography sx={getFightersStyle()} className='fighters'>
        {props.info.firstFighter} VS {props.info.secondFighter}
      </Typography>
      <Typography sx={getPlaceTimeStyle()} className='place-time'>
        🌐 {props.info.place} &nbsp;&nbsp; 🕐
        <b className='bolder'>EST&nbsp;</b>
        {time}
      </Typography>
    </Box>
  );
};

export default FighterPlaceTime;
