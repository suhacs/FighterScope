import React, { useState, useEffect } from 'react';
import './Fighters.module.css';
import SearchBar from '../Schedules/SearchBar/SearchBar';
import NewFighter from './CreateFighters/NewFighter';
import Card from '../UI/Card';
import { retrieveFighter } from '../../services/FighterHttp';
import ExistingFighter from './ExistingFighters/ExistingFighter';
import EditFighter from './MofidyFighter/EditFighter';

const Fighters = () => {
  const [fighters, setFighters] = useState();
  const [filteredFighters, setFilteredFighters] = useState();

  useEffect(() => {
    retrieveFighter().then((data) => setFighters(data));
  }, [fighters]);

  const fighterHandler = (updatedFighters) => {
    setFighters([...updatedFighters]);
  };

  const filterHandler = (filteredItems) => {
    setFilteredFighters(filteredItems);
  };

  const fightersToDisplay = filteredFighters || fighters;

  return (
    <React.Fragment>
      <SearchBar fighters={fighters} filterHandler={filterHandler} />
      <NewFighter />
      <Card className='schedule-wrapper'>
        {fighters &&
          fightersToDisplay.map((item) => (
            <div className='inner-schedule-wrapper' key={item.id}>
              <ExistingFighter fighterInfo={item} />
              <EditFighter
                fighterData={fighters}
                fighterInfo={item}
                fighterHandler={fighterHandler}
              />
            </div>
          ))}
      </Card>
    </React.Fragment>
  );
};

export default Fighters;
