import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Button,
  Stack,
  Icon,
  IconButton,
  Card,
  Dropdown,
} from '@edx/paragon';
import { FileUpload, MoreHoriz } from '@edx/paragon/icons';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';

import { actions, selectors } from '../../../../../../data/redux';
import * as hooks from './hooks';
import messages from './messages';

import FileInput from '../../../../../../sharedComponents/FileInput';
import { ErrorAlert } from '../../../../../../sharedComponents/ErrorAlerts/ErrorAlert';
import { UploadErrorAlert } from '../../../../../../sharedComponents/ErrorAlerts/UploadErrorAlert';
import CollapsibleFormWidget from '../CollapsibleFormWidget';
import { ErrorContext } from '../../../../hooks';

/**
 * Collapsible Form widget controlling video handouts
 */
export const HandoutWidget = ({
  // injected
  intl,
  // redux
  handout,
  getHandoutDownloadUrl,
  updateField,
}) => {
  const [error] = React.useContext(ErrorContext).handout;
  const { fileSizeError } = hooks.fileSizeError();
  const fileInput = hooks.fileInput({ fileSizeError });
  const handoutName = hooks.parseHandoutName({ handout });
  const downloadLink = getHandoutDownloadUrl({ handout });

  return (
    <CollapsibleFormWidget
      isError={Object.keys(error).length !== 0}
      title={intl.formatMessage(messages.titleLabel)}
      subtitle={handoutName}
    >
      <ErrorAlert
        dismissError={fileSizeError.dismiss}
        hideHeading
        isError={fileSizeError.show}
      >
        <FormattedMessage {...messages.fileSizeError} />
      </ErrorAlert>
      <UploadErrorAlert message={messages.uploadHandoutError} />
      <FileInput fileInput={fileInput} />
      {handout ? (
        <Card>
          <Card.Header
            className="mt-1"
            subtitle={handoutName}
            actions={(
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-toggle-with-iconbutton-video-transcript-widget"
                  as={IconButton}
                  src={MoreHoriz}
                  iconAs={Icon}
                  variant="primary"
                  alt="Actions dropdown"
                />
                <Dropdown.Menu className="video_handout Action Menu">
                  <Dropdown.Item
                    key="handout-actions-replace"
                    onClick={fileInput.click}
                  >
                    <FormattedMessage {...messages.replaceHandout} />
                  </Dropdown.Item>
                  <Dropdown.Item key="handout-actions-download" target="_blank" href={downloadLink}>
                    <FormattedMessage {...messages.downloadHandout} />
                  </Dropdown.Item>
                  <Dropdown.Item key="handout-actions-delete" onClick={() => updateField({ handout: null })}>
                    <FormattedMessage {...messages.deleteHandout} />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          />
        </Card>
      ) : (
        <Stack gap={3}>
          <FormattedMessage {...messages.addHandoutMessage} />
          <Button iconBefore={FileUpload} onClick={fileInput.click} variant="link">
            <FormattedMessage {...messages.uploadButtonLabel} />
          </Button>
        </Stack>
      )}
    </CollapsibleFormWidget>
  );
};

HandoutWidget.propTypes = {
  // injected
  intl: intlShape.isRequired,
  // redux
  handout: PropTypes.shape({}).isRequired,
  updateField: PropTypes.func.isRequired,
  isUploadError: PropTypes.bool.isRequired,
  getHandoutDownloadUrl: PropTypes.func.isRequired,
};
export const mapStateToProps = (state) => ({
  handout: selectors.video.handout(state),
  getHandoutDownloadUrl: selectors.video.getHandoutDownloadUrl(state),
});

export const mapDispatchToProps = (dispatch) => ({
  updateField: (payload) => dispatch(actions.video.updateField(payload)),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(HandoutWidget));
