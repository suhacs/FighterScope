import Schedule from './components/ScheduleComponent/Schedule';
import HorizontalNav from './components/Nav/HorizontalNav';
import VerticalNav from './components/Nav/VerticalNav';
import './App.css';

const boxingSchedule = [
  {
    date: new Date('2022-5-20'),
    firstFighter: 'Korean Zombie',
    secondFighter: 'Suha',
    place: '77 Talbot road',
  },
  {
    date: new Date('2023-5-20'),
    firstFighter: 'Seoyong',
    secondFighter: 'Gilgu',
    place: '3220 East condos',
  },
  {
    date: new Date('2022-6-20'),
    firstFighter: 'Gil',
    secondFighter: 'Gilgu',
    place: 'Olympic Park Seoul Gangnam',
  },
];

function App() {
  return (
    <div className='appWrapper'>
      <div className='hor_nav'>
        <HorizontalNav />
      </div>
      <div className='ver_nav'>
        <VerticalNav />
      </div>
      <div className='contents'>
        <Schedule schedule={boxingSchedule} />
      </div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
    </div>
  );
}

export default App;
