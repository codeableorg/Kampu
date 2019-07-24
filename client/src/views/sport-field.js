/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { navigate } from "@reach/router";
import Calendar from "../components/calendar";
import { getClub } from "../services/club";
import { times } from "../services/sport-field";
import { useSetCart } from "../actions/action-hooks";

function SportField({ id }) {
  const [selected, setSelected] = React.useState([]);
  const [club, setClub] = React.useState(null);
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const setCart = useSetCart();

  React.useState(() => {
    getClub(id).then(club => {
      setClub(club);
    });
  }, []);

  function handleChange(date, hour) {
    if (!selected.some(selec => selec.date === date && selec.hour === hour)) {
      console.log();
      setSelected([
        ...selected.filter(selec => selec.date === date),
        { date, hour }
      ]);
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

  function onContinue() {
    if (selected.length) {
      setCart({
        selected,
        SportField: id
      });
      navigate("/checkout");
    } else {
      alert("Select some dates please");
    }
  }

  return (
    <>
      <h2 css={{ textAlign: "center", fontSize: "30px", letterSpacing: "1px" }}>
        Schedule
      </h2>
      <Calendar
        onSelected={handleChange}
        events={events}
        start={club ? parseInt(club.schedule["monday-friday"].start) : 0}
        end={club ? parseInt(club.schedule["monday-friday"].end) : 0}
        getData={getData}
        loading={loading}
        selected={selected}
        onContinue={onContinue}
      />
    </>
  );
}

export default SportField;
