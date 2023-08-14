import React from 'react';
import { useSelector } from 'react-redux';
import * as module from './hooks';
import messages from './messages';
import * as appHooks from '../../hooks';
import { selectors } from '../../data/redux';
import analyticsEvt from '../../data/constants/analyticsEvt';
import {
  filterKeys,
  filterMessages,
  sortKeys,
  sortMessages,
  sortFunctions,
} from './utils';

export const {
  navigateCallback,
  navigateTo,
} = appHooks;

export const useSearchAndSortProps = () => {
  // const [searchString, setSearchString] = React.useState('');
  // const [sortBy, setSortBy] = React.useState(sortKeys.dateNewest);
  // const [filterBy, setFilterBy] = React.useState([]);
  const [hideSelectedVideos, setHideSelectedVideos] = React.useState(false);

  return {
    // searchString,
    // onSearchChange: (e) => setSearchString(e.target.value),
    // clearSearchString: () => setSearchString(''),
    // sortBy,
    // onSortClick: (key) => () => setSortBy(key),
    sortKeys,
    sortMessages,
    // filterBy,
    // onFilterClick: (keys) => setFilterBy(keys),
    filterKeys,
    filterMessages,
    showSwitch: false,
    hideSelectedVideos,
    switchMessage: messages.hideSelectedCourseVideosSwitchLabel,
    onSwitchClick: () => setHideSelectedVideos(!hideSelectedVideos),
  };
};

export const filterListBySearch = ({ searchString, videoList }) => (
  videoList.filter(({ displayName }) => displayName.toLowerCase().includes(searchString.toLowerCase()))
);

export const filterListByStatus = ({ statusFilter, videoList }) => {
  if (statusFilter.length < 1) {
    return videoList;
  }
  return videoList.filter(
    ({ status }) => statusFilter.map(key => filterKeys[key]).includes(status)
  );
};

export const filterListByHideSelectedCourse = ({ videoList }) => (
  // TODO Missing to implement this
  videoList
);

export const filterList = ({
  sortBy,
  filterBy,
  searchString,
  videos,
}) => {
  let filteredList = module.filterListBySearch({
    searchString,
    videoList: videos,
  });
  filteredList = module.filterListByStatus({
    statusFilter: filterBy,
    videoList: filteredList,
  });
  filteredList = module.filterListByHideSelectedCourse({
    videoList: filteredList,
  });
  return filteredList.sort(sortFunctions[sortBy in sortKeys ? sortKeys[sortBy] : sortKeys.dateNewest]);
};

export const useVideoListProps = ({ searchSortProps, videos }) => {
  const [highlighted, setHighlighted] = React.useState(null);
  const [
    showSelectVideoError,
    setShowSelectVideoError,
  ] = React.useState(false);
  const [
    showSizeError,
    setShowSizeError,
  ] = React.useState(false);
  // const filteredList = module.filterList({ ...searchSortProps, videos });
  const learningContextId = useSelector(selectors.app.learningContextId);
  const blockId = useSelector(selectors.app.blockId);
  return {
    galleryError: {
      show: showSelectVideoError,
      set: () => setShowSelectVideoError(true),
      dismiss: () => setShowSelectVideoError(false),
      message: messages.selectVideoError,
    },
    // TODO We need to update this message when implementing the video upload screen
    inputError: {
      show: showSizeError,
      set: () => setShowSizeError(true),
      dismiss: () => setShowSelectVideoError(false),
      message: messages.fileSizeError,
    },
    galleryProps: {
      // galleryIsEmpty: Object.keys(filteredList).length === 0,
      // searchIsEmpty: filteredList.length === 0,
      // displayList: filteredList,
      highlighted,
      onHighlightChange: (e) => setHighlighted(e.target.value),
      emptyGalleryLabel: messages.emptyGalleryLabel,
      showIdsOnCards: true,
      height: '100%',
    },
    selectBtnProps: {
      onClick: () => {
        if (highlighted) {
          navigateTo(`/course/${learningContextId}/editor/video/${blockId}?selectedVideoId=${highlighted}`);
        } else {
          setShowSelectVideoError(true);
        }
      },
    },
  };
};

export const useVideoUploadHandler = () => {
  const learningContextId = useSelector(selectors.app.learningContextId);
  const blockId = useSelector(selectors.app.blockId);
  return () => navigateTo(`/course/${learningContextId}/editor/video_upload/${blockId}`);
};

export const useCancelHandler = () => (
  navigateCallback({
    destination: useSelector(selectors.app.returnUrl),
    analytics: useSelector(selectors.app.analytics),
    analyticsEvent: analyticsEvt.videoGalleryCancelClick,
  })
);

export const useVideoProps = ({ videos }) => {
  const searchSortProps = useSearchAndSortProps();
  const videoList = useVideoListProps({ searchSortProps, videos });
  const {
    galleryError,
    galleryProps,
    inputError,
    selectBtnProps,
  } = videoList;
  const fileInput = { click: useVideoUploadHandler() };

  return {
    galleryError,
    inputError,
    fileInput,
    galleryProps,
    searchSortProps,
    selectBtnProps,
  };
};

export default {
  useVideoProps,
  useCancelHandler,
  useVideoUploadHandler,
};
