import React, { useEffect, useState } from 'react';
import HorizontalNav from './components/Nav/HorizontalNav';
import VerticalNav from './components/Nav/VerticalNav';
import { Outlet } from 'react-router-dom';
import './GlobalSize.css';
import { getToken, getUserRole } from './data/token';
import AuthContext from './state/authContext';
import Grid from '@mui/material/Grid';
import MobileNav from './components/Nav/MobileNav';
import { useTheme, useMediaQuery } from '@mui/material';

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

  const gridContainerStyle = {
    display: 'grid',
    minWidth: '100vw',
    minHeight: '100vh',
    backgroundColor: 'rgb(241, 241, 241)',
    gridTemplateColumns: '11rem 8fr',
    gridTemplateRows: '10rem auto 3rem',
    gridTemplateAreas: `
      'hor_nav hor_nav'
      'ver_nav contents'
      'ver_nav contents'
    `,
  };

  const horizontalNavStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    className: 'hor_nav',
    sx: { gridArea: 'hor_nav' },
  };

  const verticalNavStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '11rem',
    minHeight: '100vh',
    className: 'ver_nav',
    sx: { gridArea: 'ver_nav' },
  };

  const outletStyle = {
    sx: { gridArea: 'contents' },
  };
  return (
    <Grid
      container
      direction='column'
      className='appWrapper'
      sx={gridContainerStyle}
    >
      <AuthContext.Provider value={{ isLoggedIn, userRole }}>
        <Grid item {...horizontalNavStyle}>
          <HorizontalNav />
        </Grid>
        <Grid item {...verticalNavStyle}>
          <VerticalNav />
        </Grid>
      </AuthContext.Provider>
      <Grid item {...outletStyle}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default RootLayout;
