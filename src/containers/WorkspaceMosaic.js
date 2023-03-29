import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from '@mui/styles/withStyles';
import { withPlugins } from '../extend/withPlugins';
import { getWorkspace } from '../state/selectors';
import * as actions from '../state/actions';
import { WorkspaceMosaic } from '../components/WorkspaceMosaic';
import globalReactMosaicStyles from '../styles/react-mosaic-component';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => (
  {
    layout: getWorkspace(state).layout,
    windowIds: getWorkspace(state).windowIds,
    workspaceId: getWorkspace(state).id,
  }
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */
const mapDispatchToProps = { updateWorkspaceMosaicLayout: actions.updateWorkspaceMosaicLayout };

const styles = {
  root: {
    '& .mosaic-preview': {
      boxShadow: 'none',
    },
    '& .mosaic-tile': {
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .2), 0 2px 1px -1px rgba(0, 0, 0, .2)',
    },
    '& .mosaic-window': {
      boxShadow: 'none',
    },
    '& .mosaic-window-toolbar': {
      display: 'none !important',
    },
  },
  ...globalReactMosaicStyles,
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WorkspaceMosaic'),
  // further HOC go here
);

export default enhance(WorkspaceMosaic);
