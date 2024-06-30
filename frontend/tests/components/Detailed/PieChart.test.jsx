import React from 'react';
import { render } from '@testing-library/react';
import CustomPieChart from '../../../src/components/Detailed/PieChart';

// Mock Recharts components
jest.mock('recharts', () => ({
  ...jest.requireActual('recharts'),
  PieChart: ({ children }) => <svg>{children}</svg>,
  Pie: ({ children }) => <g>{children}</g>,
  Cell: () => <path />,
  Tooltip: () => <g />,
  Legend: () => <g />,
}));

describe('CustomPieChart', () => {
  const positive = 40;
  const neutral = 30;
  const negative = 30;

  test('renders chart title', () => {
    const { getByText } = render(<CustomPieChart positive={positive} neutral={neutral} negative={negative} />);
    const titleElement = getByText(/Sentiment Breakdown/i);
    expect(titleElement).not.toBeNull();
  });

  test('renders pie chart elements', () => {
    const { container } = render(<CustomPieChart positive={positive} neutral={neutral} negative={negative} />);

    // Check for the existence of the SVG element that represents the chart
    const svgElement = container.querySelector('svg');
    expect(svgElement).not.toBeNull();

    // Check for the existence of the Pie element
    const pieElement = container.querySelector('g');
    expect(pieElement).not.toBeNull();

    // Check for the existence of the Cell elements
    const cellElements = container.querySelectorAll('path');
    expect(cellElements.length).toBeGreaterThan(0);
  });
});
