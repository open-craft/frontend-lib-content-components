import React from 'react';
import { Button } from '@edx/paragon';
import { Add } from '@edx/paragon/icons';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from '@edx/frontend-platform/i18n';

import messages from './messages';
import AnswerOption from './AnswerOption';
import { actions, selectors } from '../../../../../data/redux';
import { ProblemTypeKeys } from '../../../../../data/constants/problem';

export const hooks = {
  initialize: (problemType) => {
    const answers = useSelector(selectors.problem.answers);
    const dispatch = useDispatch();
    const hasSingleAnswer = problemType === ProblemTypeKeys.DROPDOWN || problemType === ProblemTypeKeys.SINGLESELECT;
    return { answers, hasSingleAnswer, dispatch };
  },
  displayAnswers: ({
    hasSingleAnswer,
    answers,
  }) => answers.map((answer) => (
    <AnswerOption
      key={answer.id}
      hasSingleAnswer={hasSingleAnswer}
      answer={answer}
    />
  )),
  addAnswer: ({ dispatch }) => dispatch(actions.problem.addAnswer()),
};

export const AnswersContainer = ({
  // Redux
  problemType,
}) => {
  const { answers, hasSingleAnswer, dispatch } = hooks.initialize(problemType);
  const addAnswer = () => hooks.addAnswer({ dispatch });

  return (
    <div>
      {hooks.displayAnswers({ hasSingleAnswer, answers })}
      <Button
        className="my-3 ml-2"
        iconBefore={Add}
        variant="tertiary"
        onClick={addAnswer}
      >
        <FormattedMessage {...messages.addAnswerButtonText} />
      </Button>
    </div>
  );
};

AnswersContainer.propTypes = {
  problemType: ProblemTypeKeys.isRequired,
};
export default AnswersContainer;
