import { Box } from '@mui/material';

const welcome = {
  fontFamily: 'roboto',
  textAlign: 'center',
  fontSize: '1.2rem',
  marginTop: '7rem',
  marginRight: '44rem',
};
const Welcome = (props) => {
  return <Box sx={welcome}>Welcome to fighter scope! {props.userName},</Box>;
};

export default Welcome;
