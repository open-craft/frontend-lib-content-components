import React from 'react';

import AnswerWidget from './AnswerWidget';
import SettingsWidget from './SettingsWidget';
import QuestionWidget from './QuestionWidget';
import { EditorContainer } from '../../../EditorContainer';
import { selectors } from '../../../../data/redux';
import { useSelector } from 'react-redux';

export const EditProblemView = () => {
  const problemType = useSelector(selectors.problem.problemType);
  return (
      <EditorContainer getContent={() => ({})}>
        <QuestionWidget />
        <AnswerWidget problemType={problemType} />
        <SettingsWidget />
      </EditorContainer>
  );
};

export default EditProblemView;
