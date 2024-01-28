import React, { useRef } from 'react';
import './SearchBar.css';
import Button from '@mui/material/Button';

function SearchBar(props) {
  const inputRef = useRef();

  const searchHandle = async () => {
    const inputData = inputRef.current.value.toLowerCase();

    if (!inputData) {
      props.filterHandler();
    } else {
      if (props.schedule) {
        const filteredSchedules = props.schedule.filter(
          (item) =>
            item.firstFighter.toLowerCase().includes(inputData) ||
            item.secondFighter.toLowerCase().includes(inputData) ||
            item.place.toLowerCase().includes(inputData)
        );
        props.filterHandler(filteredSchedules);
        props.pageHandler();
      } else if (props.fighters) {
        const filteredFighters = props.fighters.filter(
          (item) =>
            item.name.toLowerCase().includes(inputData) ||
            item.nationality.toLowerCase().includes(inputData)
        );
        props.filterHandler(filteredFighters);
        props.pageHandler();
      }
    }
  };

  return (
    <div className='searchBox'>
      <div>
        <input className='search-bar' type='text' ref={inputRef} />
      </div>
      <div className='searchButton'>
        <Button
          variant='contained'
          onClick={searchHandle}
          sx={{ borderRadius: '0' }}
        >
          Search 🔍
        </Button>
      </div>
    </div>
  );
}

export default SearchBar;
