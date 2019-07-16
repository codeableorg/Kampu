/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Card, Title } from "../components/ui";

function ClubCard({ club }) {
  const styleCard = {
    maxWidth: "100%",
    marginBottom: "1.5em"
  };

  return (
    <Card css={styleCard}>
      <Title>{club.name}</Title>
      <p>{JSON.stringify(club)}</p>
      <p>{club.position}</p>
      <p>{club.distance !== 0 ? `${club.distance / 1000.0}km` : null}</p>
    </Card>
  );
}

export default ClubCard;
