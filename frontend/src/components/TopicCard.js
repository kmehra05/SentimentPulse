import React from 'react';
import { Link } from 'react-router-dom';

const TopicCard = ({ topic }) => {
  return (
    <div className="topic-card">
      <h2>{topic.name}</h2>
      <p>{topic.headline}</p>
      <p>Sentiment: {topic.sentiment}</p>
      <Link to={`/topics/${topic.name}`}>View Details</Link>
    </div>
  );
};

export default TopicCard;
