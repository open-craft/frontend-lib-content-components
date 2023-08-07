import React from 'react';
import PropTypes from 'prop-types';

import {
  ActionRow, Form, Icon, IconButton, SelectMenu, MenuItem,
} from '@edx/paragon';
import { Close, Search } from '@edx/paragon/icons';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';

import messages from './messages';

export const SearchSort = ({
  searchString,
  onSearchChange,
  clearSearchString,
  sortBy,
  onSortClick,
  sortKeys,
  sortMessages,
  filterBy,
  onFilterClick,
  filterKeys,
  filterMessages,
  showSwitch,
  switchMessage,
  onSwitchClick,
  // injected
  intl,
}) => (
  <ActionRow>
    <Form.Group style={{ margin: 0 }}>
      <Form.Control
        autoFocus
        onChange={onSearchChange}
        placeholder={intl.formatMessage(messages.searchPlaceholder)}
        trailingElement={
            searchString
              ? (
                <IconButton
                  iconAs={Icon}
                  invertColors
                  isActive
                  onClick={clearSearchString}
                  size="sm"
                  src={Close}
                />
              )
              : <Icon src={Search} />
          }
        value={searchString}
      />
    </Form.Group>

    { !showSwitch && <ActionRow.Spacer /> }
    <SelectMenu variant="link">
      {Object.keys(sortKeys).map(key => (
        <MenuItem key={key} onClick={onSortClick(key)} defaultSelected={key === sortBy}>
          <FormattedMessage {...sortMessages[key]} />
        </MenuItem>
      ))}
    </SelectMenu>

    { filterKeys && filterMessages && (
    <SelectMenu variant="link">
      {Object.keys(filterKeys).map(key => (
        <MenuItem key={key} onClick={onFilterClick(key)} defaultSelected={key === filterBy}>
          <FormattedMessage {...filterMessages[key]} />
        </MenuItem>
      ))}
    </SelectMenu>
    )}

    { showSwitch && (
    <>
      <ActionRow.Spacer />
      <Form.SwitchSet
        name="switch"
        onChange={onSwitchClick}
        isInline
      >
        <Form.Switch className="text-gray-700" value="switch-value" floatLabelLeft>
          <FormattedMessage {...switchMessage} />
        </Form.Switch>
      </Form.SwitchSet>
    </>
    )}

  </ActionRow>
);

SearchSort.defaultProps = {
  filterBy: '',
  onFilterClick: null,
  filterKeys: null,
  filterMessages: null,
  showSwitch: false,
  onSwitchClick: null,
};

SearchSort.propTypes = {
  searchString: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  clearSearchString: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  onSortClick: PropTypes.func.isRequired,
  sortKeys: PropTypes.shape({}).isRequired,
  sortMessages: PropTypes.shape({}).isRequired,
  filterBy: PropTypes.string,
  onFilterClick: PropTypes.func,
  filterKeys: PropTypes.shape({}),
  filterMessages: PropTypes.shape({}),
  showSwitch: PropTypes.bool,
  switchMessage: PropTypes.shape({}).isRequired,
  onSwitchClick: PropTypes.func,
  // injected
  intl: intlShape.isRequired,
};

export default injectIntl(SearchSort);
