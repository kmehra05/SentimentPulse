import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header/Header';
import SearchBar from '../components/SearchBar/SearchBar';
import CustomPieChart from '../components/Detailed/PieChart';
import CustomLineChart from '../components/Detailed/LineChart';
import NewsFeed from '../components/Detailed/NewsFeed';
import Loader from '../components/Loader/Loader';
import './AnalysisPage.css';

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const AnalysisPage = () => {
  const { keyword } = useParams();
  const [sentimentData, setSentimentData] = useState({ positive: 0, neutral: 0, negative: 0 });
  const [trendData, setTrendData] = useState([]);
  const [score, setScore] = useState(0);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(false)
        const response = await axios.get(`${BASE_URL}/api/analyze?keyword=${keyword}`);
        const history = await axios.get(`${BASE_URL}/api/history?keyword=${keyword}`);

        const stats = response.data.sentimentStats;
        const { positives: positive, neutrals: neutral, negatives: negative, averageScore } = stats;
        const lineData = history.data;

        setNewsData(response.data.headlinesAndSentiments);
        setScore(averageScore);
        setSentimentData({ positive: positive, neutral: neutral, negative: negative });
        setTrendData(lineData);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching news data:', error);
        setLoading(false); // Set loading to false even if there's an error
        setError(true); // Set error state to true
      }
    };

    fetchData();
  }, [keyword]);

  const getScoreClass = (score) => {
    if (score > 5.5) return 'green';
    if (score < 4.5) return 'red';
    return 'gray';
  };

  return (
    <div className="analysis-page">
      <div className="header-and-search">
        <Header />
        <SearchBar keyword={keyword} setLoading={setLoading} />
      </div>
      {loading ? (
        <div className="spinner">
          <Loader />
        </div>
      ) : error ? (
        <div className="error-message">
          <h2>Error fetching data. Please try again later or enter a different query.</h2>
        </div>
      ) : (
        <div className="detailed">
          <div className="sentiment-score">
            <h4>Sentiment Score:</h4>
            <h1 className={getScoreClass(score)}>{score}</h1>
          </div>
          <div className="charts">
            <CustomPieChart
              positive={sentimentData.positive}
              neutral={sentimentData.neutral}
              negative={sentimentData.negative}
            />
            <CustomLineChart data={trendData} />
          </div>
          <NewsFeed data={newsData} />
        </div>
      )}
      <div className="content"></div>
    </div>
  );
};

export default AnalysisPage;
