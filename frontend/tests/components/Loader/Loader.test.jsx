// tests/components/Loader/Loader.test.jsx
import React from 'react';
import { render } from '@testing-library/react';
import Loader from '../../../src/components/Loader/Loader';

// Mock react-loader-spinner components
const mockRotatingLines = jest.fn();
jest.mock('react-loader-spinner', () => ({
  RotatingLines: (props) => {
    mockRotatingLines(props);
    return <div data-testid="rotating-lines" {...props}></div>;
  },
}));

describe('Loader', () => {
  beforeEach(() => {
    mockRotatingLines.mockClear();
  });

  test('renders rotating lines loader', () => {
    const { getByTestId } = render(<Loader />);
    const loaderElement = getByTestId('rotating-lines');
    expect(loaderElement).not.toBeNull();
  });

  test('applies correct props to RotatingLines', () => {
    render(<Loader />);
    expect(mockRotatingLines).toHaveBeenCalledWith(
      expect.objectContaining({
        strokeColor: 'white',
        strokeWidth: '5',
        animationDuration: '0.75',
        width: '35',
        visible: true,
      })
    );
  });
});
