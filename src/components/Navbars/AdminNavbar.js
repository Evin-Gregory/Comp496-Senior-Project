import React from "react";
import { useHistory } from "react-router-dom";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

// core components
import AdminNavbarLinks from "./AdminNavbarLinks";

import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarStyle.js";
import logo from "assets/img/logo.jpg"

const useStyles = makeStyles(styles);

export default function AdminNavbar(props) {
	const classes = useStyles();
	const { color, rtlActive } = props;
  const history = useHistory();
	
	const appBarClasses = cx({
		[" " + classes[color]]: color
	});

  
  const goHome = () => {
    history.push("/dashboard");
  }


	return (
		<AppBar className={classes.appBar + appBarClasses}>
			<Toolbar className={classes.container}>
				<div className={classes.flex}>
					{/* <Button href="/main" className={classes.title} color="transparent">
						{ brandText }
						
					</Button> */}
					<img src={ logo } alt="Logo" decoding="async" className={ classes.logo } onClick={()=>goHome()} />
				</div>
				<AdminNavbarLinks rtlActive={rtlActive} />
			</Toolbar>
		</AppBar>
	);
}

AdminNavbar.propTypes = {
	color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
	rtlActive: PropTypes.bool,
	brandText: PropTypes.string,
	miniActive: PropTypes.bool,
	handleDrawerToggle: PropTypes.func,
};
