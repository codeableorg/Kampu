/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Card, Title, Progress } from "../components/ui";

function OwnerSportFieldCard({ name, progressStatus }) {
  const [status, setStatus] = React.useState("0%");

  const styleCard = {
    maxWidth: "40%",
    marginBottom: "1.5em",
    "@media screen and (max-width: 530px)": {
      maxWidth: "100%"
    }
  };

  React.useEffect(() => {
    if (status !== progressStatus) {
      setStatus(progressStatus);
    }
  }, [progressStatus, status]);

  return (
    <Card css={styleCard}>
      <Title>{name}</Title>
      <Progress styles={{ bar: { width: status } }} />
      <p css={{ textAlign: "center" }}>Bookings: {progressStatus}</p>
    </Card>
  );
}

export default OwnerSportFieldCard;
