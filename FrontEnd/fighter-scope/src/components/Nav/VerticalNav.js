import React, { useContext } from 'react';
import './VerticalNav.css';
import { Link } from 'react-router-dom';
import AuthContext from '../../state/authContext';

const VerticalNav = () => {
  const { userRole, isLoggedIn } = useContext(AuthContext);
  // console.log(userRole, isLoggedIn);
  return (
    <div className='vertical-nav'>
      {userRole === 'admin' && (
        <nav>
          <ul>
            <li>
              <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                MANAGE SCHEDULE
              </Link>
            </li>
            <li>
              <Link
                to='/fighter'
                style={{ textDecoration: 'none', color: 'white' }}
              >
                MANAGE FIGHTER
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default VerticalNav;
