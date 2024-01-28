import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../state/authContext';
import Box from '@mui/material/Box';

const verticalNavContainerStyle = {
  display: { xs: 'none', md: 'inline-block', lg: 'inline-block' },
  alignItems: 'start',
  flexDirection: 'column',
  backgroundColor: 'rgb(24, 34, 46)',
  height: '100%',
  width: '100%',
};

const navListStyle = {
  listStyle: 'none',
  textAlign: 'center',
  marginRight: '2rem',
  marginTop: '2rem',
};

const navLinkStyle = {
  textDecoration: 'none',
  color: 'white',
  fontSize: '1.8rem',
  fontFamily: 'Staatliches, sans-serif',
};

const VerticalNav = () => {
  const { userRole } = useContext(AuthContext);

  return (
    <Box className='vertical-nav' sx={verticalNavContainerStyle}>
      {userRole === 'admin' && (
        <nav>
          <ul>
            <li style={navListStyle}>
              <Link to='/' style={navLinkStyle}>
                MANAGE SCHEDULE
              </Link>
            </li>
            <li style={navListStyle}>
              <Link to='/fighter' style={navLinkStyle}>
                MANAGE FIGHTER
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </Box>
  );
};

export default VerticalNav;
