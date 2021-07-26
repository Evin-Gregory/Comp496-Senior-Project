import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import { feelings } from "constants.js";

import MoodService from "services/moodService";
import moment from "moment";

// core components
import Heading from "components/Heading/Heading";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";

import "assets/css/calendar-custom.css";

const localizer = momentLocalizer(moment);

export default function Calendar() {

  const history = useHistory();
  const [events, setEvents] = useState([])

  const handleSlot = slotInfo => {
    var year = slotInfo.start.getFullYear();
    var month = slotInfo.start.getMonth() + 1;
    var day = slotInfo.start.getDate();
    history.push(`/dashboard/current-date/${year}-${month}-${day}`);
  };

  const eventColors = event => {
    var backgroundColor = "event-";
    event.color
      ? (backgroundColor = backgroundColor + event.color)
      : (backgroundColor = backgroundColor + "default");
    return {
      className: backgroundColor
    };
  };

  useEffect(() => {
    MoodService.fetchAllMoods().then(moods => {
      const newEvents = moods.map((mood) => {

        return {
          title: feelings[mood.feeling],
          allDay: true,
          start: new Date(`${mood.date} GMT-04`),
          end: new Date(`${mood.date} GMT-04`),
          color: mood.feeling
        }
      });
      setEvents(newEvents);
    });
  }, [])

  return (
    <div>
      <Heading
        textAlign="center"
        title="Check Your Head"
        category={
          <span>
            Do you want any{" "}
            <Link to="/dashboard/help">Help</Link>
            ?. Please Click{" "}
            <Link to="/dashboard/help">Help</Link>{"."}
          </span>
        }
      />

      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardBody calendar>
              <BigCalendar
                selectable
                localizer={localizer}
                events={events}
                defaultView="month"
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date()}
                views={['month', 'week', 'day']}
                onSelectSlot={slotInfo => handleSlot(slotInfo)}
                eventPropGetter={eventColors}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
