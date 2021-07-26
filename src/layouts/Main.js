import React from "react";
import cx from "classnames";
import { Switch, Route, Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import {
  Calendar,
  Help,
  CurrentDate,
  Visual
} from "views"

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer.js";

import styles from "assets/jss/material-dashboard-pro-react/layouts/adminStyle.js";

var ps;

const useStyles = makeStyles(styles);

export default function Main(props) {
  const { ...rest } = props;

  // styles
  const classes = useStyles();
  const mainPanelClasses =
    classes.mainPanel +
    " " +
    cx({
      [classes.mainPanelSidebarMini]: false,
      [classes.mainPanelWithPerfectScrollbar]:
        navigator.platform.indexOf("Win") > -1
    });

  // ref for main panel div
  const mainPanel = React.createRef();

  // effect instead of componentDidMount, componentDidUpdate and componentWillUnmount
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });


  return (
    <div className={classes.wrapper}>
      <div className={mainPanelClasses} ref={mainPanel}>
        <AdminNavbar
          miniActive={false}
          brandText="Check Your Head"
          {...rest}
        />

        <div className={classes.content}>
          <div className={classes.container}>
            <Switch>
              <Route path="/dashboard/calendar" exact component={ Calendar } />
              <Route path="/dashboard/help" exact component={Help} />
              <Route path="/dashboard/current-date/:date" exact component={CurrentDate} />
              <Route path="/dashboard/visual" exact component={Visual} />
              <Redirect from="/dashboard" exact to="/dashboard/calendar" />
            </Switch>
          </div>
        </div>

        <Footer fluid />
      </div>
    </div>
  );
}
