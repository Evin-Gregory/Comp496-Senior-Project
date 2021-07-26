import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js"
import CardBody from "components/Card/CardBody.js"
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import CardText from "components/Card/CardText.js";
import Wizard from "components/Wizard/Wizard";

import DayStep from "./VisualSteps/DayStep"
import WeekStep from "./VisualSteps/WeekStep"
import MonthStep from "./VisualSteps/MonthStep"

import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

const useStyles = makeStyles(styles);

function Visual() {

  const classes = useStyles();

  return (
    <>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8}>
          <Card>
            <CardHeader color="rose" text>
              <CardText color="rose">
                <h4 className={classes.cardTitle}>Visualization</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <Wizard
                validate
                steps={[
                  { stepName: "Day", stepComponent: DayStep, stepId: "day" },
                  { stepName: "Week", stepComponent: WeekStep, stepId: "week" },
                  { stepName: "Month", stepComponent: MonthStep, stepId: "month" }
                ]}
                title="Check Your Head"
                subtitle=""
              />
            </CardBody>
            <CardFooter className={classes.justifyContentCenter}>
              <Button color="rose" fullWidth round simple size="lg" block component={Link} to="/dashboard">
                Go to Calendar
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  )
}

export default Visual
