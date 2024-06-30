// tests/components/SearchBar/SearchBar.test.jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import SearchBar from '../../../src/components/SearchBar/SearchBar';

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('SearchBar', () => {
  const mockSetLoading = jest.fn();
  const mockNavigate = jest.fn();
  const initialKeyword = 'test';

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
  });

  test('renders search bar with initial keyword', () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <SearchBar keyword={initialKeyword} setLoading={mockSetLoading} />
      </MemoryRouter>
    );
    const inputElement = getByPlaceholderText(/Enter topic or keyword ↵/i);
    expect(inputElement).not.toBeNull();
    expect(inputElement.value).toBe(initialKeyword);
  });

  test('updates keyword on input change', () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <SearchBar keyword={initialKeyword} setLoading={mockSetLoading} />
      </MemoryRouter>
    );
    const inputElement = getByPlaceholderText(/Enter topic or keyword ↵/i);
    fireEvent.change(inputElement, { target: { value: 'new keyword' } });
    expect(inputElement.value).toBe('new keyword');
  });

  test('calls handleSearch on Enter key press', () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <SearchBar keyword={initialKeyword} setLoading={mockSetLoading} />
      </MemoryRouter>
    );
    const inputElement = getByPlaceholderText(/Enter topic or keyword ↵/i);
    fireEvent.change(inputElement, { target: { value: 'new keyword' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockNavigate).toHaveBeenCalledWith('/analyze/new keyword');
  });
});
