import React from 'react';

const ExistingFighter = (props) => {
  return (
    <div className='fighter-wrapper'>
      <p className='fighters'>
        {props.fighterInfo.name}, {props.fighterInfo.nationality}
      </p>
    </div>
  );
};

export default ExistingFighter;
