import './HorizontalNav.css';
import { Link } from 'react-router-dom';

function HorizontalNav() {
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
        <li>LOGOUT</li>
        <li>SIGN UP</li>
        <li>HOME</li>
      </ul>
      {/* <h3>Find your favorite fighter!</h3> */}
    </div>
  );
}

export default HorizontalNav;
