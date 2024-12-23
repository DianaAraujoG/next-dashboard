import React from 'react';
import {
  render,
  cleanup,
  screen,
  fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchSelect, { ISearchSelectProps } from '../app/ui/SearchSelect';
import { MOCK_OPTIONS } from './mockData';

const PROPS_COMPONENT: ISearchSelectProps = {
    optionsStates: MOCK_OPTIONS
};

describe('Testing "SearchSelect" component', () => {
  afterEach(cleanup);

  test('Show component in document', async () => {
    const { container } = render(<SearchSelect {...PROPS_COMPONENT} />);
    expect(container).toBeInTheDocument();
  });

  test('Should change the value of the search input', () => {
    render(<SearchSelect {...PROPS_COMPONENT} />);
    const mockValue = 'Puebla';
    const mainElement = screen.getByTestId('searchSelect-component');
    const elementInputId = mainElement.querySelector('[id="search-select"]');
    fireEvent.change(elementInputId as Element, {
      target: { value: mockValue }
    });
    expect(elementInputId).toHaveValue(mockValue);
  });

  test('Show change the value of the input when selecting an option from the list', () => {
    const { container } = render(<SearchSelect {...PROPS_COMPONENT} />);
    const mainElement = screen.getByTestId('searchSelect-component');
    const elementInputId = mainElement.querySelector('[id="search-select"]');
    const elementListOptions = container.querySelectorAll('li');
    fireEvent.click(elementListOptions[2]);
    expect(elementInputId).toHaveValue(MOCK_OPTIONS[2]);
  });

});
