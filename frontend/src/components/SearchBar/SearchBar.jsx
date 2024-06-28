import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    //imma figure this out later
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter keyword or hashtag"
        onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
      />
    </div>
  );
};

export default SearchBar;
