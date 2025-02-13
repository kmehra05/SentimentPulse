const express = require('express');
const { getNewsWithSentiment } = require('../services/newsService');
const { getPastSentiments } = require('../services/sentimentService');

const router = express.Router();

router.get('/analyze', async (req, res) => {
  const query = req?.query?.keyword;
  console.log(req.query, req.body)

  if (!query) {
    return res.status(400).json({ error: 'Keyword query parameter is required' });
  }

  try {
    const newsWithSentiment = await getNewsWithSentiment(query);
    res.status(200).json(newsWithSentiment);
  } catch (error) {
    console.log(error, ">>>>>>><<<<<<")
    res.status(500).json({ error: 'An error occurred while fetching and analyzing news' });
  }
});

router.get('/history', async (req, res) => {
  const query = req.query.keyword.toLowerCase();
  if (!query) {
    return res.status(400).json({ error: 'Keyword query parameter is required' });
  }

  try {
    const pastSentiments = await getPastSentiments(query);
    res.json(pastSentiments)
  } catch (error) {
    res.status(500).json({ error: 'Getting past sentiments failed' });

  }

})

module.exports = router;