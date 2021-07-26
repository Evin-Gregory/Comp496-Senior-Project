import React from 'react';
import { connect } from "react-redux";
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { clearErrorAction } from 'redux/actions/authAction';

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/layouts/authStyle";

const useStyles = makeStyles(styles);

const mapDispatchToProps = (dispatch) => {
  return {
    clearError: () => {
      dispatch(clearErrorAction());
    }
  }
}
export default connect(
  null,
  mapDispatchToProps
)(function ErrorHandler({
  error,
  clearError
}) {
  const classes = useStyles();

  return (
    <>
    {error ? (
      <div className={classes.errorAlert}>
        <Alert severity='error'>
          {error}
        </Alert>
        <IconButton className={classes.closeButton} onClick={clearError}>
          <CloseIcon />
        </IconButton>
      </div>
    ) : ("")}
    </>
  )
});
