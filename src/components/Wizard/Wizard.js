import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.js";

import wizardStyle from "assets/jss/material-dashboard-pro-react/components/wizardStyle.js";

class Wizard extends React.Component {
	constructor(props) {
		super(props);
		var width;
		if (this.props.steps.length === 1) {
			width = "100%";
		} else {
			if (window.innerWidth < 600) {
				if (this.props.steps.length !== 3) {
					width = "50%";
				} else {
					width = 100 / 3 + "%";
				}
			} else {
				if (this.props.steps.length === 2) {
					width = "50%";
				} else {
					width = 100 / 3 + "%";
				}
			}
		}
		this.state = {
			currentStep: 0,
			color: this.props.color,
			width: width,
			movingTabStyle: {
				transition: "transform 0s"
			},
			allStates: {}
		};
		this.navigationStepChange = this.navigationStepChange.bind(this);
		this.refreshAnimation = this.refreshAnimation.bind(this);
		this.updateWidth = this.updateWidth.bind(this);
  	}

  	wizard = React.createRef();

	componentDidMount() {
		this.refreshAnimation(0);
		window.addEventListener("resize", this.updateWidth);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateWidth);
	}
	updateWidth() {
		this.refreshAnimation(this.state.currentStep);
	}
	navigationStepChange(key) {
		if (this.props.steps) {
			var validationState = true;

			if (validationState) {
				this.setState({
					currentStep: key
				});
				this.refreshAnimation(key);
			}
		}
	}

	refreshAnimation(index) {
		var total = this.props.steps.length;
		var li_width = 100 / total;
		var total_steps = this.props.steps.length;
		var move_distance =
		this.wizard.current.children[0].offsetWidth / total_steps;
		var index_temp = index;
		var vertical_level = 0;

		var mobile_device = window.innerWidth < 600 && total > 3;

		if (mobile_device) {
			move_distance = this.wizard.current.children[0].offsetWidth / 2;
			index_temp = index % 2;
			li_width = 50;
		}

    this.setState({ width: li_width + "%" });

		var step_width = move_distance;
		move_distance = move_distance * index_temp;

		var current = index + 1;

		if (current === 1 || (mobile_device === true && index % 2 === 0)) {
			move_distance -= 8;
		} else if (
      current === total_steps ||
      (mobile_device === true && index % 2 === 1)
		) {
			move_distance += 8;
		}

		if (mobile_device) {
			vertical_level = parseInt(index / 2, 10);
			vertical_level = vertical_level * 38;
		}
		var movingTabStyle = {
      width: step_width,
      transform: "translate3d(" + move_distance + "px, " + vertical_level + "px, 0)",
      transition: "all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)"
		};
		this.setState({ movingTabStyle: movingTabStyle });
	}
  render() {
    const { classes, title, subtitle, color, steps } = this.props;
    return (
		<div className={classes.wizardContainer} ref={this.wizard}>
			<Card className={classes.card}>
				<div className={classes.wizardHeader}>
					<h3 className={classes.title}>{title}</h3>
					<h5 className={classes.subtitle}>{subtitle}</h5>
				</div>
				<div className={classes.wizardNavigation}>
					<ul className={classes.nav}>
						{steps.map((prop, key) => {
							return (
							<li
								className={classes.steps}
								key={key}
								style={{ width: this.state.width }}
							>
								<a
								href="#pablo"
								className={classes.stepsAnchor}
								onClick={e => {
									e.preventDefault();
									this.navigationStepChange(key);
								}}
								>
								{prop.stepName}
								</a>
							</li>
							);
						})}
					</ul>
					<div
					className={classes.movingTab + " " + classes[color]}
					style={this.state.movingTabStyle}
					>
						{steps[this.state.currentStep].stepName}
					</div>
				</div>
				<div className={classes.content}>
					{steps.map((prop, key) => {
					const stepContentClasses = cx({
						[classes.stepContentActive]: this.state.currentStep === key,
						[classes.stepContent]: this.state.currentStep !== key
					});
					return (
						<div className={stepContentClasses} key={key}>
              <prop.stepComponent
                innerRef={node => (this[prop.stepId] = node)}
                allStates={this.state.allStates}
              />
						</div>
					);
					})}
				</div>
			</Card>
		</div>
    );
  }
}

Wizard.defaultProps = {
	color: "rose",
	title: "Here should go your title",
	subtitle: "And this would be your subtitle"
};

Wizard.propTypes = {
	classes: PropTypes.object.isRequired,
	steps: PropTypes.arrayOf(
		PropTypes.shape({
			stepName: PropTypes.string.isRequired,
			stepComponent: PropTypes.object.isRequired,
			stepId: PropTypes.string.isRequired
		})
	).isRequired,
	color: PropTypes.oneOf([
		"primary",
		"warning",
		"danger",
		"success",
		"info",
		"rose"
	]),
	title: PropTypes.string,
	subtitle: PropTypes.string,
	validate: PropTypes.bool
};

export default withStyles(wizardStyle)(Wizard);
