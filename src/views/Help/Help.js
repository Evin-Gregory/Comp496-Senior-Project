import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js"
import CardBody from "components/Card/CardBody.js"
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CardText from "components/Card/CardText.js";
import Button from "components/CustomButtons/Button.js";

import Typography from '@material-ui/core/Typography';

import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

import calendar_page from "assets/img/calendar.png";
import current_date_page from "assets/img/current_date.png";

const useStyles = makeStyles(styles);

function Help() {
  const classes = useStyles();
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={8}>
        <Card>
          <CardHeader color="rose" text>
            <CardText color="rose">
              <h4 className={classes.cardTitle}>User Help</h4>
            </CardText>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12}>
                <Typography variant="body1" gutterBottom>
                  Hello User wheter this is your first time using Check Your Head or just plain old
                  forgot something then here is where you can learn
                </Typography>
                <img src={calendar_page} alt="Calendar Page" className={classes.cardImage} />
                <Typography variant="body1" gutterBottom>
                  Above is the main page the calendar where you can see the current month
                </Typography>
                <img src={current_date_page} alt="Calendar Page" className={classes.cardImage} />
                <Typography variant="body1" gutterBottom>
                  In the Day Page you have the option to choose between four colors to describe
                  your mood. Red being angry, blue being sad, yellow being happy and purple
                  being anxious/fearful. You the user are also asked to tell why you feel that
                  why in 25 characters or less so summarize how you fell by using kewords.
                  <br /><br />
                  After hitting submit the day's suggestion will pop up and after clicking (Will Do) it sends
                  you back to the Calendar
                  <br /><br />

                </Typography>
              </GridItem>
            </GridContainer>

          </CardBody>
          <CardFooter className={classes.justifyContentCenter}>
            <Button color="rose" component={Link} to="/dashboard/calendar">
              I Got It
            </Button>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  )
}

export default Help
