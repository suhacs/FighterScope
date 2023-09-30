import HorizontalNav from './HorizontalNav';
import VerticalNav from './VerticalNav';
import './NavBar.css';

function NavBar() {
  return (
    <nav>
      <div className='nav-bar-wrapper'>
        <HorizontalNav />
        <VerticalNav />
      </div>
    </nav>
  );
}

export default NavBar;
