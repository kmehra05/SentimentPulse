import React from 'react';
import './Results.css';

const Results = ({ tweets }) => {
  return (
    <div className="results">
      {tweets.map((tweet, index) => (
        <div key={index} className="tweet">
          {tweet}
        </div>
      ))}
    </div>
  );
};

export default Results;
