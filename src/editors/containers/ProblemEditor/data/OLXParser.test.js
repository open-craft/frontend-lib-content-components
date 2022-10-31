import { OLXParser } from './OLXParser';
import {
  checkboxesOLXWithFeedbackAndHintsOLX,
  dropdownOLXWithFeedbackAndHintsOLX,
  numericInputWithFeedbackAndHintsOLX,
  numericInputWithFeedbackAndHintsOLXException,
  textInputWithFeedbackAndHintsOLX,
  mutlipleChoiceWithFeedbackAndHintsOLX,
  textInputWithFeedbackAndHintsOLXWithMultipleAnswers,
} from './mockData/olxTestData';
import { ProblemTypeKeys } from '../../../data/constants/problem';

describe('Check OLXParser problem type', () => {
  test('Test checkbox with feedback and hints problem type', () => {
    const olxparser = new OLXParser(checkboxesOLXWithFeedbackAndHintsOLX.rawOLX);
    const problemType = olxparser.getProblemType();
    expect(problemType).toBe(ProblemTypeKeys.MULTISELECT);
  });
  test('Test numeric problem type', () => {
    const olxparser = new OLXParser(numericInputWithFeedbackAndHintsOLX.rawOLX);
    const problemType = olxparser.getProblemType();
    expect(problemType).toBe(ProblemTypeKeys.NUMERIC);
  });
  test('Test dropdown with feedback and hints problem type', () => {
    const olxparser = new OLXParser(dropdownOLXWithFeedbackAndHintsOLX.rawOLX);
    const problemType = olxparser.getProblemType();
    expect(problemType).toBe(ProblemTypeKeys.DROPDOWN);
  });
  test('Test multiple choice with feedback and hints problem type', () => {
    const olxparser = new OLXParser(mutlipleChoiceWithFeedbackAndHintsOLX.rawOLX);
    const problemType = olxparser.getProblemType();
    expect(problemType).toBe(ProblemTypeKeys.SINGLESELECT);
  });
  test('Test textual problem type', () => {
    const olxparser = new OLXParser(textInputWithFeedbackAndHintsOLX.rawOLX);
    const problemType = olxparser.getProblemType();
    expect(problemType).toBe(ProblemTypeKeys.TEXTINPUT);
  });
});

describe('Check OLXParser hints', () => {
  test('Test checkbox hints', () => {
    const olxparser = new OLXParser(checkboxesOLXWithFeedbackAndHintsOLX.rawOLX);
    const hints = olxparser.getHints();
    expect(hints).toEqual(checkboxesOLXWithFeedbackAndHintsOLX.hints);
  });
  test('Test numeric hints', () => {
    const olxparser = new OLXParser(numericInputWithFeedbackAndHintsOLX.rawOLX);
    const hints = olxparser.getHints();
    expect(hints).toEqual(numericInputWithFeedbackAndHintsOLX.hints);
  });
  test('Test dropdown with feedback and hints problem type', () => {
    const olxparser = new OLXParser(dropdownOLXWithFeedbackAndHintsOLX.rawOLX);
    const hints = olxparser.getHints();
    expect(hints).toEqual(dropdownOLXWithFeedbackAndHintsOLX.hints);
  });
  test('Test multiple choice with feedback and hints problem type', () => {
    const olxparser = new OLXParser(mutlipleChoiceWithFeedbackAndHintsOLX.rawOLX);
    const hints = olxparser.getHints();
    expect(hints).toEqual(mutlipleChoiceWithFeedbackAndHintsOLX.hints);
  });
  test('Test textual problem type', () => {
    const olxparser = new OLXParser(textInputWithFeedbackAndHintsOLX.rawOLX);
    const hints = olxparser.getHints();
    expect(hints).toEqual(textInputWithFeedbackAndHintsOLX.hints);
  });
});

describe('Check OLXParser for answer parsing', () => {
  test('Test checkbox answer', () => {
    const olxparser = new OLXParser(checkboxesOLXWithFeedbackAndHintsOLX.rawOLX);
    const answer = olxparser.parseMultipleChoiceAnswers('choiceresponse', 'checkboxgroup', 'choice');
    expect(answer).toEqual(checkboxesOLXWithFeedbackAndHintsOLX.data);
  });
  test('Test dropdown answer', () => {
    const olxparser = new OLXParser(dropdownOLXWithFeedbackAndHintsOLX.rawOLX);
    const answer = olxparser.parseMultipleChoiceAnswers('optionresponse', 'optioninput', 'option');
    expect(answer).toEqual(dropdownOLXWithFeedbackAndHintsOLX.data);
  });
  test('Test multiple choice single select', () => {
    const olxparser = new OLXParser(mutlipleChoiceWithFeedbackAndHintsOLX.rawOLX);
    const answer = olxparser.parseMultipleChoiceAnswers('multiplechoiceresponse', 'choicegroup', 'choice');
    expect(answer).toEqual(mutlipleChoiceWithFeedbackAndHintsOLX.data);
  });
  test('Test string response answers', () => {
    const olxparser = new OLXParser(textInputWithFeedbackAndHintsOLX.rawOLX);
    const answer = olxparser.parseStringResponse();
    expect(answer).toEqual(textInputWithFeedbackAndHintsOLX.data);
  });
  test('Test string response answers with multiple answers', () => {
    const olxparser = new OLXParser(textInputWithFeedbackAndHintsOLXWithMultipleAnswers.rawOLX);
    const answer = olxparser.parseStringResponse();
    expect(answer).toEqual(textInputWithFeedbackAndHintsOLXWithMultipleAnswers.data);
  });
  test('Test numerical response answers', () => {
    const olxparser = new OLXParser(numericInputWithFeedbackAndHintsOLX.rawOLX);
    const answer = olxparser.parseNumericResponse();
    expect(answer).toEqual(numericInputWithFeedbackAndHintsOLX.data);
  });
  test('Test numerical response answers exception', () => {
    const olxparser = new OLXParser(numericInputWithFeedbackAndHintsOLXException.rawOLX);
    const answer = olxparser.parseNumericResponse();
    expect(answer).toEqual(numericInputWithFeedbackAndHintsOLXException.data);
  });
});

describe('Check OLXParser for question parsing', () => {
  test('Test checkbox question', () => {
    const olxparser = new OLXParser(checkboxesOLXWithFeedbackAndHintsOLX.rawOLX);
    const question = olxparser.parseQuestions('choiceresponse');
    expect(question).toEqual(checkboxesOLXWithFeedbackAndHintsOLX.question);
  });
  test('Test dropdown question', () => {
    const olxparser = new OLXParser(dropdownOLXWithFeedbackAndHintsOLX.rawOLX);
    const question = olxparser.parseQuestions('optionresponse');
    expect(question).toEqual(dropdownOLXWithFeedbackAndHintsOLX.question);
  });
  test('Test multiple choice single select question', () => {
    const olxparser = new OLXParser(mutlipleChoiceWithFeedbackAndHintsOLX.rawOLX);
    const question = olxparser.parseQuestions('multiplechoiceresponse');
    expect(question).toEqual(mutlipleChoiceWithFeedbackAndHintsOLX.question);
  });
  test('Test string response question', () => {
    const olxparser = new OLXParser(textInputWithFeedbackAndHintsOLX.rawOLX);
    const question = olxparser.parseQuestions('stringresponse');
    expect(question).toEqual(textInputWithFeedbackAndHintsOLX.question);
  });
  test('Test numerical response question', () => {
    const olxparser = new OLXParser(numericInputWithFeedbackAndHintsOLX.rawOLX);
    const question = olxparser.parseQuestions('numericalresponse');
    expect(question).toEqual(numericInputWithFeedbackAndHintsOLX.question);
  });
  test('Test numerical response question exception', () => {
    const olxparser = new OLXParser(numericInputWithFeedbackAndHintsOLXException.rawOLX);
    const question = olxparser.parseQuestions('numericalresponse');
    expect(question).toEqual(numericInputWithFeedbackAndHintsOLXException.question);
  });
});
