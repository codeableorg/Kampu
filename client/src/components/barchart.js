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
              ticks: {
                beginAtZero: true
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
        maxWidth: "90%"
      }}
    >
      <canvas id="myChart" width="400" height="400" />
    </div>
  );
}

export default BarChart;
