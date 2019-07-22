/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { clubReport } from "../services/club";
import { Title } from "../components/ui";
import BarChart from "../components/barchart";

function Report({ id }) {
  const [sportsFields, setSportsFields] = React.useState();

  React.useEffect(() => {
    clubReport(id).then(data => {
      setSportsFields(data);
    });
  }, [id]);

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
    fontSize: "1.5em",
    boxShadow: "inset 0 -1px rgba(0,0,0,0.25), inset 0 1px rgba(0,0,0,0.25)"
  };

  const styleTd = {
    color: "#f7f7f7",
    padding: "0.7em 1em 0.7em 1.15em",
    textShadow: "0 0 1px rgba(255,255,255,0.1)",
    fontSize: "1.4em",
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
