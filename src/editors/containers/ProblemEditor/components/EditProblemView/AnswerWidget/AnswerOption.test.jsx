import React from 'react';
import { render } from 'enzyme';
import { formatMessage } from '../../../../../../testUtils';
import AnswerOption from './AnswerOption';

jest.mock('../../../../../data/redux', () => ({
  actions: {
    problem: {
      deleteAnswer: jest.fn().mockName('actions.problem.deleteAnswer'),
      updateAnswer: jest.fn().mockName('actions.problem.updateAnswer'),
    },
  },
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useCallback: (cb, prereqs) => ({ cb, prereqs }),
}));

const answerWithOnlyFeedback = {
  id: 'A',
  title: 'Answer 1',
  correct: true,
  feedback: 'some feedback',
};
const answerWithSelectedUnselectedFeedback = {
  id: 'A',
  title: 'Answer 1',
  correct: true,
  selectedFeedback: 'selected feedback',
  unselectedFeedback: 'unselected feedback',
};
const props = {
  hasSingleAnswer: false,
  // inject
  intl: { formatMessage },
  answer: answerWithOnlyFeedback,
};

describe('AnswerOption', () => {
  describe('render', () => {
    test('snapshot: renders correct option with feedback', () => {
      expect(render(<AnswerOption {...props} />)).toMatchSnapshot();
    });
    test('snapshot: renders correct option with selected unselected feedback', () => {
      expect(render(<AnswerOption {...props} answer={answerWithSelectedUnselectedFeedback} />)).toMatchSnapshot();
    });
  });
});
