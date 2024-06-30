const { fetchNews } = require('../../utils/googleNewsApi');
const datanews = require('gnews');

jest.mock('gnews');

describe('Google News API', () => {
  it('should fetch news and return up to 5 titles', async () => {
    const mockResponse = [
      { title: 'Test news 1' },
      { title: 'Another test news 2' },
      { title: 'Test news 3' },
      { title: 'Test news 4' },
      { title: 'Test news 5' },
    ];

    datanews.search.mockResolvedValue(mockResponse);

    const result = await fetchNews('test');

    expect(result).toEqual([
      'Test news 1',
      'Another test news 2',
      'Test news 3',
      'Test news 4',
      'Test news 5',
    ]);
    expect(datanews.search).toHaveBeenCalledWith('test', { n: 5 });
  });

  it('should handle pagination correctly', async () => {
    const mockResponsePage1 = [
      { title: 'Test news 1' },
      { title: 'Another test news 2' },
    ];

    const mockResponsePage2 = [
      { title: 'Test news 3' },
      { title: 'Test news 4' },
      { title: 'Test news 5' },
    ];

    datanews.search
      .mockResolvedValueOnce(mockResponsePage1)
      .mockResolvedValueOnce(mockResponsePage2);

    const result = await fetchNews('test');

    expect(result).toEqual([
      'Test news 1',
      'Another test news 2',
      'Test news 3',
      'Test news 4',
      'Test news 5',
    ]);
    expect(datanews.search).toHaveBeenCalledWith('test', { n: 5 });
    expect(datanews.search).toHaveBeenCalledWith('test', { n: 10 });
  });
});
