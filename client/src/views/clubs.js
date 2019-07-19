/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Label, Card } from "../components/ui";
import { clubData } from "../services/club";
import SportfieldInfo from "../components/sportfield-info";

function Clubs({ id }) {
  const [club, setClub] = React.useState({ sport_fields: [] });

  React.useEffect(() => {
    clubData(id).then(data => {
      setClub(data);
    });
  }, []);

  console.log(club);
  console.log(club.sport_fields);
  return (
    <div>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          "@media screen and (min-width: 768px)": {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }
        }}
      >
        <div>
          <Label>Address</Label>
          <Label css={{ fontSize: "12px" }}>{club.address}</Label>
        </div>
        {console.log(club.sport_fields)}

        <br />

        <div>
          <Label>Schedule</Label>
          <div css={{ display: "flex", justifyContent: "space-between" }}>
            <Label htmlFor="monday-friday.init" css={{ fontSize: "12px" }}>
              Monday - Friday
            </Label>
            <Label css={{ fontSize: "12px" }}>
              {club.schedule && club.schedule["monday-friday"].start} -{" "}
              {club.schedule && club.schedule["monday-friday"].end}
            </Label>
          </div>

          <div css={{ display: "flex", justifyContent: "space-between" }}>
            <Label
              htmlFor="schedule-saturdays-start"
              css={{ fontSize: "12px" }}
            >
              Saturday
            </Label>
            <Label css={{ fontSize: "12px" }}>
              {club.schedule && club.schedule["saturday"].start} -{" "}
              {club.schedule && club.schedule["saturday"].end}
            </Label>
          </div>

          <div css={{ display: "flex", justifyContent: "space-between" }}>
            <Label htmlFor="schedule-sundays-start" css={{ fontSize: "12px" }}>
              Sunday
            </Label>
            <Label css={{ fontSize: "12px" }}>
              {club.schedule && club.schedule["sunday"].start} -{" "}
              {club.schedule && club.schedule["sunday"].end}
            </Label>
          </div>
        </div>
      </div>
      <br />
      {club.sport_fields.map(sportField => {
        return <SportfieldInfo sportField={sportField} />;
      })}
    </div>
  );
}

export default Clubs;
