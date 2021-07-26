import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import { logOutAuthAction } from "redux/actions/authAction";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"

// @material-ui/icons
import Notifications from "@material-ui/icons/Notifications"
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

// core components
import Button from "components/CustomButtons/Button"

import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle.js"

const useStyles = makeStyles(styles);

const mapDispatchToProps = { logOutAuthAction };

export default connect(
  null,
  mapDispatchToProps
)(function HeaderLinks(props) {

	const [openNotification, setOpenNotification] = React.useState(null);

  const { rtlActive, logOutAuthAction: logout } = props;
	
  const handleClickNotification = event => {
		if (openNotification && openNotification.contains(event.target)) {
		setOpenNotification(null);
		} else {
		setOpenNotification(event.currentTarget);
		}
	};

  const handleLogout = () => {
    logout();
  }

	const classes = useStyles();

	const wrapper = classNames({
		[classes.wrapperRTL]: rtlActive
	});

	const managerClasses = classNames({
		[classes.managerClasses]: true
	});

	return (
		<div className={wrapper}>
		
			<div className={managerClasses}>
				<Button
					color="transparent"
					justIcon
					aria-label="Notifications"
					// aria-owns={openNotification ? "notification-menu-list" : null}
					aria-haspopup="true"
					onClick={handleClickNotification}
					className={classes.buttonLinkRTL}
					muiClasses={{
						label: classes.labelRTL
					}}
				>
					<Notifications
						className={
						classes.headerLinksSvg +
						" " +
						classes.links
						}
					/>
					<span className={classes.notifications}>5</span>
				</Button>
			</div>

			<div className={ managerClasses }>
				<Button
					color="transparent"
					aria-label="Person"
					justIcon
					aria-haspopup="true"
					className={ classes.buttonLinkRTL }
					muiClasses={{
						label: classes.labelRTL
					}}
					onClick={handleLogout}
				>
					<ExitToAppIcon
						className={
							classes.headerLinksSvg +
							" " +
							classes.links + " " + classes.linksRTL
						}
					/>
				</Button>
			</div>
		</div>
	);
});

// HeaderLinks.propTypes = {
//   rtlActive: PropTypes.bool,
//   logOutAuthAction: PropTypes.func
// };
