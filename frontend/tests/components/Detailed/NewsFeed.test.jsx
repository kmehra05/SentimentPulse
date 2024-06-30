// tests/components/Detailed/NewsFeed.test.jsx
import React from 'react';
import { render } from '@testing-library/react';
import NewsFeed from '../../../src/components/Detailed/NewsFeed';

describe('NewsFeed', () => {
  const mockData = [
    { title: 'News Item 1', sentiment: 6.0 },
    { title: 'News Item 2', sentiment: 5.0 },
    { title: 'News Item 3', sentiment: 4.0 },
  ];

  test('renders news feed title', () => {
    const { getByText } = render(<NewsFeed data={mockData} />);
    const titleElement = getByText(/Latest News/i);
    expect(titleElement).not.toBeNull();
  });

  test('renders news items with correct titles and sentiments', () => {
    const { getByText, container } = render(<NewsFeed data={mockData} />);

    mockData.forEach(item => {
      const titleElement = getByText(item.title);
      expect(titleElement).not.toBeNull();

      const sentimentElement = getByText(item.sentiment.toFixed(1));
      expect(sentimentElement).not.toBeNull();
    });
  });

  test('applies correct sentiment classes', () => {
    const { container } = render(<NewsFeed data={mockData} />);

    const greenElement = container.querySelector('.green');
    expect(greenElement).not.toBeNull();
    expect(greenElement.textContent).toBe('6.0');

    const grayElement = container.querySelector('.gray');
    expect(grayElement).not.toBeNull();
    expect(grayElement.textContent).toBe('5.0');

    const redElement = container.querySelector('.red');
    expect(redElement).not.toBeNull();
    expect(redElement.textContent).toBe('4.0');
  });
});
