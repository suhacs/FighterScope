import './DateBox.css';

function DateBox(props) {
  const month = props.date
    .toLocaleString('kr', { month: 'long' })
    .toUpperCase();
  const date = props.date.toLocaleString('kr', { day: '2-digit' });
  return (
    <div className='date-box-wrapper'>
      <p>{month}</p>
      <p>{date}</p>
    </div>
  );
}

export default DateBox;
