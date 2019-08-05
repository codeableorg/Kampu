/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { navigate } from "@reach/router";
import { clubReport } from "../services/club";
import { Title } from "../components/ui";
import BarChart from "../components/barchart";
import { Select } from "../components/ui";

function Report({ id }) {
  const [sportsFields, setSportsFields] = React.useState();
  const [filterDate, setFilterDate] = React.useState("month");

  React.useEffect(() => {
    if (id !== "null") {
      clubReport(id, filterDate).then(data => {
        setSportsFields(data);
      });
    } else {
      navigate("/owner");
    }
  }, [id, filterDate]);

  function handleChangeFilterDate(e) {
    setFilterDate(e.target.value);
  }

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

  return (
    <>
      <Title>Report</Title>
      <div
        css={{ display: "flex", justifyContent: "center", marginBottom: "1em" }}
      >
        <Select onChange={handleChangeFilterDate} defaultValue="month">
          <option value="week">Last week</option>
          <option value="month">Last month</option>
          <option value="3month">Last 3 months</option>
          <option value="year">Last year</option>
        </Select>
      </div>
      <BarChart sportsFields={sportsFields} />
      <table css={styleTable}>
        <thead>
          <tr>
            <th css={styleTh}>Sports Fields</th>
            <th css={styleTh}>Total ($)</th>
          </tr>
        </thead>
        <tbody>
          {sportsFields &&
            sportsFields.report.map(sportsField => {
              return (
                <tr key={sportsField.id} css={styleTr}>
                  <td css={styleTd}>{sportsField.name}</td>
                  <td css={styleTd}>{sportsField.bookings}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default Report;
