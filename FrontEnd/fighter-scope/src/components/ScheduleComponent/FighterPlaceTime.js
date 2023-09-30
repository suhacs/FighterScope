import './FighterPlaceTime.css';

function FighterPlaceTime(props) {
  const time = props.date.toLocaleString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return (
    <div className='fighter-place-time-wrapper'>
      <p className='fighters'>
        {props.info.firstFighter} VS {props.info.secondFighter}
      </p>
      <p className='place-time'>
        <img
          className='icon'
          src='/placeIcon.png'
          alt='placeIcon'
          width='11rem'
          height='12rem'
        ></img>
        {props.info.place}
        <img
          className='icon'
          src='/timeIcon.png'
          alt='timeIcon'
          width='13rem'
          height='13rem'
        ></img>
        <b>KST </b>
        {time}
      </p>
    </div>
  );
}

export default FighterPlaceTime;
