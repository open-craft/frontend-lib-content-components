import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { selectors, actions } from '../../../../../data/redux';
import { useSelector, useDispatch } from 'react-redux';
import * as hooks from '../../../hooks';

// This widget should be connected, grab all questions from store, update them as needed.
export default function QuestionWidget() {
  const question = useSelector(selectors.problem.question);
  const dispatch = useDispatch();
  const { editorRef, refReady, setEditorRef } = hooks.prepareEditorRef();
  const updateQuestionState = (dispatch, editorRef) => {
    return (e) => {
      debugger;
      let content = editorRef.current.getContent();
      console.log(content);
      dispatch(actions.problem.updateQuestion(content));
    }
  }
  if (!refReady) { return null; }
  return (
    <div>
      <div>
        <h1>
          Question
        </h1>
        <Editor {
          ...hooks.problemEditorConfig({
            setEditorRef,
            editorRef,
            question,
            dispatch,
            updateQuestionState,
          })
        }/>
      </div>
    </div>
  );
}
