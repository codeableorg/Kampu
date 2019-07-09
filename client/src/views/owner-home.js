/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Title } from "../components/ui";
import OwnerSportFieldCard from "../components/owner-sportfield-card";
import OwnerClubCircle from "../components/owner-club-circle";

function OwnerHome() {
  const [clubs, setClubs] = React.useState([
    { id: 1, name: "Club #1" },
    { id: 2, name: "Club #2" },
    { id: 3, name: "Club #3" },
    { id: 4, name: "Club #4" },
    { id: 5, name: "Club #5" }
  ]);
  const [sportFields, setSportFields] = React.useState([
    {
      id: 1,
      name: "Sports Field #1",
      sportType: "soccer",
      description: "5vs5",
      photo: "",
      prices: {
        day: "50",
        night: "100"
      },
      progress: "50%",
      clubId: 1
    },
    {
      id: 2,
      name: "Sports Field #2",
      sportType: "soccer",
      description: "5vs5",
      photo: "",
      prices: {
        day: "50",
        night: "100"
      },
      progress: "80%",
      clubId: 2
    },
    {
      id: 3,
      name: "Sports Field #3",
      sportType: "soccer",
      description: "5vs5",
      photo: "",
      prices: {
        day: "50",
        night: "100"
      },
      progress: "10%",
      clubId: 1
    }
  ]);
  const [activeClub, setActiveClub] = React.useState(1);

  const styleClubsContainer = {
    display: "flex",
    alignItems: "center",
    overflowX: "auto",
    padding: "1em 0",
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
      borderRadius: "10px",
      backgroundColor: "#F5F5F5"
    },
    "&::-webkit-scrollbar": {
      height: "10px",
      backgroundColor: "#F5F5F5"
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      boxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
      backgroundColor: "#8f8f8f"
    }
  };

  const styleSportFieldsContainer = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    "@media screen and (max-width: 530px)": {
      display: "block"
    }
  };

  return (
    <div>
      <Title>Clubs</Title>
      <div css={styleClubsContainer}>
        {clubs.map(club => {
          return (
            <OwnerClubCircle
              key={club.id}
              id={club.id}
              name={club.name}
              activeClub={activeClub}
              setActiveClub={setActiveClub}
            />
          );
        })}
      </div>
      <Title>Sport Fields</Title>
      <div css={styleSportFieldsContainer}>
        {sportFields
          .filter(sportField => sportField.clubId === activeClub)
          .map(sportField => {
            return (
              <OwnerSportFieldCard
                key={sportField.id}
                name={sportField.name}
                progressStatus={sportField.progress}
              />
            );
          })}
      </div>
    </div>
  );
}

export default OwnerHome;
