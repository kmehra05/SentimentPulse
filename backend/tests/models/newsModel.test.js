const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const News = require('../../models/newsModel');

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
});

describe('News Model Test', () => {
  it('should create & save a news item successfully', async () => {
    const newsData = {
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
    };

    const validNews = new News(newsData);
    const savedNews = await validNews.save();

    expect(savedNews._id).toBeDefined();
    expect(savedNews.keyword).toBe(newsData.keyword);
    expect(savedNews.headlinesAndSentiments.length).toBe(2);
    expect(savedNews.sentimentStats.averageScore).toBe(newsData.sentimentStats.averageScore);
  });

  it('should add a default addTime if not provided', async () => {
    const newsData = {
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
    };

    const validNews = new News(newsData);
    const savedNews = await validNews.save();

    expect(savedNews.addTime).toBeDefined();
  });
});
