const express = require('express');
const { getNewsWithSentiment } = require('../services/newsService');

const router = express.Router();

router.get('/analyze', async (req, res) => {
  const query = req.query.keyword;

  if (!query) {
    return res.status(400).json({ error: 'Keyword query parameter is required' });
  }

  try {
    const newsWithSentiment = await getNewsWithSentiment(query);
    res.json(newsWithSentiment);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching and analyzing news' });
  }
});

module.exports = router;

// {
//   "apikey": "L76jGGFwS0wsZ7rbh89hJimocbNP4osQuLF38HGXJxkh",
//   "iam_apikey_description": "Auto-generated for key crn:v1:bluemix:public:natural-language-understanding:us-east:a/ae60c69803b1437097ed8c2786abf621:3a169101-5279-4cef-b5e3-571050d57fe2:resource-key:07006b44-8aef-4b33-9716-95cb7997599d",
//   "iam_apikey_id": "ApiKey-07babd0e-ac73-4954-a175-807951c2a894",
//   "iam_apikey_name": "Service credentials-1",
//   "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Manager",
//   "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/ae60c69803b1437097ed8c2786abf621::serviceid:ServiceId-e834f6d8-3e90-438d-b56c-6116ee9f606a",
//   "url": "https://api.us-east.natural-language-understanding.watson.cloud.ibm.com/instances/3a169101-5279-4cef-b5e3-571050d57fe2"
// }