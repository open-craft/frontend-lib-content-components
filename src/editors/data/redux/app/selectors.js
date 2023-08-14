import { createSelector } from 'reselect';
import { filterKeys, sortFunctions, sortKeys } from '../../../containers/VideoGallery/utils';
import { blockTypes } from '../../constants/app';
import * as urls from '../../services/cms/urls';
import * as module from './selectors';

export const appSelector = (state) => state.app;

const mkSimpleSelector = (cb) => createSelector([module.appSelector], cb);

// top-level app data selectors
export const simpleSelectors = {
  blockContent: mkSimpleSelector(app => app.blockContent),
  blockId: mkSimpleSelector(app => app.blockId),
  blockType: mkSimpleSelector(app => app.blockType),
  blockValue: mkSimpleSelector(app => app.blockValue),
  studioView: mkSimpleSelector(app => app.studioView),
  learningContextId: mkSimpleSelector(app => app.learningContextId),
  editorInitialized: mkSimpleSelector(app => app.editorInitialized),
  saveResponse: mkSimpleSelector(app => app.saveResponse),
  lmsEndpointUrl: mkSimpleSelector(app => app.lmsEndpointUrl),
  studioEndpointUrl: mkSimpleSelector(app => app.studioEndpointUrl),
  unitUrl: mkSimpleSelector(app => app.unitUrl),
  blockTitle: mkSimpleSelector(app => app.blockTitle),
  assets: mkSimpleSelector(app => app.assets),
  videos: mkSimpleSelector(app => app.videos),
  videoSearchQuery: mkSimpleSelector(app => app.videoSearchQuery),
  videoSortBy: mkSimpleSelector(app => app.videoSortBy),
  videoFilterBy: mkSimpleSelector(app => app.videoFilterBy),
};

export const returnUrl = createSelector(
  [module.simpleSelectors.unitUrl, module.simpleSelectors.studioEndpointUrl, module.simpleSelectors.learningContextId],
  (unitUrl, studioEndpointUrl, learningContextId) => (
    urls.returnUrl({
      studioEndpointUrl,
      unitUrl,
      learningContextId
    })
  ),
);

export const isInitialized = createSelector(
  [
    module.simpleSelectors.unitUrl,
    module.simpleSelectors.blockValue,
  ],
  (unitUrl, blockValue) => !!(unitUrl && blockValue),
);

export const displayTitle = createSelector(
  [
    module.simpleSelectors.blockType,
    module.simpleSelectors.blockTitle,
  ],
  (blockType, blockTitle) => {
    if (blockType === null) {
      return null;
    }
    if (blockTitle !== null) {
      return blockTitle;
    }
    return (blockType === blockTypes.html)
      ? 'Text'
      : blockType[0].toUpperCase() + blockType.substring(1);
  },
);

export const analytics = createSelector(
  [
    module.simpleSelectors.blockId,
    module.simpleSelectors.blockType,
    module.simpleSelectors.learningContextId,
  ],
  (blockId, blockType, learningContextId) => (
    {
      blockId,
      blockType,
      learningContextId
    }
  ),
);

export const isRaw = createSelector(
  [module.simpleSelectors.studioView],
  (studioView) => {
    if (!studioView || !studioView.data || !studioView.data.html) {
      return null;
    }
    if (studioView.data.html.includes('data-editor="raw"')) {
      return true;
    }
    return false;
  },
);

export const isLibrary = createSelector(
  [module.simpleSelectors.learningContextId],
  (learningContextId) => {
    if (!learningContextId) {
      return null;
    }
    if (learningContextId && learningContextId.startsWith('library-v1')) {
      return true;
    }
    return false;
  },
);

const filteredVideos = createSelector(
  [simpleSelectors.videos, simpleSelectors.videoSearchQuery, simpleSelectors.videoFilterBy],
  (allVideos, query, filters) => allVideos.filter(({
      displayName,
      status
    }) => {
      const filtersList = Object.keys(filters);
      // If not filters are selected, return all, otherwise only return videos that match the selected filters
      return (filtersList.length === 0 || filtersList.map(key => filterKeys[key])
          .includes(status))
        && displayName.toLowerCase()
          .includes(query.toLowerCase());
    }
  )
);
export const sortedFilteredVideos = createSelector(
  [filteredVideos, simpleSelectors.videoSortBy],
  (videos, sortBy) => {
    console.log({
      videos,
      sortBy
    });
    return videos.sort(sortFunctions[sortBy in sortKeys ? sortKeys[sortBy] : sortKeys.dateNewest]);
  }
);

export default {
  ...simpleSelectors,
  isInitialized,
  returnUrl,
  displayTitle,
  analytics,
  isRaw,
  isLibrary,
  sortedFilteredVideos,
};
