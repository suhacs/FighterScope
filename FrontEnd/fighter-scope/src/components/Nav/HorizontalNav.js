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
        <li>
          <Link to='signin' style={{ textDecoration: 'none', color: 'white' }}>
            LOGIN
          </Link>
        </li>
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
