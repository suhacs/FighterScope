import React, { useEffect, useState } from 'react';
import HorizontalNav from './components/Nav/HorizontalNav';
import VerticalNav from './components/Nav/VerticalNav';
import { Outlet } from 'react-router-dom';
import './GlobalSize.css';
import { getToken, getUserRole } from './data/token';
import AuthContext from './state/authContext';
import Stack from '@mui/material/Stack';

const RootLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    const token = getToken();
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);

    const userRole = getUserRole();
    userRole && setUserRole(userRole);
  }, []);

  const gridContainerStyle = {
    display: 'grid',
    minHeight: '100vh',
    backgroundColor: 'rgb(241, 241, 241)',
    gridTemplateColumns: '11rem 8fr 2fr',
    gridTemplateRows: '10rem auto 3rem',
    gridTemplateAreas: `
      'hor_nav hor_nav hor_nav'
      'ver_nav contents news1'
      'ver_nav contents news2'
    `,
  };

  const horizontalNavStyle = {
    direction: 'row',
    className: 'hor_nav',
    sx: { gridArea: 'hor_nav' },
  };

  const verticalNavStyle = {
    direction: 'row',
    className: 'ver_nav',
    sx: { gridArea: 'ver_nav' },
  };

  return (
    <Stack direction='column' className='appWrapper' sx={gridContainerStyle}>
      <AuthContext.Provider value={{ isLoggedIn, userRole }}>
        <Stack {...horizontalNavStyle}>
          <HorizontalNav />
        </Stack>
        <Stack {...verticalNavStyle}>
          <VerticalNav />
        </Stack>
      </AuthContext.Provider>
      <Outlet />
    </Stack>
  );
};

export default RootLayout;
