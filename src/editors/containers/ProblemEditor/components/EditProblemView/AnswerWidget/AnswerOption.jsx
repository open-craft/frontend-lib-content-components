import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Col, Collapsible, Icon, IconButton, Form, Row } from '@edx/paragon';
import { AddComment, Delete } from '@edx/paragon/icons';
import { FormattedMessage, injectIntl, intlShape } from '@edx/frontend-platform/i18n';

import messages from './messages';
import { answerOptionProps } from "../../../../../data/services/cms/types";

const AnswerOption = ({
  answer,
  hasSingleAnswer,
  setAnswer,
  deleteAnswer,
  // injected
  intl,
}) => {
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);

  useEffect(() => {
    // show feedback fields if feedback is present
    setIsFeedbackVisible(!!answer.selectedFeedback || !!answer.unselectedFeedback);
  }, [])

  const toggleFeedback = (open) => {
    // do not allow to hide if feedback is added
    if (!!answer.selectedFeedback || !!answer.unselectedFeedback) {
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
              <Form.Group>
                <Form.Label className="mb-3">
                  <FormattedMessage
                    {...messages.selectedFeedbackLabel}
                    values={{
                      answerId: answer.id,
                      boldunderline: <b><u><FormattedMessage {...messages.selectedFeedbackLabelBoldUnderlineText} /></u></b>,
                    }}
                    />
                </Form.Label>
                <Form.Control
                  placeholder={intl.formatMessage(messages.feedbackPlaceholder)}
                  value={answer.selectedFeedback || ""}
                  onChange={(e) => setAnswer({selectedFeedback: e.target.value})} />
              </Form.Group>
              <Form.Group>
                <Form.Label className="mb-3">
                  <FormattedMessage
                    {...messages.unSelectedFeedbackLabel}
                    values={{
                      answerId: answer.id,
                      boldunderline: <b><u><FormattedMessage {...messages.unSelectedFeedbackLabelBoldUnderlineText} /></u></b>,
                    }}
                    />
                </Form.Label>
                <Form.Control
                  placeholder={intl.formatMessage(messages.feedbackPlaceholder)}
                  value={answer.unselectedFeedback || ""}
                  onChange={(e) => setAnswer({unselectedFeedback: e.target.value})} />
              </Form.Group>
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

AnswerOption.propTypes = {
  answer: answerOptionProps.isRequired,
  hasSingleAnswer: PropTypes.bool.isRequired,
  setAnswer: PropTypes.func.isRequired,
  deleteAnswer: PropTypes.func.isRequired,
  // injected
  intl: intlShape.isRequired,
};

export default injectIntl(AnswerOption);
