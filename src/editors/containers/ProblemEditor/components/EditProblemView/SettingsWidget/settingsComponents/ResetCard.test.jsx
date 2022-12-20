import React from 'react';
import { shallow } from 'enzyme';
import { formatMessage } from '../../../../../../../testUtils';
import { ResetCard } from './ResetCard';
import { resetCardHooks } from '../hooks';

jest.mock('../hooks', () => ({
  resetCardHooks: jest.fn(),
}));

describe('ResetCard', () => {
  const props = {
    showResetButton: false,
    updateSettings: jest.fn().mockName('args.updateSettings'),
    intl: { formatMessage },
  };

  const resetCardHooksProps = {
    setResetTrue: jest.fn().mockName('resetCardHooks.setResetTrue'),
    setResetFalse: jest.fn().mockName('resetCardHooks.setResetFalse'),
  };

  resetCardHooks.mockReturnValue(resetCardHooksProps);

  describe('behavior', () => {
    it(' calls resetCardHooks when initialized', () => {
      shallow(<ResetCard {...props} />);
      expect(resetCardHooks).toHaveBeenCalledWith(props.updateSettings);
    });
  });

  describe('snapshot', () => {
    test('snapshot: renders reset true setting card', () => {
      expect(shallow(<ResetCard {...props} />)).toMatchSnapshot();
    });
    test('snapshot: renders reset true setting card', () => {
      expect(shallow(<ResetCard {...props} showResetButton />)).toMatchSnapshot();
    });
  });
});
