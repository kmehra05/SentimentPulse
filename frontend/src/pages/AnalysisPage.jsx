// AnalysisPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header/Header';
import SearchBar from '../components/SearchBar/SearchBar';
import PieChart from '../components/PieChart/PieChart';

const AnalysisPage = () => {
  const { keyword } = useParams(); // Get keyword from route params
  // const [sentimentData, setSentimentData] = useState({ positive: 0, neutral: 0, negative: 0 });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/news/analyze?keyword=${keyword}`);

        // const { positive, neutral, negative } = response.data.sentiment;
        // setSentimentData({ positive: 4, neutral: 5, negative: 3 });

      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    fetchData();
  }, [keyword]);

  return (
    <div className="analysis-page">

      <div className="header-and-search">
        <Header></Header>
        <SearchBar></SearchBar>
      </div>
      <div className="content">
      </div>
    </div>

  );
};

export default AnalysisPage;
