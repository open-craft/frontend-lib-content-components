import { createSelector } from 'reselect';
import * as module from './selectors';


export const problemState = (state) => state.problem;
const mkSimpleSelector = (cb) => createSelector([module.problemState], cb);
export const simpleSelectors = {
  problemType: mkSimpleSelector(problemData => problemData.problemType),
  answers: mkSimpleSelector(problemData => problemData.answers),
  settings: mkSimpleSelector(problemData => problemData.settings),
  question: mkSimpleSelector(problemData => problemData.question),
}

export default {
  ...simpleSelectors,
};
