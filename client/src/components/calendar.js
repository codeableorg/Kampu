/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import dateFns from "date-fns";
import { SecondaryButton } from "./ui";
import { useSetNotify } from "../actions/action-hooks";
import { formatHour } from "../utils";

function Calendar({
  start,
  end,
  loading,
  onSelected,
  onContinue,
  getData,
  events,
  selected
}) {
  const [cursor, setCursor] = React.useState(dateFns.startOfWeek(new Date()));
  const [dates, setDates] = React.useState([]);
  const hours = Array.from(Array(end - start).keys()).map(i => i + start);
  const setNotify = useSetNotify();

  React.useEffect(() => {
    const times = Array.from(Array(7).keys()).map((_, index) => {
      return dateFns.format(dateFns.addDays(cursor, index), "YYYY-MM-D");
    });
    setDates(times);
  }, [cursor]);

  React.useEffect(() => {
    if (dates.length > 0) {
      getData(dates[0], dates[dates.length - 1]);
    }
  }, [dates]);

  function today() {
    setCursor(dateFns.startOfWeek(new Date()));
  }

  function next() {
    if (dateFns.differenceInCalendarDays(cursor, new Date()) < 30) {
      setCursor(dateFns.addDays(cursor, 7));
    } else {
      setNotify("Please select an available booking date");
    }
  }

  function back() {
    if (
      dateFns.differenceInCalendarDays(
        cursor,
        dateFns.startOfWeek(new Date())
      ) >= 7
    ) {
      setCursor(dateFns.subDays(cursor, 7));
    } else {
      setNotify("Please select an available booking date");
    }
  }

  function compare(date, hour) {
    const finder = events.find(event => {
      return (
        dateFns.format(date, "YYYY-MM-DD") === event.date &&
        event.start_hour <= hour &&
        event.end_hour > hour
      );
    });
    return finder ? finder.id : "";
  }

  function active(date, hour) {
    return selected.find(select => {
      return date === select.date && select.hour === hour;
    });
  }

  function onSel(date, hour) {
    if (compare(date, hour)) {
      setNotify("Este horario ya esta ocupado");
    } else {
      onSelected(date, hour);
    }
  }

  const buttons = {
    maxWidth: "100px",
    marginRight: "5px"
  };

  return (
    <div>
      <div
        css={{
          textAlign: "center"
        }}
      >
        <SecondaryButton onClick={back} css={buttons}>
          Back
        </SecondaryButton>
        <SecondaryButton onClick={next} css={buttons}>
          Next
        </SecondaryButton>
        <SecondaryButton onClick={today} css={buttons}>
          Today
        </SecondaryButton>
        <SecondaryButton onClick={onContinue} css={buttons}>
          Continue
        </SecondaryButton>
      </div>
      {/* header */}
      <div>{loading && "cargando..."}</div>
      <div
        css={{
          display: "flex",
          marginTop: "2em",
          textAlign: "center",
          position: "sticky",
          top: "66px",
          zIndex: "123",
          background: "white",
          "& > div": {
            flex: "1",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "rgba(0, 0, 0, .1)",
            textAlign: "center",
            paddingTop: "1rem",
            paddingBottom: "1rem"
          }
        }}
      >
        <div />
        {dates.map(dat => (
          <div key={dat}>
            <div>{dateFns.format(dat, "ddd")}</div>
            <div>{dateFns.format(dat, "DD/MM")}</div>
          </div>
        ))}
      </div>
      {/* body */}
      {hours.map((hour, index) => (
        <div
          key={index}
          css={{
            display: "flex",
            div: {
              flex: "1",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "rgba(0, 0, 0, .1)",
              textAlign: "center",
              paddingTop: "1rem",
              paddingBottom: "1rem"
            }
          }}
        >
          <div>{formatHour(hour)}</div>
          {dates.map(date => (
            <div
              key={date}
              onClick={() => onSel(date, hour)}
              css={{ background: active(date, hour) ? "#5ecfb5" : "inherit" }}
            >
              {compare(date, hour)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Calendar;
