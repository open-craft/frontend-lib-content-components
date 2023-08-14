import { useIntl } from '@edx/frontend-platform/i18n';
import { Dropdown, Form } from '@edx/paragon';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function MultiSelectFilterDropdown({
  title, filterOptions, messages, selected, onSelectionChange
}) {
  const intl = useIntl();
  const filterBy = useSelector(selectors.app.videoFilterBy);
  const dispatch = useDispatch();
  return (
    <Dropdown autoClose={false}>
      <Dropdown.Toggle variant="outline">{title}</Dropdown.Toggle>
      <Dropdown.Menu renderOnMount className="p-2">
        {filterOptions.map(key => (
          <Dropdown.Item
            key={key}
            as={Form.Checkbox}
            checked={!!filterBy[key]}
            onChange={() => dispatch(actions.app.toggleVideoFilter(key))}
          >
            <span className="p-1">{intl.formatMessage(messages[key])}</span>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MultiSelectFilterDropdown;
