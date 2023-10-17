import React from 'react';
import './DateBox.css';

function DateBox(props) {
  const monthsShort = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];

  const monthIndex = props.date.getMonth();
  const monthShort = monthsShort[monthIndex];
  const date = props.date.toLocaleString('en-US', { day: '2-digit' });

  return (
    <div className='date-box-wrapper'>
      <p>{monthShort}</p>
      <p>{date}</p>
    </div>
  );
}

export default DateBox;
