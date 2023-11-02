import React, { useRef } from 'react';
import './SearchBar.css';
import Button from '@mui/material/Button';

function SearchBar(props) {
  const inputRef = useRef();

  const searchHandle = async () => {
    const inputData = inputRef.current.value.toLowerCase();
    console.log(props.schedule);

    if (!inputData) {
      props.filterHandler();
    } else {
      const filteredSchedules = props.schedule.filter(
        (item) =>
          item.firstFighter.toLowerCase().includes(inputData) ||
          item.secondFighter.toLowerCase().includes(inputData) ||
          item.place.toLowerCase().includes(inputData)
      );
      props.filterHandler(filteredSchedules);
    }
  };

  return (
    <div className='searchBox'>
      <div>
        <input className='search-bar' type='text' ref={inputRef} />
      </div>
      <div className='searchButton'>
        <Button variant='contained' onClick={searchHandle}>
          Search 🔍
        </Button>
      </div>
    </div>
  );
}

export default SearchBar;
