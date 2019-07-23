/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import Chart from "chart.js";

function BarChart({ sportsFields }) {
  React.useEffect(() => {
    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels:
          sportsFields &&
          sportsFields.report.map(sportsField => sportsField.name),
        datasets: [
          {
            label: "Report",
            data:
              sportsFields &&
              sportsFields.report.map(sportsField => sportsField.bookings),
            backgroundColor: "rgb(145, 224, 178, 0.6)",
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Total($)"
              },
              ticks: {
                suggestedMin: 0,
                suggestedMax: 100
              }
            }
          ]
        }
      }
    });
  }, [sportsFields]);

  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
        maxWidth: "90%"
      }}
    >
      <canvas id="myChart" css={{ width: "100%", height: "auto" }} />
    </div>
  );
}

export default BarChart;
