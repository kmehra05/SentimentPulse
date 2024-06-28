import React from 'react';
import Header from '../components/Header/Header';
import SearchBar from '../components/SearchBar/SearchBar';
import './HomePage.css';
import '../assets/styles/global.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <div className="content">
        <SearchBar />
      </div>
    </div>
  );
};

export default HomePage;
