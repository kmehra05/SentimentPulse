const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const News = require('../../models/newsModel');
const { getNewsWithSentiment } = require('../../services/newsService');
const { fetchNews } = require('../../utils/googleNewsApi');
const { analyzeTargetedSentiment, targetedSentimentStats } = require('../../services/sentimentService');

jest.mock('../../utils/googleNewsApi');
jest.mock('../../services/sentimentService');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await News.deleteMany({});
  jest.clearAllMocks();
});

describe('News Service', () => {
  it('should return existing news entry if found within the last hour', async () => {
    const existingNews = new News({
      keyword: 'technology',
      headlinesAndSentiments: [
        { title: 'Tech News 1', sentiment: 0.5 },
        { title: 'Tech News 2', sentiment: 0.1 },
      ],
      sentimentStats: {
        averageScore: 0.3,
        negatives: 1,
        neutrals: 0,
        positives: 1,
      },
      addTime: new Date(),
    });
    await existingNews.save();

    const result = await getNewsWithSentiment('technology');
    expect(result).toBeDefined();
    expect(result.keyword).toBe('technology');
    expect(result.headlinesAndSentiments.length).toBe(2);
  });

  it('should fetch news, analyze sentiments, and save a new entry if not found', async () => {
    const mockTitles = ['Tech News 1', 'Tech News 2'];
    const mockSentiments = [0.5, 0.1];
    const mockStats = { averageScore: 0.3, negatives: 1, neutrals: 0, positives: 1 };

    fetchNews.mockResolvedValue(mockTitles);
    analyzeTargetedSentiment.mockResolvedValue(mockSentiments);
    targetedSentimentStats.mockResolvedValue(mockStats);

    const result = await getNewsWithSentiment('technology');
    expect(result).toBeDefined();
    expect(result.keyword).toBe('technology');
    expect(result.headlinesAndSentiments.length).toBe(2);
    expect(result.sentimentStats).toEqual(expect.objectContaining(mockStats));

    const savedNews = await News.findOne({ keyword: 'technology' });
    expect(savedNews).toBeDefined();
    expect(savedNews.headlinesAndSentiments.length).toBe(2);
    expect(savedNews.sentimentStats).toEqual(expect.objectContaining(mockStats));
  });

  it('should handle errors during news fetching or sentiment analysis gracefully', async () => {
    fetchNews.mockRejectedValue(new Error('Fetching error'));
    try {
      await getNewsWithSentiment('technology');
    } catch (error) {
      expect(error.message).toBe('Fetching error');
    }

    fetchNews.mockResolvedValue(['Tech News 1', 'Tech News 2']);
    analyzeTargetedSentiment.mockRejectedValue(new Error('Analysis error'));
    try {
      await getNewsWithSentiment('technology');
    } catch (error) {
      expect(error.message).toBe('Analysis error');
    }
  });
});
