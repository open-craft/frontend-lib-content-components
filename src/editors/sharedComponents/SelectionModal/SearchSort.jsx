import React from 'react';
import PropTypes from 'prop-types';

import {
  ActionRow, Form, Icon, IconButton, SelectMenu, MenuItem,
} from '@edx/paragon';
import { Close, Search } from '@edx/paragon/icons';
import {
  FormattedMessage,
  useIntl,
} from '@edx/frontend-platform/i18n';
import { useDispatch, useSelector } from 'react-redux';

import MultiSelectFilterDropdown from './MultiSelectFilterDropdown';
import messages from './messages';

export const SearchSort = ({
  clearSearchString,
  sortKeys,
  sortMessages,
  filterKeys,
  filterMessages,
  showSwitch,
  switchMessage,
  onSwitchClick,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const sortBy = useSelector(selectors.app.videoSortBy);
  const searchString = useSelector(selectors.app.videoSearchQuery);
  console.log({sortBy});
  return (
    <ActionRow>
      <Form.Group style={{ margin: 0 }}>
        <Form.Control
          autoFocus
          onChange={({target}) => dispatch(actions.app.setVideoSearchBy(target.value))}
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
      <SelectMenu variant="outline">
        {Object.keys(sortKeys).map(key => (
          <MenuItem
            key={key}
            onClick={() => dispatch(actions.app.setVideoSortBy(key))}
            defaultSelected={key === sortBy}
          >
            <FormattedMessage {...sortMessages[key]} />
          </MenuItem>
        ))}
      </SelectMenu>

      { filterKeys && filterMessages && (
        <MultiSelectFilterDropdown
          title={intl.formatMessage(filterMessages['title'])}
          messages={filterMessages}
          filterOptions={Object.keys(filterKeys)}
        />
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
};

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
};

export default SearchSort;
