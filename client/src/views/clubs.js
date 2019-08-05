/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Title, Text, Card } from "../components/ui";
import { getClub } from "../services/club";
import SportfieldInfo from "../components/sportfield-info";
import Gallery from "../components/gallery";

function Clubs({ id }) {
  const [club, setClub] = React.useState({ sport_fields: [], image: [] });

  React.useEffect(() => {
    getClub(id).then(data => {
      setClub(data);
    });
  }, []);

  const styleTitle = {
    fontSize: "0.8em"
  };

  return (
    <div>
      <Gallery club={club} />
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
          <Title css={styleTitle}>Address</Title>
          <Text css={{ fontSize: "12px" }}>{club.address}</Text>
        </div>

        <br />

        <div>
          <Title css={styleTitle}>Schedule</Title>
          <div css={{ display: "flex", justifyContent: "space-between" }}>
            <Text htmlFor="monday-friday.init" css={{ fontSize: "12px" }}>
              Monday - Friday
            </Text>
            <Text css={{ fontSize: "12px" }}>
              {club.schedule && club.schedule["monday-friday"].start} -{" "}
              {club.schedule && club.schedule["monday-friday"].end}
            </Text>
          </div>

          <div css={{ display: "flex", justifyContent: "space-between" }}>
            <Text htmlFor="schedule-saturdays-start" css={{ fontSize: "12px" }}>
              Saturday
            </Text>
            <Text css={{ fontSize: "12px" }}>
              {club.schedule && club.schedule["saturday"].start} -{" "}
              {club.schedule && club.schedule["saturday"].end}
            </Text>
          </div>

          <div css={{ display: "flex", justifyContent: "space-between" }}>
            <Text htmlFor="schedule-sundays-start" css={{ fontSize: "12px" }}>
              Sunday
            </Text>
            <Text css={{ fontSize: "12px" }}>
              {club.schedule && club.schedule["sunday"].start} -{" "}
              {club.schedule && club.schedule["sunday"].end}
            </Text>
          </div>
        </div>
      </div>
      <br />
      <div
        css={{
          display: "flex",
          flexWrap: "wrap",
          "@media screen and (max-width: 760px)": {
            display: "block"
          }
        }}
      >
        {club.sport_fields.map(sportField => {
          return <SportfieldInfo key={sportField.id} sportField={sportField} />;
        })}
      </div>
    </div>
  );
}

export default Clubs;
