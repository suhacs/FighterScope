import React, { useEffect, useState } from 'react';
import HorizontalNav from './components/Nav/HorizontalNav';
import { Outlet } from 'react-router-dom';
import './GlobalSize.css';
import { getToken, getUserRole } from './data/token';
import AuthContext from './state/authContext';
import { Box, Stack } from '@mui/material';
import Footer from './components/UI/Footer';

const RootLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    const token = getToken();
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);

    const userRole = getUserRole();
    userRole && setUserRole(userRole);
  }, []);

  const horizontalNavStyle = {
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
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    minHeight: '100vh',
    margin: 'auto',
    backgroundColor: 'rgb(241, 241, 241)',
  };

  return (
    <Stack sx={contentsStyle}>
      <Box sx={horizontalNavStyle}>
        <AuthContext.Provider value={{ isLoggedIn, userRole }}>
          <HorizontalNav />
        </AuthContext.Provider>
      </Box>
      <Box sx={contentWrapperStyle}>
        <AuthContext.Provider value={{ isLoggedIn, userRole }}>
          <Outlet />
          <Footer />
        </AuthContext.Provider>
      </Box>
    </Stack>
  );
};

export default RootLayout;
