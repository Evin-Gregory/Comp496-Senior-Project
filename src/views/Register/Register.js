import React, { useState } from "react";
import { connect } from "react-redux";
import { registerAuthAction, clearErrorAction, mismatchErrorAction } from "redux/actions/authAction";
import { useHistory, Link, Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

import Email from "@material-ui/icons/Email";
import Face from "@material-ui/icons/Face";

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CardFooter from "components/Card/CardFooter";

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle";

const useStyles = makeStyles(styles);

function Register(props) {
  const classes = useStyles();
  
  const { isLoggedIn, register, clearError, mismatchError } = props;
  const [userState, setUserState] = useState({});
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const history = useHistory();

  React.useEffect(() => {
    clearError();
    let id = setTimeout(function () {
      setCardAnimation("");
    }, 700);

    // Specify how to clean up after this effect:
    return function cleanup() {
      window.clearTimeout(id);
    };
  }, [clearError]);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (userState.password !== userState.confirm_password) {
      mismatchError();
      return;
    }
    register(userState, history);
  }

  if (isLoggedIn) return <Redirect to="/dashboard" />;

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form
            onSubmit={handleSignUp}
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
                  formControlProps={{
                    fullWidth: true,
                    className: classes.customFormControlClasses
                  }}
                  inputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        className={classes.inputAdornment}
                      >
                        <Face className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                    placeholder: "Name...",
                    required: true
                  }}
                  onChange={(e) => {
                    const name = e.target.value;
                    setUserState({ ...userState, ...{ name } });
                  }}
                />

                <CustomInput
                  formControlProps={{
                    fullWidth: true,
                    className: classes.customFormControlClasses
                  }}
                  inputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        className={classes.inputAdornment}
                      >
                        <Email className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                    type: "email",
                    placeholder: "Email...",
                    required: true
                  }}
                  onChange={(e) => {
                    const email = e.target.value;
                    setUserState({ ...userState, ...{ email } });
                  }}
                />

                <CustomInput
                  formControlProps={{
                    fullWidth: true,
                    className: classes.customFormControlClasses
                  }}
                  inputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        className={classes.inputAdornment}
                      >
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    type: "password",
                    placeholder: "Password...",
                    required: true
                  }}
                  onChange={(e) => {
                    const password = e.target.value;
                    setUserState({ ...userState, ...{ password } });
                  }}
                />

                <CustomInput
                  formControlProps={{
                    fullWidth: true,
                    className: classes.customFormControlClasses
                  }}
                  inputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        className={classes.inputAdornment}
                      >
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    type: "password",
                    placeholder: "Confirm Password...",
                    required: true
                  }}
                  onChange={(e) => {
                    const confirm_password = e.target.value;
                    setUserState({ ...userState, ...{ confirm_password } });
                  }}
                />
              </CardBody>
              <CardFooter>
                <Button color="rose" round fullWidth simple size="lg" block component={Link} to="/auth/login">
                  Login
                </Button>
                <Button color="rose" round fullWidth size="lg" type="submit">
                  Sign up
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
});


const mapDispatchToProps = (dispatch) => {
  return {
    register: (userState, history) => {
      dispatch(registerAuthAction(userState, history));
    },
    clearError: () => {
      dispatch(clearErrorAction());
    },
    mismatchError: () => {
      dispatch(mismatchErrorAction());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
