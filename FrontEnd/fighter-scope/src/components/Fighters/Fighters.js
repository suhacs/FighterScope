import React, { useState, useEffect } from 'react';
import './Fighters.module.css';
import SearchBar from '../Schedules/SearchBar/SearchBar';
import NewFighter from './CreateFighters/NewFighter';
import Card from '../UI/Card';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { retrieveFighter } from '../../services/FighterHttp';
import ExistingFighter from './ExistingFighters/ExistingFighter';
import EditFighter from './ExistingFighters/EditFighter';

const Fighters = () => {
  const [fighters, setFighters] = useState();
  const [filteredFighters, setFilteredFighters] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const fightersToDisplay = filteredFighters || fighters;
  const totalFighters = fightersToDisplay?.length;
  const totalPages = Math.ceil(totalFighters / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const fightersToShow = fightersToDisplay?.slice(startIndex, endIndex);
  const itemsPerPage = 10;

  useEffect(() => {
    retrieveFighter().then((data) => setFighters(data));
  }, [fighters]);

  const fighterHandler = (updatedFighters) => {
    setFighters([...updatedFighters]);
  };

  const filterHandler = (filteredItems) => {
    setFilteredFighters(filteredItems);
  };

  const setFirstPage = () => {
    setCurrentPage(1);
  };

  return (
    <React.Fragment>
      <SearchBar
        fighters={fighters}
        filterHandler={filterHandler}
        pageHandler={setFirstPage}
      />
      <NewFighter />
      <Card className='schedule-wrapper'>
        {fighters &&
          fightersToShow.map((item) => (
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
      <div className='pagination-container'>
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
          />
        </Stack>
      </div>
    </React.Fragment>
  );
};

export default Fighters;
