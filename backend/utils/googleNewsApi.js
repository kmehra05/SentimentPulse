const datanews = require('gnews');

const fetchNews = async (query) => {
  try {
    let titles = [];
    let page = 1;
    let lastResponseLength = 0;
    const lowerCaseQuery = query.toLowerCase();

    while (titles.length < 5) {
      const response = await datanews.search(query, { n: 5 * page });
      const filteredTitles = response
        .map(article => article.title)
        .filter(title => title.toLowerCase().includes(lowerCaseQuery));

      titles = [...new Set([...titles, ...filteredTitles])]; // Remove duplicates
      page++;

      // Break if no new results are found
      if (response.length === lastResponseLength) {
        break;
      }
      lastResponseLength = response.length;
    }

    // If no titles are found
    if (titles.length === 0) {
      console.error('No articles found containing the exact query.');
      return []; // Or throw an error if necessary
    }

    // Return up to 5 titles
    return titles.slice(0, 5);
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

module.exports = { fetchNews };
