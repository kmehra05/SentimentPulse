const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const News = require('../models/newsModel');
require('dotenv').config();

const nlu = new NaturalLanguageUnderstandingV1({
  version: '2022-04-07',
  authenticator: new IamAuthenticator({
    apikey: process.env.IBM_API_KEY,
  }),
  serviceUrl: process.env.IBM_SERVICE_URL,
});

const roundTo1 = (num = 0, decimals = 1) => Math.round(num * 10 ** decimals) / 10 ** decimals;

const analyzeTargetedSentiment = async (texts, keyword) => {
  const analyses = texts.map(text => {
    return nlu.analyze({
      text: text,
      features: {
        sentiment: {
          targets: [keyword]
        }
      }
    });
  });

  try {
    const results = await Promise.all(analyses);
    return results.map(result => {
      return roundTo1(num = (result.result.sentiment.targets[0].score + 1) * 5);
    });
  } catch (error) {
    console.error('Error analyzing targeted sentiment:', error);
    throw error;
  }
};

const targetedSentimentStats = async (analysis) => {
  try {
    // Calculate average sentiment score
    const averageScore = analysis.reduce((acc, score) => acc + score, 0) / analysis.length;

    // Initialize counters for negatives, neutrals, and positives
    let negatives = 0;
    let neutrals = 0;
    let positives = 0;

    // Categorize scores based on ranges
    analysis.forEach(score => {
      if (score >= 0 && score < 4.5) {
        negatives++;
      } else if (score >= 4.5 && score <= 5.5) {
        neutrals++;
      } else if (score > 5.5 && score <= 10) {
        positives++;
      }
    });

    // Return results
    return {
      averageScore: roundTo1(averageScore),
      negatives,
      neutrals,
      positives
    };
  } catch (error) {
    console.error('Error calculating sentiment statistics:', error);
    throw error;
  }
};

const getPastSentiments = async (query) => {
  try {
    // Find all documents that match the given query
    const results = await News.find({ keyword: query })


    // Format the results
    const formattedResults = results.map(result => ({
      sentimentStats: result.sentimentStats.averageScore,
      dateTime: result.addTime.toISOString()
    }));

    return formattedResults;
  } catch (error) {
    console.error('Error fetching past sentiments:', error);
    throw error;
  }
};

module.exports = getPastSentiments;


module.exports = { analyzeTargetedSentiment, targetedSentimentStats, getPastSentiments };