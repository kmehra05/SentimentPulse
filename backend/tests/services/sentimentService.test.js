const { analyzeTargetedSentiment, targetedSentimentStats, getPastSentiments } = require('../../services/sentimentService');
const News = require('../../models/newsModel');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');

jest.mock('ibm-watson/natural-language-understanding/v1');
jest.mock('../../models/newsModel');

describe('Sentiment Service', () => {

  describe('targetedSentimentStats', () => {
    it('should calculate sentiment statistics', async () => {
      const analysis = [3, 5, 7, 9];
      const result = await targetedSentimentStats(analysis);

      expect(result).toEqual({
        averageScore: 6,
        negatives: 1,
        neutrals: 1,
        positives: 2,
      });
    });
  });

  describe('getPastSentiments', () => {
    it('should fetch past sentiments for a given keyword', async () => {
      const mockNews = [
        {
          keyword: 'test',
          sentimentStats: { averageScore: 6 },
          addTime: new Date('2023-06-30T12:00:00Z'),
        },
      ];

      News.find.mockResolvedValue(mockNews);

      const result = await getPastSentiments('test');

      expect(result).toEqual([
        {
          sentimentStats: 6,
          dateTime: '2023-06-30T12:00:00.000Z',
        },
      ]);

      expect(News.find).toHaveBeenCalledWith({ keyword: 'test' });
    });
  });
});
