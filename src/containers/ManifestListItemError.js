import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import withStyles from '@mui/styles/withStyles';
import { withPlugins } from '../extend/withPlugins';
import { fetchManifest, removeResource } from '../state/actions';
import { ManifestListItemError } from '../components/ManifestListItemError';

/** */
const mapDispatchToProps = {
  onDismissClick: removeResource,
  onTryAgainClick: fetchManifest,
};

/**
 *
 * @param theme
 * @returns {{manifestIdText: {wordBreak: string},
 * errorIcon: {color: string, width: string, height: string}}}
 */
const styles = theme => ({
  errorIcon: {
    color: theme.palette.error.main,
    height: '2rem',
    width: '2rem',
  },
  manifestIdText: {
    wordBreak: 'break-all',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(null, mapDispatchToProps),
  withPlugins('ManifestListItemError'),
);

export default enhance(ManifestListItemError);
