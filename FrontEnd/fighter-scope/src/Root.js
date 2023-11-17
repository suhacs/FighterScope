import React, { useEffect, useState } from 'react';
import HorizontalNav from './components/Nav/HorizontalNav';
import { Outlet } from 'react-router-dom';
import './GlobalSize.css';
import { getToken, getUserRole } from './data/token';
import AuthContext from './state/authContext';
import { Stack } from '@mui/material';
import Footer from './components/UI/Footer';
import MobileNav from './components/Nav/MobileNav';
import classes from './Root.module.css';

const RootLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    const token = getToken();
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);

    const userRole = getUserRole();
    userRole && setUserRole(userRole);
  }, []);

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
      <div className={classes.horizontalNavStyle}>
        <AuthContext.Provider value={{ isLoggedIn, userRole }}>
          <HorizontalNav />
          <MobileNav />
        </AuthContext.Provider>
      </div>
      <div className={classes.contentWrapperStyle}>
        <AuthContext.Provider value={{ isLoggedIn, userRole }}>
          <Outlet />
          <Footer />
        </AuthContext.Provider>
      </div>
    </Stack>
  );
};

export default RootLayout;
