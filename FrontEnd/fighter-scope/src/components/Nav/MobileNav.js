import { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './MobileNav.css';
import AuthContext from '../../state/authContext';
import { clearToken } from '../../data/token';
import { Link } from 'react-router-dom';

const MobileNav = () => {
  const { userRole } = useContext(AuthContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const mobileAppBar = {
    backgroundColor: 'rgb(24, 34, 46)',
  };

  const handleLogout = () => {
    clearToken();
    window.location.reload();
  };

  const handleInitialize = () => {
    window.location.reload();
  };

  const navLinkStyle = {
    textDecoration: 'none',
    color: 'white',
    fontSize: '1rem',
    backgroundColor: 'inherit',
  };

  const navLinkStyleBlack = {
    textDecoration: 'none',
    color: 'black',
    fontSize: '1rem',
    backgroundColor: 'inherit',
  };

  return (
    <div className='getMobileNavStyle'>
      <AppBar position='sticky' sx={mobileAppBar}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Link to='/' style={navLinkStyle}>
            <Typography
              variant='h6'
              component='div'
              sx={{ flexGrow: 1 }}
              onClick={handleInitialize}
            >
              Fighter Scope
            </Typography>
          </Link>
          {isLoggedIn ? (
            <Button color='inherit' onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link to='/signin' style={navLinkStyle}>
              <Button color='inherit'>Login</Button>
            </Link>
          )}

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {!isLoggedIn && (
              <Link to='/signup' style={navLinkStyleBlack}>
                <MenuItem onClick={handleMenuClose}>SIGN UP</MenuItem>
              </Link>
            )}
            {userRole === 'admin' && (
              <Link to='/' style={navLinkStyleBlack}>
                <MenuItem onClick={handleMenuClose}>MANAGE SCHEDULE</MenuItem>
              </Link>
            )}
            {userRole === 'admin' && (
              <Link to='/fighter' style={navLinkStyleBlack}>
                <MenuItem onClick={handleMenuClose}>MANAGE FIGHTER</MenuItem>
              </Link>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MobileNav;
