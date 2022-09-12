import React, { useEffect, useState } from 'react';
import { Button } from '@edx/paragon';
import { Add } from '@edx/paragon/icons';
import { useSelector } from 'react-redux';

import AnswerOption from "./AnswerOption";
import { selectors } from '../../../../../data/redux';
import { ProblemTypeKeys } from '../../../../../data/constants/problem';

const alphabets = [...Array(26).keys()].map(i => String.fromCharCode(i + 65));

export const hooks = {
  displayAnswers: ({
    hasSingleAnswer,
    answers,
    setAnswers,
  }) => {
    return answers.map((answer) => {
      const setAnswer = (changes) => {
        setAnswers(prevState => {
          const newState = prevState.map(obj => {
            if (obj.id === answer.id) {
              return {...obj, ...changes};
            }
            // set other answers as incorrect if problem only has one answer correct
            // and changes object include correct key change
            if (hasSingleAnswer && "correct" in changes) {
              return {...obj, correct: false};
            }
            return obj;
          });

          return newState;
        });
      };

      const deleteAnswer = () => {
        setAnswers((currAnswers) => {
          const newAnswers = currAnswers.filter(obj => obj.id !== answer.id).map((answer, index) => {
            return {...answer, id: alphabets[index]}
          });
          return newAnswers;
        });
      }

      return <AnswerOption
        key={answer.id}
        hasSingleAnswer={hasSingleAnswer}
        answer={answer}
        setAnswer={setAnswer}
        deleteAnswer={deleteAnswer} />
    });
  },
  addAnswer: (setAnswers) => {
    const nextId = (lastId) => String.fromCharCode(lastId.charCodeAt(0) + 1)
    setAnswers((currAnswers) => {
      if (currAnswers.length >= alphabets.length) {
        return currAnswers;
      }
      const newOption = {
        id: currAnswers.length ? nextId(currAnswers[currAnswers.length - 1].id) : "A",
        title: "",
        selectedFeedback: "",
        unselectedFeedback: "",
        correct: false,
      };
      return [
        ...currAnswers,
        newOption,
      ]
    });
    return;
  },
}

export const AnswersContainer = ({
  //Redux
  problemType,
}) => {
  const mainAnswerState = useSelector(selectors.problem.answers);
  const [answers, setAnswers] = useState(mainAnswerState);
  const hasSingleAnswer = problemType === ProblemTypeKeys.DROPDOWN || problemType === ProblemTypeKeys.SINGLESELECT;

  useEffect(() => {
    setAnswers((currAnswers) => {
      const newAnswers = currAnswers.map((answer, index) => {
        return {...answer, id: alphabets[index]}
      });
      return newAnswers;
    });
  }, [setAnswers])

  return (
    <div>
      {hooks.displayAnswers({hasSingleAnswer, answers, setAnswers})}
      <Button className="my-3 ml-2" iconBefore={Add} variant="tertiary" onClick={() => hooks.addAnswer(setAnswers)}>
        Add answer
      </Button>
    </div>
  );
}

export default AnswersContainer;
