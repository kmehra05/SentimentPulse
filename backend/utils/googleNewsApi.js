const datanews = require('gnews');

const fetchNews = async (query) => {
  try {
    const response = await datanews.search(query, { n: 5 });
    const titles = response.map(article => article.title);
    return titles;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

module.exports = { fetchNews };
