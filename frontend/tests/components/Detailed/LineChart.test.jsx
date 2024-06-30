import React from 'react';
import { render } from '@testing-library/react';
import CustomLineChart from '../../../src/components/Detailed/LineChart';
import moment from 'moment';

// Mock ResizeObserver
global.ResizeObserver = class {
  constructor(callback) { }
  observe() { }
  unobserve() { }
  disconnect() { }
};

// Mock Recharts components
jest.mock('recharts', () => ({
  ...jest.requireActual('recharts'),
  LineChart: ({ children }) => <svg>{children}</svg>,
  Line: () => <line />,
  XAxis: () => <g className="recharts-x-axis" />,
  YAxis: () => <g className="recharts-y-axis" />,
  CartesianGrid: () => <g />,
  Tooltip: () => <g />,
  Legend: () => <g />,
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
}));

describe('CustomLineChart', () => {
  const mockData = [
    { sentimentStats: 5, dateTime: moment().subtract(1, 'days').toISOString() },
    { sentimentStats: 7, dateTime: moment().subtract(2, 'days').toISOString() },
  ];

  test('renders chart title', () => {
    const { getByText } = render(<CustomLineChart data={mockData} />);
    const titleElement = getByText(/Sentiment History/i);
    expect(titleElement).not.toBeNull();
  });

  test('renders line chart elements', () => {
    const { container } = render(<CustomLineChart data={mockData} />);

    // Check for the existence of the SVG element that represents the chart
    const svgElement = container.querySelector('svg');
    expect(svgElement).not.toBeNull();

    // Check for the existence of XAxis and YAxis
    const xAxisElement = container.querySelector('.recharts-x-axis');
    const yAxisElement = container.querySelector('.recharts-y-axis');
    expect(xAxisElement).not.toBeNull();
    expect(yAxisElement).not.toBeNull();

    // Check for the existence of the line path elements
    const lineElements = container.querySelectorAll('line');
    expect(lineElements.length).toBeGreaterThan(0);
  });
});
