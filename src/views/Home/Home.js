import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-pro-react/views/pricingPageStyle.js";

const useStyles = makeStyles(styles);

export default function HomePage() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
          <h2 className={classes.title}>Welcome to Check Your Head!</h2>
          {/* <h5 className={classes.description}>
            You have Free Unlimited Updates and Premium Support on each package.
          </h5> */}
        </GridItem>
      </GridContainer>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card pricing plain>
            <CardBody pricing plain>
              {/* <h6 className={classes.cardCategory}>Freelancer</h6> */}
              {/* <div className={classes.icon}>
                <Icon className={classes.iconWhite}>weekend</Icon>
              </div>
             
              <p className={classes.cardCategory}>
                This is good if your company size is between 2 and 10 Persons.
              </p> */}

              
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
