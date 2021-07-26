import React from "react";
import { Route } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footer/Footer.js";


import styles from "assets/jss/material-dashboard-pro-react/layouts/authStyle.js";
import pricing from "assets/img/bg-pricing.jpeg";
import HomePage from "./Home";

const useStyles = makeStyles(styles);

export default function Pages(props) {
  // ref for the wrapper div
  const wrapper = React.createRef();
  // styles
  const classes = useStyles();
  React.useEffect(() => {
    document.body.style.overflow = "unset";
    // Specify how to clean up after this effect:
    return function cleanup() {};
  });
  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  
  
  return (
    <div>
      <AuthNavbar brandText="Check Your Head" />
      <div className={classes.wrapper} ref={wrapper}>
        <div
          className={classes.fullPage}
          style={{ backgroundImage: "url(" + pricing + ")" }}
        >
          <HomePage />
          <Footer white />
        </div>
      </div>
    </div>
  );
}
