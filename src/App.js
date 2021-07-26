import React, { useEffect } from "react";
import { Route, Switch, Redirect, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import AuthLayout from "layouts/Auth";
import MainLayout from "layouts/Main";
import { validateSession } from "./redux/actions/authAction";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import HomePage from "views/Home";

import "assets/scss/material-dashboard-pro-react.scss?v=1.9.0";

const mapDispatchToProps = { validateSession };

export default connect(
  null,
  mapDispatchToProps
)(function App(props) {

  const { validateSession } = props;
  
  useEffect(() => {

    validateSession();
  
  }, [validateSession]);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ HomePage } />
        <Route path="/auth" component={ AuthLayout } />
        <PrivateRoute path="/dashboard" component={ MainLayout } />
      </Switch>
    </Router>
  );
});
