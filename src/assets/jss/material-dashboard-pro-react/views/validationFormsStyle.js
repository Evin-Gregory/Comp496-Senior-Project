import {
  cardTitle,
  dangerColor,
  whiteColor,
  grayColor
} from "assets/jss/material-dashboard-pro-react";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch";
import buttonStyle from "assets/jss/material-dashboard-pro-react/components/buttonStyle";

const validationFormsStyle = theme => ({
  ...customCheckboxRadioSwitch,
  cardTitle: {
    ...cardTitle,
    color: whiteColor
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  formCategory: {
    marginBottom: "0",
    color: grayColor[0],
    fontSize: "14px",
    padding: "10px 0 10px"
  },
  center: {
    textAlign: "center"
  },
  justifyContentCenter: {
    justifyContent: "center"
  },
  registerButton: {
    float: "right"
  },
  danger: {
    color: dangerColor[0] + "!important"
  },
  cardImage: {
    width: "70%",
    margin: "40px auto 30px",
    display: "flex",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      margin: "20px auto 20px",
    }
  },
  feelingButtonsWrapper: {
    display: "flex",
    justifyContent: "space-around",
    padding: "30px 0",
    width: "70%",
    margin: "0 auto",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      margin: "0",
    }
  },
  feelingButton: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    cursor: "pointer"
  },
  red: {
      backgroundColor: "#e91e63"
  },
  blue: {
      backgroundColor: "#1976d2"
  },
  yellow: {
      backgroundColor: "#ff9800"
  },
  purple: {
      backgroundColor: "#9c27b0"
  },
  select: {
      border: "3px solid white"
  },
  marginTop: {
    marginTop: "30px"
  },
  textCenter: {
    textAlign: "center"
  },
  ...buttonStyle
});

export default validationFormsStyle;
