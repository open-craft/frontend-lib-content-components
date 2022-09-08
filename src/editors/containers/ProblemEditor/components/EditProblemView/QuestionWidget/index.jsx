import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { selectors } from '../../../../../data/redux';
import { useSelector } from 'react-redux';


// This widget should be connected, grab all questions from store, update them as needed.
export default function QuestionWidget() {
  const question = useSelector(selectors.problem.question);
  return (
    <div>
      <div>
        <h1>
          Question
        </h1>
        <Editor initialValue={question}/>
      </div>
    </div>
  );
}
