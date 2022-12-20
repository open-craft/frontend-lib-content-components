import React from 'react';
import { shallow } from 'enzyme';
import { formatMessage } from '../../../../../../../testUtils';
import { HintRow } from './HintRow';
import { HintsCard } from './HintsCard';

describe('HintRow', () => {
    const props = {
        value: "hint_1",
        handleChange: jest.fn(),
        handleDelete: jest.fn(),
        intl: { formatMessage },
    };

    describe('snapshot', () => {
        test('snapshot: renders hints row', () => {
            expect(shallow(<HintRow {...props} />)).toMatchSnapshot();
        });
    });
});