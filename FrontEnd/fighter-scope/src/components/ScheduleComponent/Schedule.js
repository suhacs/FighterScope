import Card from './Card';
import './Schedule.css';
import DateBox from './DateBox';
import FighterPlaceTIme from './FighterPlaceTime';

function Schedule(props) {
  return (
    <Card className='schedule-wrapper'>
      <div className='inner-schedule-wrapper'>
        <DateBox date={props.schedule[0].date} />
        <FighterPlaceTIme
          info={props.schedule[0]}
          date={props.schedule[0].date}
        />
      </div>
      <div className='inner-schedule-wrapper'>
        <DateBox date={props.schedule[1].date} />
        <FighterPlaceTIme
          info={props.schedule[1]}
          date={props.schedule[1].date}
        />
      </div>
      <div className='inner-schedule-wrapper'>
        <DateBox date={props.schedule[2].date} />
        <FighterPlaceTIme
          info={props.schedule[2]}
          date={props.schedule[2].date}
        />
      </div>
    </Card>
  );
}

export default Schedule;
