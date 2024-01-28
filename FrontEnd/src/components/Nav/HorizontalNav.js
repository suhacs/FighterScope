import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../state/authContext';
import { clearToken } from '../../data/token';
import Box from '@mui/material/Box';
import './HorizontalNav.css';

const titleStyle = {
  color: 'white',
  fontSize: '1.8rem',
  float: 'left',
  margin: '0.7rem 3rem',
  position: 'relative',
  left: '6.4rem',
  fontFamily: 'staatliches, sans-serif',
};

const navLiStyle = {
  float: 'right',
  margin: '3rem 2rem',
  fontFamily: 'Staatliches, sans-serif',
  display: 'flex',
  alignItems: 'center',
};

const navLinkStyle = {
  textDecoration: 'none',
  color: 'white',
  fontSize: '2rem',
};

function HorizontalNav() {
  const { isLoggedIn } = useContext(AuthContext);
  const { userRole } = useContext(AuthContext);
  const handleLogout = () => {
    clearToken();
    setTimeout(() => {
      window.location.reload();
    });
  };

  const handleInitialize = () => {
    setTimeout(() => {
      window.location.reload();
    });
  };

  return (
    <div className='navContainerStyle'>
      <Box component='h2' className='title' sx={titleStyle}>
        <Link to='/'>
          <img
            className='icon'
            src='/fighter_scope_logo.png'
            alt='logo'
            height='100rem'
            onClick={handleInitialize}
          />
        </Link>
      </Box>
      <Box>
        <ul>
          {isLoggedIn ? (
            <li style={navLiStyle}>
              <Link onClick={handleLogout} to='/' style={navLinkStyle}>
                LOGOUT
              </Link>
            </li>
          ) : (
            <li style={navLiStyle}>
              <Link to='signin' style={navLinkStyle}>
                LOG IN
              </Link>
            </li>
          )}

          {!isLoggedIn && (
            <li style={navLiStyle}>
              <Link to='signup' style={navLinkStyle}>
                SIGN UP
              </Link>
            </li>
          )}
        </ul>
        {userRole === 'admin' && (
          <nav>
            <ul>
              <li style={navLiStyle}>
                <Link to='/fighter' style={navLinkStyle}>
                  FIGHTER
                </Link>
              </li>
              <li style={navLiStyle}>
                <Link to='/' style={navLinkStyle}>
                  SCHEDULE
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </Box>
    </div>
  );
}

export default HorizontalNav;
