import React, { useEffect } from 'react';
import { Button } from '@edx/paragon';
import { Add } from '@edx/paragon/icons';
import { useDispatch, useSelector } from 'react-redux';

import AnswerOption from "./AnswerOption";
import { actions, selectors } from '../../../../../data/redux';
import { ProblemTypeKeys } from '../../../../../data/constants/problem';


export const hooks = {
  initialize: (problemType) => {
    const answers = useSelector(selectors.problem.answers);
    const dispatch = useDispatch();
    const hasSingleAnswer = problemType === ProblemTypeKeys.DROPDOWN || problemType === ProblemTypeKeys.SINGLESELECT;
    useEffect(() => {
      dispatch(actions.problem.resetAnswerIds());
    }, [])
    return {answers, hasSingleAnswer, dispatch};
  },
  displayAnswers: ({
    hasSingleAnswer,
    answers,
  }) => {
    return answers.map((answer) => {
      return <AnswerOption
        key={answer.id}
        hasSingleAnswer={hasSingleAnswer}
        answer={answer} />
    });
  },
  addAnswer: ({dispatch, hasSingleAnswer}) => dispatch(actions.problem.addAnswer({hasSingleAnswer})),
}

export const AnswersContainer = ({
  //Redux
  problemType,
}) => {
  const {answers, hasSingleAnswer, dispatch} = hooks.initialize(problemType);
  const addAnswer = () => hooks.addAnswer({dispatch, hasSingleAnswer});

  return (
    <div>
      {hooks.displayAnswers({hasSingleAnswer, answers})}
      <Button
        className="my-3 ml-2"
        iconBefore={Add}
        variant="tertiary"
        onClick={addAnswer}
      >
        Add answer
      </Button>
    </div>
  );
}

export default AnswersContainer;
