/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { navigate } from "@reach/router";
import { scheduleBooking } from "../services/sport-field";
import { Button } from "../components/ui";
import { Link } from "@reach/router";

function OwnerSportField({ id }) {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date().toLocaleDateString("en-CA")
  );

  const [range, setRange] = React.useState({ start: 0, end: 0 });
  const [bookings, setBookings] = React.useState([]);

  const styleDate = {
    appearance: "none",
    color: "#95a5a6",
    fontFamily: "Helvetica, arial, sans-serif",
    fontSize: "18px",
    border: "1px solid #ecf0f1",
    background: "#ecf0f1",
    padding: "5px",
    display: "inline-block !important",
    visibility: "visible !important",
    "&::-webkit-clear-button": {
      display: "none"
    },
    "&::-webkit-inner-spin-button": {
      display: "none"
    },
    "&::-webkit-calendar-picker-indicator": {
      color: "#2c3e50"
    },
    "&:focus": {
      color: "#95a5a6",
      boxShadow: "none"
    }
  };

  const styleTable = {
    margin: "0 auto",
    marginBottom: "20px",
    borderCollapse: "collapse",
    border: "none",
    borderRadius: "3px",
    background: "#52be7f"
  };

  const styleTh = {
    fontWeight: "normal",
    padding: "1em",
    color: "rgba(0,0,0,0.45)",
    textShadow: "0 0 1px rgba(0,0,0,0.1)",
    fontSize: "calc(0.8em + 1vw)",
    boxShadow: "inset 0 -1px rgba(0,0,0,0.25), inset 0 1px rgba(0,0,0,0.25)"
  };

  const styleTd = {
    color: "#f7f7f7",
    padding: "0.7em 1em 0.7em 1.15em",
    textShadow: "0 0 1px rgba(255,255,255,0.1)",
    fontSize: "calc(0.5em + 1vw)",
    boxShadow: "inset 0 -1px rgba(0,0,0,0.25), inset 0 1px rgba(0,0,0,0.25)"
  };

  const styleTr = {
    "&:hover": {
      background: "rgba(0,0,0,0.1)"
    }
  };

  React.useEffect(() => {
    scheduleBooking(id, selectedDate).then(({ bookings, club }) => {
      const str = gethours(club["schedule"], new Date(selectedDate).getDay());
      setRange({
        start: parseInt(str.start),
        end: parseInt(str.end)
      });
      console.log(bookings);
      setBookings(bookings);
    });
  }, [selectedDate, id]);

  function gethours(obj, numDay) {
    if (numDay === 0) return obj["sunday"];
    if (numDay === 6) return obj["saturday"];
    return obj["monday-friday"];
  }

  function getInfo(hour) {
    const booking = bookings.find(booking => {
      return booking.start_hour <= hour && booking.end_hour > hour;
    });
    return booking ? booking.id : "";
  }

  // selectedDate = new Date().toLocaleDateString("en-CA");

  function handleSelectedDate(e) {
    setSelectedDate(e.target.value);
  }

  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1em"
        }}
      >
        <input
          type="date"
          name="bookingDate"
          css={styleDate}
          value={selectedDate}
          onChange={handleSelectedDate}
        />
        <Link
          to={`/sport-field/${id}`}
          css={{
            textDecoration: "none"
          }}
        >
          <Button css={{ margin: "1em 0", padding: "0.75em" }}>
            Create a Booking
          </Button>
        </Link>
      </div>
      <table css={styleTable}>
        <thead>
          <tr>
            <th css={styleTh}>Time</th>
            <th css={styleTh}>Customer Id</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: range.end - range.start }).map((_, i) => (
            <tr key={i} css={styleTr}>
              <td css={styleTd}>
                {i + range.start}:00 - {i + range.start + 1}:00
              </td>
              <td css={styleTd}>{getInfo(i + range.start)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OwnerSportField;
