import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import withStyles from '@mui/styles/withStyles';
import { withPlugins } from '../extend/withPlugins';
import { WorkspaceControlPanel } from '../components/WorkspaceControlPanel';

/**
 *
 * @param theme
 * @returns {{ctrlBtn: {margin: (number|string)},
 * drawer: {overflowX: string, height: string}}}
 */
const styles = theme => ({
  branding: {
    display: 'flex',
    position: 'absolute',
    [theme.breakpoints.up('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      bottom: 0,
      display: 'block',
      float: 'none',
      right: 'auto',
      width: '100%',
    },
    right: 0,
  },
  ctrlBtn: {
    margin: theme.spacing(1),
  },
  drawer: {
    overflowX: 'hidden',
  },
  root: {
    height: 64,
    [theme.breakpoints.up('sm')]: {
      height: '100%',
      left: 0,
      right: 'auto',
      width: 64,
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      minHeight: 0,
    },
  },
  wide: {
    width: 'auto',
  },
  workspaceButtons: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  withPlugins('WorkspaceControlPanel'),
  // further HOC go here
);

export default enhance(WorkspaceControlPanel);
