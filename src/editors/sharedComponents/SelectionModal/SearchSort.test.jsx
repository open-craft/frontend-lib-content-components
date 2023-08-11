import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { sortKeys, sortMessages } from '../ImageUploadModal/SelectImageModal/utils';
import { filterKeys, filterMessages } from '../../containers/VideoGallery/utils';
import { SearchSort } from './SearchSort';

jest.unmock('react-redux');
jest.unmock('@edx/frontend-platform/i18n');
jest.unmock('@edx/paragon');
jest.unmock('@edx/paragon/icons');
describe('SearchSort component', () => {
  const props = {
    searchString: 'props.searchString',
    onSearchChange: jest.fn().mockName('props.onSearchChange'),
    clearSearchString: jest.fn().mockName('props.clearSearchString'),
    sortBy: sortKeys.dateOldest,
    sortKeys,
    sortMessages,
    onSortClick: jest.fn().mockName('props.onSortClick'),
    switchMessage: { id: 'test.id', defaultMessage: 'test message' },
  };
  describe('without filterKeys', () => {
    test('adds a sort option for each sortKey', () => {
      const { getByRole } = render(
        <IntlProvider locale="en">
          <SearchSort {...props} />
        </IntlProvider>,
      );
      fireEvent.click(screen.getByRole('button', {
        name: /by date added \(oldest\)/i,
      }));
      Object.values(sortMessages).forEach(({ defaultMessage }) => {
        expect(getByRole('link', { name: defaultMessage })).toBeInTheDocument();
      });
    });
  });
  describe('with filterKeys', () => {
    const filterProps = {
      ...props,
      filterKeys,
      filterMessages,
      showSwitch: true,
      onFilterClick: jest.fn().mockName('props.onFilterClick'),
    };
    test('adds a sort option for each sortKey', () => {
      const { getByRole } = render(
        <IntlProvider locale="en">
          <SearchSort {...filterProps} />
        </IntlProvider>,
      );
      fireEvent.click(screen.getByRole('button', { name: /by date added \(oldest\)/i }));
      Object.values(sortMessages).forEach(({ defaultMessage }) => {
        expect(getByRole('link', { name: defaultMessage })).toBeInTheDocument();
      });
    });
    test('adds a filter option for each filterKet', () => {
      const { getByRole } = render(
        <IntlProvider locale="en">
          <SearchSort {...filterProps} />
        </IntlProvider>,
      );
      fireEvent.click(screen.getByRole('button', { name: /select/i }));
      screen.logTestingPlaygroundURL();
      Object.values(filterMessages).forEach(({ defaultMessage }) => {
        expect(getByRole('link', { name: defaultMessage })).toBeInTheDocument();
      });
    });
  });
});
