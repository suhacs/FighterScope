import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const getMobileNavStyle = () => ({
  display: { xs: 'flex', md: 'none', lg: 'none' },
  flexGrow: 1,
  width: '100%',
});

const MobileNav = () => {
  return (
    <Box sx={getMobileNavStyle}>
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Fighter Scoe
          </Typography>
          <Button color='inherit'>Login</Button>
          <Button color='inherit'>Signup</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MobileNav;
