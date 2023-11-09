import React, { useEffect, useState } from 'react';
import HorizontalNav from './components/Nav/HorizontalNav';
import VerticalNav from './components/Nav/VerticalNav';
import { Outlet } from 'react-router-dom';
import './GlobalSize.css';
import { getToken, getUserRole } from './data/token';
import AuthContext from './state/authContext';

const RootLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    const token = getToken();
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);

    const userRole = getUserRole();
    userRole && setUserRole(userRole);
  }, []);

  return (
    <div className='appWrapper'>
      <AuthContext.Provider value={{ isLoggedIn, userRole }}>
        <div className='hor_nav'>
          <HorizontalNav />
        </div>
        <div className='ver_nav'>
          <VerticalNav />
        </div>
      </AuthContext.Provider>
      <Outlet />
    </div>
  );
};

export default RootLayout;
