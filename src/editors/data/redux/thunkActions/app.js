import { StrictDict, camelizeKeys } from '../../../utils';
import { actions } from '..';
import * as requests from './requests';
import * as module from './app';

export const fetchBlock = () => (dispatch) => {
  dispatch(requests.fetchBlock({
    onSuccess: (response) => dispatch(actions.app.setBlockValue(response)),
    // eslint-disable-next-line
    onFailure: (e) => console.log({ fetchFailure: e }),
  }));
};

export const fetchStudioView = () => (dispatch) => {
  dispatch(requests.fetchStudioView({
    onSuccess: (response) => dispatch(actions.app.setStudioView(response)),
    // eslint-disable-next-line
    onFailure: (e) => console.log({ fetchFailure: e }),
  }));
};

export const fetchUnit = () => (dispatch) => {
  dispatch(requests.fetchUnit({
    onSuccess: (response) => dispatch(actions.app.setUnitUrl(response)),
    onFailure: (e) => dispatch(actions.app.setUnitUrl(e)),
  }));
};

/**
 * @param {string} studioEndpointUrl
 * @param {string} blockId
 * @param {string} learningContextId
 * @param {string} blockType
 */
export const initialize = (data) => (dispatch) => {
  dispatch(actions.app.initialize(data));
  dispatch(module.fetchBlock());
  dispatch(module.fetchUnit());
  dispatch(module.fetchStudioView());
};

/**
 * @param {func} onSuccess
 */
export const saveBlock = ({ content, returnToUnit }) => (dispatch) => {
  dispatch(actions.app.setBlockContent(content));
  dispatch(requests.saveBlock({
    content,
    onSuccess: (response) => {
      dispatch(actions.app.setSaveResponse(response));
      returnToUnit();
    },
  }));
};

export const fetchImages = ({ setImages }) => (dispatch) => {
  dispatch(requests.fetchImages({ onSuccess: setImages }));
};

export const uploadImage = ({ file, setSelection }) => (dispatch) => {
  dispatch(requests.uploadImage({
    image: file,
    onSuccess: (response) => setSelection(camelizeKeys(response.data.asset)),
  }));
};

export const fetchVideos = ({ onSuccess }) => (dispatch) => {
  dispatch(requests.fetchImages({ onSuccess }));
  // onSuccess(mockData.mockVideoData);
};

export default StrictDict({
  fetchBlock,
  fetchUnit,
  initialize,
  saveBlock,
  fetchImages,
  uploadImage,
  fetchVideos,
  fetchStudioView,
});
