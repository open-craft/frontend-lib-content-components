import React from 'react';

import AnswerWidget from './AnswerWidget';
import SettingsWidget from './SettingsWidget';
import QuestionWidget from './QuestionWidget';
import { EditorContainer } from '../../../EditorContainer';
import { selectors } from '../../../../data/redux';
import { useSelector } from 'react-redux';
import { ReactStateParser } from '../../data/ReactStateParser';



export const EditProblemView = () => {
  const problemType = useSelector(selectors.problem.problemType);
  const problemState = useSelector(selectors.problem.completeState);
  const parseSate = (problemState) => () => {
    let reactParser = new ReactStateParser(problemState);
    return reactParser.getMarkdown();
 }
  return (
      <EditorContainer getContent={parseSate(problemState)}>
        <QuestionWidget />
        <AnswerWidget problemType={problemType} />
        <SettingsWidget />
      </EditorContainer>
  );
};

export default EditProblemView;
