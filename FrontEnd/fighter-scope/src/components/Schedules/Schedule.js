import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Card from '../UI/Card';
import './Schedule.css';
import DateBox from './ExistingSchedule/DateBox';
import FighterPlaceTime from './ExistingSchedule/FighterPlaceTime';
import CountDown from './ExistingSchedule/CountDown';
import SearchBar from './SearchBar/SearchBar';
import NewSchedule from './CrateSchedule/NewSchedule';
import EditSchedule from './ModifySchedule/EditSchedule';

function Schedule(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const sortedSchedule = [...props.schedule].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const totalItems = sortedSchedule.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = sortedSchedule.slice(startIndex, endIndex);

  const currentDate = new Date();

  return (
    <React.Fragment>
      <SearchBar
        schedule={props.schedule}
        filterHandler={props.filterHandler}
      />
      <NewSchedule />
      <Card className='schedule-wrapper'>
        {itemsToShow.map(
          (item) =>
            currentDate < item.date && (
              <div className='inner-schedule-wrapper' key={item.id}>
                <DateBox date={item.date} />
                <FighterPlaceTime info={item} date={item.date} />
                <CountDown date={item.date} />
                <EditSchedule
                  scheduleData={props.schedule}
                  scheduleHandler={props.scheduleHandler}
                  scheduleInfo={item}
                />
              </div>
            )
        )}
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
}

export default Schedule;
