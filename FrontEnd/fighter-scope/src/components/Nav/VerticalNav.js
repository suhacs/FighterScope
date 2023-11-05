import './VerticalNav.css';
import { Link } from 'react-router-dom';

function VerticalNav() {
  return (
    <div className='vertical-nav'>
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
    </div>
  );
}

export default VerticalNav;
