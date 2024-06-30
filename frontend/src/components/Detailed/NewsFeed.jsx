import React from 'react';
import PropTypes from 'prop-types';

const NewsFeed = ({ data }) => {
  const getSentimentClass = (sentiment) => {
    if (sentiment > 5.5) {
      return 'green';
    } else if (sentiment > 4.5) {
      return 'gray';
    } else {
      return 'red';
    }
  };

  return (
    <div className="news-feed">
      <div><h3>Latest News</h3></div>
      {data.map((item, index) => (
        <div key={index}>
          <h4>{item.title}</h4>
          <span className={getSentimentClass(item.sentiment)}>
            {item.sentiment.toFixed(1)}
          </span>
        </div>
      ))}
    </div>
  );
};

NewsFeed.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      sentiment: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default NewsFeed;
