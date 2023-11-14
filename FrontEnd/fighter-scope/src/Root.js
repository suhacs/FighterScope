import React, { useEffect, useState } from 'react';
import HorizontalNav from './components/Nav/HorizontalNav';
import VerticalNav from './components/Nav/VerticalNav';
import { Outlet } from 'react-router-dom';
import './GlobalSize.css';
import { getToken, getUserRole } from './data/token';
import AuthContext from './state/authContext';
import { useTheme, useMediaQuery, Box } from '@mui/material';

const RootLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    const token = getToken();
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);

    const userRole = getUserRole();
    userRole && setUserRole(userRole);
  }, []);

  const horizontalNavStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    position: 'fixed',
    width: '100%',
    height: '9rem',
    zIndex: 1000,
    backgroundColor: 'rgb(24, 34, 46)',
  };

  const contentWrapperStyle = {
    paddingTop: '4rem',
  };

  const contentsStyle = {
    minHeight: '100vh',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'rgb(241, 241, 241)',
  };

  return (
    <Box sx={contentsStyle}>
      <Box sx={horizontalNavStyle}>
        <AuthContext.Provider value={{ isLoggedIn, userRole }}>
          <HorizontalNav />
        </AuthContext.Provider>
      </Box>
      <Box sx={contentWrapperStyle}>
        <AuthContext.Provider value={{ isLoggedIn, userRole }}>
          <Outlet />
        </AuthContext.Provider>
      </Box>
    </Box>
  );
};

export default RootLayout;
