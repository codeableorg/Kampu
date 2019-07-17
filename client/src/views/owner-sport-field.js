/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { navigate } from "@reach/router";
import { scheduleBooking } from "../services/sport-field";

function OwnerSportField({ id }) {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date().toLocaleDateString("en-CA")
  );

  const [range, setRange] = React.useState({ start: 0, end: 0 });
  const [bookings, setBookings] = React.useState([]);

  const border = {
    border: "2px solid #dddddd",
    textAlign: "left",
    padding: "8px"
  };
  const date = {
    height: "35px",
    margin: "0 auto",
    fontFamily: "arial, sans-serif",
    fontSize: "14px",
    fontWeight: "bold",
    textTransform: "uppercase",
    backgroundColor: "gray",
    outline: "none",
    border: "0",
    borderRadius: "10px",
    padding: "0px 10px 0px 10px",
    color: "black",

    "&:hover": {
      color: "blue",
      cursor: "pointer"
    },
    "&:active": {
      color: "yellow"
    }
  };

  const table = {
    fontFamily: "arial, sans-serif",
    fontSize: "12px",
    borderCollapse: "collapse",
    width: "90%",
    top: "10px",
    right: "10px",
    left: "10px",
    bottom: "10px",
    background: "gray",
    padding: "0px",
    textAlign: "center",
    "@media screen and (min-width: 768px)": {
      width: "50%"
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
          justifyContent: "center",
          marginBottom: "50px"
        }}
      >
        <input
          type="date"
          name="bookingDate"
          css={date}
          value={selectedDate}
          onChange={handleSelectedDate}
        />
      </div>
      <table css={table}>
        <thead>
          <tr>
            <th css={border}>Time</th>
            <th css={border}>Customer Id</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: range.end - range.start }).map((_, i) => (
            <tr key={i}>
              <td css={border}>
                {i + range.start}:00 - {i + range.start + 1}:00
              </td>
              <td css={border}>{getInfo(i + range.start)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OwnerSportField;
