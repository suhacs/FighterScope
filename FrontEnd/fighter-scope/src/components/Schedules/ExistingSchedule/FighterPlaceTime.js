import './FighterPlaceTime.css';

function FighterPlaceTime(props) {
  const time = props.date.toLocaleString(['en-US'], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return (
    <div className='fighter-place-time-wrapper'>
      <p className='fighters'>
        {props.info.firstFighter} VS {props.info.secondFighter}
      </p>
      <p className='place-time'>
        🌐
        {props.info.place}
        &nbsp;&nbsp; 🕐
        <b className='bolder'>EST&nbsp;</b>
        {time}
      </p>
    </div>
  );
}

export default FighterPlaceTime;
