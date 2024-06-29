// services/newsService.js
const { fetchNews } = require('../utils/googleNewsApi');
const { analyzeTargetedSentiment, targetedSentimentStats } = require('./sentimentService');
const News = require('../models/newsModel');

const getNewsWithSentiment = async (query) => {
  const existingEntry = await News.findOne({
    keyword: query,
    addTime: { $gte: new Date(Date.now() - 260 * 60 * 1000) } // Check if there's an entry in the last 30 minutes
  });

  if (existingEntry) {
    return existingEntry;
  }

  const newsTitles = await fetchNews(query);
  const sentiments = await analyzeTargetedSentiment(newsTitles, query);

  const headlinesAndSentiments = newsTitles.map((title, index) => ({
    title,
    sentiment: sentiments[index]
  }));

  const sentimentStats = await targetedSentimentStats(sentiments);

  const newEntry = new News({
    keyword: query,
    headlinesAndSentiments,
    sentimentStats,
  });

  await newEntry.save();

  return newEntry;
};

module.exports = { getNewsWithSentiment };
