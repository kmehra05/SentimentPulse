const request = require('supertest');
const express = require('express');
const newsRouter = require('../../routes/news');
const { getNewsWithSentiment } = require('../../services/newsService');
const { getPastSentiments } = require('../../services/sentimentService');

const app = express();
app.use(express.json());
app.use('/news', newsRouter);

// Mock the service functions
jest.mock('../../services/newsService');
jest.mock('../../services/sentimentService');

describe('News Routes', () => {
  describe('GET /news/analyze', () => {
    it('should return 400 if keyword query parameter is missing', async () => {
      const response = await request(app).get('/news/analyze');
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Keyword query parameter is required');
    });

    it('should return news with sentiment analysis for valid keyword', async () => {
      const mockNewsWithSentiment = [{ title: 'Test News', sentiment: 0.5 }];
      getNewsWithSentiment.mockResolvedValue(mockNewsWithSentiment);

      const response = await request(app).get('/news/analyze').query({ keyword: 'technology' });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockNewsWithSentiment);
    });

    it('should return 500 if an error occurs during fetching and analyzing news', async () => {
      getNewsWithSentiment.mockRejectedValue(new Error('Test Error'));

      const response = await request(app).get('/news/analyze').query({ keyword: 'technology' });
      expect(response.status).toBe(500);
      expect(response.body.error).toBe('An error occurred while fetching and analyzing news');
    });
  });

  describe('GET /news/history', () => {

    it('should return past sentiments for valid keyword', async () => {
      const mockPastSentiments = { averageScore: 0.3, negatives: 1, neutrals: 1, positives: 1 };
      getPastSentiments.mockResolvedValue(mockPastSentiments);

      const response = await request(app).get('/news/history').query({ keyword: 'technology' });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPastSentiments);
    });

    it('should return 500 if an error occurs while getting past sentiments', async () => {
      getPastSentiments.mockRejectedValue(new Error('Test Error'));

      const response = await request(app).get('/news/history').query({ keyword: 'technology' });
      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Getting past sentiments failed');
    });
  });
});
