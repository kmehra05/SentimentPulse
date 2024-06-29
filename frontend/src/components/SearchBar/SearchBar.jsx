import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/analyze/${keyword}`);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter topic or keyword ↵"
        onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
      />
    </div>
  );
};

export default SearchBar;
