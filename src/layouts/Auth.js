import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import ErrorHandler from "components/Error/ErrorHandler";
import { makeStyles } from "@material-ui/core/styles";

import { Login, Register } from "views";

import styles from "assets/jss/material-dashboard-pro-react/layouts/authStyle";
import login from "assets/img/login.jpeg";

const useStyles = makeStyles(styles);


const mapStateToProps = state => ({
  error: state.error
});

export default connect(
  mapStateToProps,
  null
)(function Pages({ error }) {

  // const [show, setShow] = useState(false);

  const wrapper = React.createRef();
  const classes = useStyles();
  
  React.useEffect(() => {
    document.body.style.overflow = "unset";
    return function cleanup() {};
  });

  const getBgImage = () => {
    return login;
  };

  return (
    <div>
      <ErrorHandler error={error} />
      
      <div className={ classes.wrapper } ref={ wrapper }>
        <div
          className={ classes.fullPage }
          style={{ backgroundImage: "url(" + getBgImage() + ")" }}
        >
          <Switch>
              <Route path="/auth/login" exact component={ Login } />
              <Route path="/auth/register" exact component={ Register } />
              {/* <Redirect from="/auth" to="/auth/login" /> */}
          </Switch>
        </div>
      </div>
    </div>
  );
});
