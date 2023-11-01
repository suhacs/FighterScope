import React from 'react';
import './SearchBar.css';
import Button from '@mui/material/Button';

function SearchBar() {
  return (
    <div className='searchBox'>
      <div>
        <input className='search-bar' type='text' />
      </div>
      <div className='searchButton'>
        <Button variant='contained'>Search 🔍</Button>
      </div>
    </div>
  );
}

export default SearchBar;
