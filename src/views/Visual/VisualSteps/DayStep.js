import React from "react"
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import TextField from '@material-ui/core/TextField';
import MoodService from "services/moodService";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "left"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  inputAdornment: {
    position: "relative"
  }
};

class DayStep extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      recommendation: null
    }
  }

  componentDidMount() {
    MoodService.todayRecommendation()
    .then(recommendation => {
      this.setState({
        recommendation: recommendation.recommend
      })
    });
  }

  isValidated() {
    return true;
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <GridContainer>
          <GridItem xs={12}>
            <h4 className={classes.infoText}>
              Mood occurance pattern (mode)
            </h4>
            <TextField
              id="pattern"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              defaultValue="day"
              InputProps={{
                readOnly: true,
              }}
            />
          </GridItem>
          <GridItem xs={12}>
            <h4 className={classes.infoText}>
              Suggestion from Calendar
            </h4>
            <TextField
              id="calendar"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={this.state.recommendation}
            />
          </GridItem>
        </GridContainer>
      </>
    )
  }
}

DayStep.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(DayStep)
