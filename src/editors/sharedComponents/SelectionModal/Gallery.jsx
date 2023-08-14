import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { Scrollable, SelectableBox, Spinner, } from '@edx/paragon';
import { FormattedMessage, useIntl, } from '@edx/frontend-platform/i18n';

import { RequestKeys } from '../../../editors/data/constants/requests';
import { selectors } from '../../../editors/data/redux';
import GalleryCard from './GalleryCard';
import messages from './messages';

export const Gallery = ({
  galleryIsEmpty,
  searchIsEmpty,
  highlighted,
  onHighlightChange,
  emptyGalleryLabel,
  showIdsOnCards,
  height,
}) => {
  const intl = useIntl();
  const isLoaded = useSelector(
    (state) => selectors.requests.isFinished(state, { requestKey: RequestKeys.fetchVideos }),
  );
  const displayList = useSelector(selectors.app.sortedFilteredVideos);
  if (!isLoaded) {
    return (
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      >
        <Spinner
          animation="border"
          className="mie-3"
          screenReaderText={intl.formatMessage(messages.loading)}
        />
      </div>
    );
  }
  if (galleryIsEmpty) {
    return (
      <div className="gallery p-4 bg-light-400" style={{ height, margin: '0 -1.5rem' }}>
        <FormattedMessage {...emptyGalleryLabel} />
      </div>
    );
  }
  if (searchIsEmpty) {
    return (
      <div className="gallery p-4 bg-light-400" style={{ height, margin: '0 -1.5rem' }}>
        <FormattedMessage {...messages.emptySearchLabel} />
      </div>
    );
  }
  return (
    <Scrollable className="gallery bg-light-400" style={{ height, margin: '0 -1.5rem' }}>
      <div className="p-4">
        <SelectableBox.Set
          columns={1}
          name="images"
          onChange={onHighlightChange}
          type="radio"
          value={highlighted}
        >
          {displayList.map(asset => <GalleryCard key={asset.id} asset={asset} showId={showIdsOnCards} />)}
        </SelectableBox.Set>
      </div>
    </Scrollable>
  );
};

Gallery.defaultProps = {
  highlighted: '',
  showIdsOnCards: false,
  height: '375px',
  show: true,
};
Gallery.propTypes = {
  galleryIsEmpty: PropTypes.bool.isRequired,
  searchIsEmpty: PropTypes.bool.isRequired,
  displayList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  highlighted: PropTypes.string,
  onHighlightChange: PropTypes.func.isRequired,
  emptyGalleryLabel: PropTypes.shape({}).isRequired,
  showIdsOnCards: PropTypes.bool,
  height: PropTypes.string,
};

export default Gallery;
