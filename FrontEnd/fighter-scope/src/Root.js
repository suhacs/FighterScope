import HorizontalNav from './components/Nav/HorizontalNav';
import VerticalNav from './components/Nav/VerticalNav';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className='appWrapper'>
      <div className='hor_nav'>
        <HorizontalNav />
      </div>
      <div className='ver_nav'>
        <VerticalNav />
      </div>
      <Outlet />
    </div>
  );
};

export default RootLayout;
