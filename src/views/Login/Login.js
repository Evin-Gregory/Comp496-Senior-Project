import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { loginAuthAction, clearErrorAction } from "redux/actions/authAction";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Email from "@material-ui/icons/Email";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

const useStyles = makeStyles(styles);

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
});

const mapDispatchToProps = (dispatch) => {
  return {
    login: (userState, history) => {
      dispatch(loginAuthAction(userState, history));
    },
    clearError: () => {
      dispatch(clearErrorAction());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function Login({
  isLoggedIn,
  login,
  clearError
}) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [userState, setUserState] = useState({});
  const history = useHistory();

  React.useEffect(() => {

    clearError();
    let id = setTimeout(function() {
      setCardAnimation("");
    }, 700);

    // Specify how to clean up after this effect:
    return function cleanup() {
      window.clearTimeout(id);
    };
  }, [clearError]);

  const handleLogin = (e) => {
    e.preventDefault();
    login(userState, history);
  }

  const classes = useStyles();

  if (isLoggedIn) return <Redirect to="/dashboard" />;

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form
            onSubmit={handleLogin}
          >
            <Card login className={classes[cardAnimaton]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="rose"
              >
                <h4 className={classes.cardTitle}>Check Your Head</h4>
              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText="Email..."
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                    type: "email",
                    required: true
                  }}
                  onChange={(e) => {
                    const email = e.target.value;
                    setUserState({ ...userState, ...{ email } });
                  }}
                />
                <CustomInput
                  labelText="Password"
                  id="password"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    type: "password",
                    autoComplete: "off",
                    required: true
                  }}
                  onChange={(e) => {
                    const password = e.target.value;
                    setUserState({ ...userState, ...{ password } });
                  }}
                />
              </CardBody>
              <CardFooter className={classes.displayBlock}>
                <Button color="rose" round fullWidth size="lg" type="submit">
                  Login
                </Button>
                <Button color="rose" fullWidth round simple size="sm" block component={Link} to="/auth/register">
                  	New User? Click Here
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
});
