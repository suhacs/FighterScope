import React, { useContext } from 'react';
import './HorizontalNav.css';
import { Link } from 'react-router-dom';
import AuthContext from '../../state/authContext';
import { clearToken } from '../../data/token';

function HorizontalNav() {
  const { isLoggedIn } = useContext(AuthContext);
  const handleLogout = () => {
    clearToken();
    window.location.reload();
  };
  return (
    <div className='horizontal-nav'>
      <ul>
        <h2 className='title'>
          <Link to='/'>
            <img
              className='icon'
              src='/fighter_scope_logo.png'
              alt='logo'
              height='100rem'
            />
          </Link>
        </h2>
        {isLoggedIn ? (
          <li>
            <Link
              onClick={handleLogout}
              to='/'
              style={{ textDecoration: 'none', color: 'white' }}
            >
              LOGOUT
            </Link>
          </li>
        ) : (
          <li>
            <Link
              to='signin'
              style={{ textDecoration: 'none', color: 'white' }}
            >
              LOGIN
            </Link>
          </li>
        )}

        <li>SIGN UP</li>
        <li>
          <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
            HOME
          </Link>
        </li>
      </ul>
      {/* <h3>Find your favorite fighter!</h3> */}
    </div>
  );
}

export default HorizontalNav;
