import React from "react";
import { connect } from "react-redux";
import { Route, useHistory } from "react-router-dom";

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
});


export default connect(
  mapStateToProps,
  null
)(function PrivateRoute({
  isLoggedIn,
  ...props
}) {

  const history = useHistory();

  if (!isLoggedIn) {
    history.push("/auth/login");
    return false;
  }

  return <Route {...props} />
});