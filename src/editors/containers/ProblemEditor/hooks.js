import { useRef, useCallback, useState, useEffect } from 'react';
import { ProblemTypeKeys } from '../../data/constants/problem';
import { StrictDict } from '../../utils';
import * as module from './hooks';

export const state = StrictDict({
  refReady: (val) => useState(val),
});

export const problemEditorConfig = ({
  setEditorRef,
  editorRef,
  question,
  dispatch,
  updateQuestionState
}) => ({
  onInit: (evt, editor) => {
    setEditorRef(editor);
  },
  initialValue: question ? question : '',
  onFocusOut: updateQuestionState(dispatch, editorRef),
});

export const prepareEditorRef = () => {
  const editorRef = useRef(null);
  const setEditorRef = useCallback((ref) => {
    editorRef.current = ref;
  }, []);
  const [refReady, setRefReady] = module.state.refReady(false);
  useEffect(() => setRefReady(true), []);
  return { editorRef, refReady, setEditorRef };
};

export const initializeAnswerContainer = (problemType) => {
  const hasSingleAnswer = problemType === ProblemTypeKeys.DROPDOWN || problemType === ProblemTypeKeys.SINGLESELECT;
  return { hasSingleAnswer };
}
