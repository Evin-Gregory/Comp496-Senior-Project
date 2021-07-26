import React from "react"
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "assets/jss/material-dashboard-pro-react/components/feelingButtonStyle.js";

const useStyles = makeStyles(styles);

function FeelingButton(props) {

  const { color, className, select, onClick } = props
  const classes = useStyles();

  const btnClasses = classNames({
    [classes.feelingButton]: true,
    [classes[color]]: color,
    [classes[select]]: select,
    [className]: className
  });

  return (
    <button className={btnClasses} onClick={() => onClick(color)}>

    </button>
  )
}

FeelingButton.propTypes = {
  color: PropTypes.oneOf(["red", "blue", "yellow", "purple"]),
  className: PropTypes.string,
  select: PropTypes.bool,
}

export default FeelingButton
