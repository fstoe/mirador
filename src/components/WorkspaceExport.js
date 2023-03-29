import { Component } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

/**
 */
export class WorkspaceExport extends Component {
  /** */
  constructor(props) {
    super(props);

    this.state = { copied: false };
    this.onCopy = this.onCopy.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /** Handle closing after the content is copied and the snackbar is done */
  handleClose() {
    const { handleClose } = this.props;

    handleClose();
  }

  /** Show the snackbar */
  onCopy() {
    this.setState({ copied: true });
  }

  /**
   * @private
   */
  exportedState() {
    const { exportableState } = this.props;

    return JSON.stringify(exportableState, null, 2);
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      children, classes, container, open, t,
    } = this.props;
    const { copied } = this.state;

    if (copied) {
      return (
        <Snackbar
          anchorOrigin={{
            horizontal: 'center',
            vertical: 'top',
          }}
          open
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={t('exportCopied')}
          action={(
            <IconButton size="small" aria-label={t('dismiss')} color="inherit" onClick={this.handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        />
      );
    }

    return (
      <Dialog
        id="workspace-export"
        container={container}
        open={open}
        onClose={this.handleClose}
        scroll="paper"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">
          <Typography variant="h2">{t('downloadExport')}</Typography>
        </DialogTitle>

        <DialogContent>
          <Accordion elevation={0}>
            <AccordionSummary
              classes={{ root: classes.accordionTitle }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant="h4">{t('viewWorkspaceConfiguration')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {children}
              <pre>
                {this.exportedState()}
              </pre>
            </AccordionDetails>
          </Accordion>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleClose}>{t('cancel')}</Button>
          <CopyToClipboard
            onCopy={this.onCopy}
            text={this.exportedState()}
          >
            <Button variant="contained" color="primary">{t('copy')}</Button>
          </CopyToClipboard>
        </DialogActions>
      </Dialog>
    );
  }
}

WorkspaceExport.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.objectOf(PropTypes.string),
  container: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  exportableState: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  t: PropTypes.func,
};

WorkspaceExport.defaultProps = {
  children: null,
  classes: {},
  container: null,
  open: false,
  t: key => key,
};
