/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import dateFns from "date-fns";
import { SecondaryButton } from "./ui";
import { useSetNotify } from "../actions/action-hooks";
import { formatHour } from "../utils";
import { ChevronLeft, ChevronRight } from "./icons";

function ArrowButton({ styles, ...props }) {
  return (
    <button
      {...props}
      css={{
        border: "none",
        color: "#fff",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 24,
        outline: "none",
        background: "#0ca8ad",
        borderRadius: "5px",
        padding: "5px",
        cursor: "pointer",
        ...styles,
        ":hover": {
          background: "#0c8286"
        },
        ":focus": {
          boxShadow: "0 0 0 0.2rem rgba(44,62,80,.25)"
        }
      }}
    />
  );
}

function Calendar({
  title,
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
    return finder ? "⚽" : "";
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
    width: "100px",
    marginRight: "5px",
    padding: ".5rem 0",
    backgroundColor: "#0ca8ad",
    border: "1px solid #0ca8ad",
    "@media screen and (max-width: 750px)": {
      margin: "auto"
    },
    ":hover": {
      color: "#0ca8ad"
    }
  };

  return (
    <>
      <div
        css={{
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap"
        }}
      >
        <div
          css={{
            display: "flex",
            minWidth: "130px",
            "@media screen and (max-width: 750px)": {
              margin: "10px auto"
            }
          }}
        >
          <div
            css={{
              marginRight: "10px",
              borderRadius: "5px",
              background: "#0ca8ad"
            }}
          >
            <ArrowButton onClick={back} title="Move to the previous week">
              <ChevronLeft />
            </ArrowButton>
            <ArrowButton onClick={next} title="Move to the next week">
              <ChevronRight />
            </ArrowButton>
          </div>
          <SecondaryButton onClick={today} css={buttons}>
            Today
          </SecondaryButton>
        </div>
        <h2
          css={{
            textAlign: "center",
            fontSize: "30px",
            letterSpacing: "1px",
            color: "#718096",
            margin: "0",
            "@media screen and (max-width: 750px)": {
              margin: "10px 0",
              order: "-1",
              width: "100%"
            }
          }}
        >
          {title}
        </h2>
        <SecondaryButton onClick={onContinue} css={buttons}>
          Continue
        </SecondaryButton>
      </div>
      <div
        css={{
          fontSize: "14px",
          marginTop: "2em",
          "@media screen and (max-width: 750px)": {
            overflow: "auto",
            minWidth: "280px",
            maxHeight: "400px"
          }
        }}
      >
        <div>{loading && "cargando..."}</div>
        <div
          css={{
            display: "flex",
            textAlign: "center",
            position: "sticky",
            top: "66px",
            "@media screen and (max-width: 750px)": {
              top: "0"
            },
            zIndex: "123",
            background: "white",
            "& > div:first": {
              width: "50px"
            },
            "& > div": {
              flex: "1",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "rgba(0, 0, 0, .1)",
              textAlign: "center",
              paddingTop: "10px",
              paddingBottom: "10px",
              minWidth: "75px"
            }
          }}
        >
          <div
            css={{
              minWidth: "75px",
              position: "sticky",
              left: "0"
            }}
          />
          {dates.map(dat => (
            <div key={dat}>{dateFns.format(dat, "ddd DD/MM")}</div>
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
                paddingBottom: "1rem",
                minWidth: "75px",
                position: "sticky",
                left: "0"
              }
            }}
          >
            <div>{formatHour(hour)}</div>
            {dates.map(date => (
              <div
                key={date}
                onClick={() => onSel(date, hour)}
                css={{
                  background: active(date, hour)
                    ? "#5ecfb5"
                    : compare(date, hour) !== ""
                    ? "#ddd"
                    : "inherit"
                }}
              >
                {compare(date, hour)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Calendar;
