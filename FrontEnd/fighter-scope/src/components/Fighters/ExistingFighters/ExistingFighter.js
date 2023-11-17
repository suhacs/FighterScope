import React from 'react';
import './ExistingFighter.css';

const ExistingFighter = (props) => {
  return (
    <div className='fighter-wrapper'>
      <p className='fighters-existing'>
        {props.fighterInfo.name}, {props.fighterInfo.nationality}
      </p>
    </div>
  );
};

export default ExistingFighter;
