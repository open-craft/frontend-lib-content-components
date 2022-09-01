import React from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Spinner } from '@edx/paragon';
import { FormattedMessage, injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import SelectTypeModal from './components/SelectTypeModal';
import EditProblemView from './components/EditProblemView';
import { selectors } from '../../data/redux';
import { RequestKeys } from '../../data/constants/requests';
import { thunkActions } from '../../data/redux';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
export const hooks = {
  initializeProblemEditor: ({dispatch,blockFinished,studioViewFinished}) => React.useEffect(
    () => {dispatch(thunkActions.problem.initialize)},
    [blockFinished,studioViewFinished],
  ),
};



export const ProblemEditor = ({
  onClose,
  // Redux
  problemType,
  blockFinished,
  studioViewFinished,
}) => {

  const dispatch = useDispatch();
  hooks.initializeProblemEditor({dispatch,blockFinished,studioViewFinished})

  // TODO: INTL MSG, Add LOAD FAILED ERROR using BLOCKFAILED
  if (!blockFinished || !studioViewFinished ) {
    return (
      <div className="text-center p-6">
        <Spinner
          animation="border"
          className="m-3"
          screenreadertext="Loading Problem Editor"
        />
      </div>
    );
  }
  //once data is loaded, init store

  if (problemType === null) {
    return (<SelectTypeModal onClose={onClose} />);
  }
  return (<EditProblemView onClose={onClose} />);
};

ProblemEditor.propTypes = {
  onClose: PropTypes.func.isRequired,
  // redux
  blockFinished: PropTypes.bool.isRequired,
  studioViewFinished: PropTypes.bool.isRequired,
  problemType: PropTypes.string.isRequired,
};

export const mapStateToProps = (state) => ({
  blockFinished: selectors.requests.isFinished(state, { requestKey: RequestKeys.fetchBlock }),
  studioViewFinished: selectors.requests.isFinished(state, { requestKey: RequestKeys.fetchStudioView }),
  problemType: selectors.problem.problemType(state),
});

export const mapDispatchToProps = {};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ProblemEditor));