import React, { useReducer, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import MoodService from "services/moodService";

import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import SweetAlert from "react-bootstrap-sweetalert";

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card"
import CardBody from "components/Card/CardBody"
import CardHeader from "components/Card/CardHeader";
import CardFooter from "components/Card/CardFooter";
import CardText from "components/Card/CardText";
import Button from "components/CustomButtons/Button";
import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';

import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle";

const useStyles = makeStyles(styles);

const initialState = {
  feeling: "",
  description: ""
};

function reducer(state=initialState, action) {
  switch (action.type) {
    case "SET_MOOD":
      return {
        ...state,
        ...action.payload
      };
    
    default:
      return state;
  }
}

function CurrentDate() {

  const [alert, setAlert] = React.useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  let { date } = useParams();

  useEffect(() => {
    MoodService.fetchMood(date)
      .then(mood => {
        if (mood) {
          dispatch({ type: "SET_MOOD", payload: mood });
        }
      });
  }, [date]);

  const basicAlert = async () => {
    if (state.feeling === "" || state.feeling === null) {
      setAlert(
        <SweetAlert
          style={{ display: "block", marginTop: "-100px" }}
          title="Select your feeling"
          onConfirm={() => hideAlert()}
          confirmBtnCssClass={classes.button + " " + classes.warning}
          confirmBtnText="OK"
        >
          {() => (
            <>
              <p>Please select your feeling by clicking one of colored circles.</p>
            </>
          )}
        </SweetAlert>
      )
      return;
    }
    else if (state.description === "" || state.description === null) {
      setAlert(
        <SweetAlert
          style={{ display: "block", marginTop: "-100px" }}
          title="Give your reason"
          onConfirm={() => hideAlert()}
          confirmBtnCssClass={classes.button + " " + classes.warning}
          confirmBtnText="OK"
        >
          {() => (
            <>
              <p>Please input the reason why you feel this way.</p>
            </>
          )}
        </SweetAlert>
      )
      return;
    }


    const res = await MoodService.dayRecommendation({
      ...state
    });

    const { id: recommend_id, recommendation } = res;

    setAlert(
      <SweetAlert
        style={{ display: "block", marginTop: "-100px" }}
        title="Today's Suggestion"
        onConfirm={() => handleConfirm(recommend_id)}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
        confirmBtnText="Will &nbsp;Do"
      >
        {() => (
          <>
            <p>{recommendation}</p>
          </>
        )}
      </SweetAlert>
    );
  };

  const hideAlert = () => {
    setAlert(null);
  };

  const handleConfirm = (recommend_id) => {
    setAlert(null)

    MoodService.setMood({
      ...state,
      ...{ date },
      ...{ recommend_id }
    }).then(res => history.push("/dashboard/visual"));

    // window.location = "/dashboard/visual"
  }

  const classes = useStyles();
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={8}>
        {alert}
        <Card>
          <CardHeader color="rose" text>
            <CardText color="rose">
              <h4 className={classes.cardTitle}>{date}</h4>
            </CardText>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12}>
                <Typography variant="body1" gutterBottom className={classes.marginTop}>
                  How are you feeling today?
                </Typography>
                <GridContainer className={classes.feelingButtonsWrapper}>
                  <GridItem xs={3}>
                    <div className={classes.textCenter}>
                      <button
                        className={classNames(classes.feelingButton, classes.red)}
                        style={{ border: state.feeling === "red" ? "4px solid white" : "" }}
                        onClick={() => dispatch({ type: "SET_MOOD", payload: { feeling: "red" } })} />
                    </div>
                    <Typography variant="body1" gutterBottom className={classes.textCenter}>
                      Angry
                    </Typography>
                  </GridItem>
                  <GridItem xs={3}>
                    <div className={classes.textCenter}>
                      <button
                        className={classNames(classes.feelingButton, classes.blue)}
                        style={{ border: state.feeling === "blue" ? "4px solid white" : "" }}
                        onClick={() => dispatch({ type: "SET_MOOD", payload: { feeling: "blue" } })} />
                    </div>
                    <Typography variant="body1" gutterBottom className={classes.textCenter}>
                      Sad
                    </Typography>
                  </GridItem>
                  <GridItem xs={3}>
                    <div className={classes.textCenter}>
                      <button
                        className={classNames(classes.feelingButton, classes.yellow)}
                        style={{ border: state.feeling === "yellow" ? "4px solid white" : "" }}
                        onClick={() => dispatch({ type: "SET_MOOD", payload: { feeling: "yellow" } })} />
                    </div>
                    <Typography variant="body1" gutterBottom className={classes.textCenter}>
                      Happy
                    </Typography>
                  </GridItem>
                  <GridItem xs={3}>
                    <div className={classes.textCenter}>
                      <button
                        className={classNames(classes.feelingButton, classes.purple)}
                        style={{ border: state.feeling === "purple" ? "4px solid white" : "" }}
                        onClick={() => dispatch({ type: "SET_MOOD", payload: { feeling: "purple" } })} />
                    </div>
                    <Typography variant="body1" gutterBottom className={classes.textCenter}>
                      Anxious/Fearful
                    </Typography>
                  </GridItem>
                </GridContainer>

                <Typography variant="body1" gutterBottom className={classes.marginTop}>
                  Why do you feel this way?
                </Typography>

                <TextField
                  id="calendar"
                  multiline
                  rows={2}
                  variant="outlined"
                  fullWidth
                  className={classes.marginTop}
                  value={state.description}
                  onChange={(e) => dispatch({ type: "SET_MOOD", payload: { description: e.target.value }})}
                />
              </GridItem>
            </GridContainer>

          </CardBody>
          <CardFooter className={classes.justifyContentCenter}>
            <Button color="rose" onClick={basicAlert}>
              Submit
            </Button>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  )
}

export default CurrentDate
