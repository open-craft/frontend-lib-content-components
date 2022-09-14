import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Col, Collapsible, Icon, IconButton, Form, Row } from '@edx/paragon';
import { AddComment, Delete } from '@edx/paragon/icons';
import { FormattedMessage, injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { useDispatch } from 'react-redux';

import messages from './messages';
import { actions } from '../../../../../data/redux';
import { answerOptionProps } from "../../../../../data/services/cms/types";

let AnswerOption = ({
  answer,
  hasSingleAnswer,
  // injected
  intl,
}) => {
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const dispatch = useDispatch();
  const deleteAnswer = () => dispatch(actions.problem.deleteAnswer({ id: answer.id }));
  const setAnswer = (payload) => dispatch(actions.problem.updateAnswer({ id: answer.id, hasSingleAnswer, ...payload }));

  useEffect(() => {
    // show feedback fields if feedback is present
    setIsFeedbackVisible(!!answer.selectedFeedback || !!answer.unselectedFeedback || !!answer.feedback);
  }, [])

  const toggleFeedback = (open) => {
    // do not allow to hide if feedback is added
    if (!!answer.selectedFeedback || !!answer.unselectedFeedback || !!answer.feedback) {
      return;
    }
    setIsFeedbackVisible(open);
  }

  const Checker = () => {
    let CheckerType = Form.Checkbox;
    if (hasSingleAnswer) {
      CheckerType = Form.Radio;
    }
    return (
      <CheckerType
        className="pl-4 mt-3"
        value={answer.id}
        onChange={(e) => setAnswer({correct: e.target.checked})}
        defaultChecked={answer.correct}>
        {answer.id}
      </CheckerType>
    )
  }

  const feedbackControl = ({ feedback, onChange, labelMessage, labelMessageBoldUnderline }) => (
    <Form.Group>
      <Form.Label className="mb-3">
        <FormattedMessage
          {...labelMessage}
          values={{
            answerId: answer.id,
            boldunderline: <b><u><FormattedMessage {...labelMessageBoldUnderline} /></u></b>,
          }}
          />
      </Form.Label>
      <Form.Control
        placeholder={intl.formatMessage(messages.feedbackPlaceholder)}
        value={feedback}
        onChange={onChange} />
    </Form.Group>
  )

  const displayFeedbackControl = () => {
    if (typeof answer.feedback !== "undefined") {
      return feedbackControl({
        feedback: answer.feedback,
        onChange: (e) => setAnswer({feedback: e.target.value}),
        labelMessage: messages.selectedFeedbackLabel,
        labelMessageBoldUnderline: messages.selectedFeedbackLabelBoldUnderlineText
      });
    } else {
      return [
        feedbackControl({
          feedback: answer.selectedFeedback,
          onChange: (e) => setAnswer({selectedFeedback: e.target.value}),
          labelMessage: messages.selectedFeedbackLabel,
          labelMessageBoldUnderline: messages.selectedFeedbackLabelBoldUnderlineText}),
        feedbackControl({
          feedback: answer.unselectedFeedback,
          onChange: (e) => setAnswer({unselectedFeedback: e.target.value}),
          labelMessage: messages.unSelectedFeedbackLabel,
          labelMessageBoldUnderline: messages.unSelectedFeedbackLabelBoldUnderlineText})
      ]
    }
  }

  return (
    <Collapsible.Advanced
      open={isFeedbackVisible}
      onToggle={toggleFeedback}
      className="collapsible-card">
      <Row className="my-2">

        <Col xs={1}>
          <Checker />
        </Col>

        <Col xs={10}>
          <Form.Control
            as="textarea"
            rows={1}
            value={answer.title}
            onChange={(e) => setAnswer({title: e.target.value})}
            placeholder={intl.formatMessage(messages.answerTextboxPlaceholder)}
            />

          <Collapsible.Body>
            <div className="bg-dark-100 p-4 mt-3">
              {displayFeedbackControl()}
            </div>
          </Collapsible.Body>
        </Col>

        <Col xs={1} className="d-inline-flex mt-1">
          <Collapsible.Trigger>
            <IconButton
              src={AddComment}
              iconAs={Icon}
              alt={intl.formatMessage(messages.feedbackToggleIconAltText)}
              variant="primary" />
          </Collapsible.Trigger>
          <IconButton
            src={Delete}
            iconAs={Icon}
            alt={intl.formatMessage(messages.answerDeleteIconAltText)}
            onClick={deleteAnswer}
            variant="primary" />
        </Col>

      </Row>
    </Collapsible.Advanced>
  )
}

AnswerOption = memo(AnswerOption);
AnswerOption.propTypes = {
  answer: answerOptionProps.isRequired,
  hasSingleAnswer: PropTypes.bool.isRequired,
  // injected
  intl: intlShape.isRequired,
};

export default injectIntl(AnswerOption);
