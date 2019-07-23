/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import Calendar from "../components/calendar";
import { getClub } from "../services/club";
import { times } from "../services/sport-field";

function SportField({ id }) {
  const [selected, setSelected] = React.useState([]);
  const [club, setClub] = React.useState(null);
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useState(() => {
    getClub(id).then(club => {
      setClub(club);
    });
  }, []);

  function handleChange(date, hour) {
    if (!selected.some(selec => selec.date === date && selec.hour === hour)) {
      setSelected([...selected, { date, hour }]);
    } else {
      setSelected(
        selected.filter(selec => selec.date !== date || selec.hour !== hour)
      );
    }
  }

  function getData(startDate, endDate) {
    console.log(startDate, endDate);
    setLoading(true);
    times(id, startDate, endDate).then(data => {
      console.log(data);
      setEvents(data);
      setLoading(false);
    });
  }

  return (
    <Calendar
      onSelected={handleChange}
      events={events}
      start={club ? parseInt(club.schedule["monday-friday"].start) : 0}
      end={club ? parseInt(club.schedule["monday-friday"].end) : 0}
      getData={getData}
      loading={loading}
      selected={selected}
    />
  );
}

export default SportField;
