import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = ({ keyword: initialKeyword = '', setLoading }) => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const navigate = useNavigate();

  useEffect(() => {
    setKeyword(initialKeyword);
  }, [initialKeyword]);

  const handleSearch = () => {
    if (setLoading) setLoading(true); // Set loading to true when a new search is initiated
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
