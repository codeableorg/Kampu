/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Title } from "../components/ui";
import OwnerSportFieldCard from "../components/owner-sportfield-card";
import OwnerClubCircle from "../components/owner-club-circle";
import OwnerCreateButton from "../components/owner-create-button";
import {
  useSetClubs,
  useSetSportFields,
  useSetSelectedClub
} from "../actions/action-hooks";
import {
  useClubs,
  useSportFields,
  useSelectedClub
} from "../selectors/selectors";
import { getClubs } from "../services/club";
import { getSportFields } from "../services/sport-field";

function OwnerHome() {
  const clubs = useClubs();
  const sportFields = useSportFields();
  const setClubs = useSetClubs();
  const setSportFields = useSetSportFields();
  const setActiveClub = useSetSelectedClub();
  const activeClub = useSelectedClub();

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

  React.useEffect(() => {
    getClubs().then(clubs => {
      setClubs(clubs);
      setActiveClub(clubs.length ? clubs[0].id : null);
    });
  }, []);

  React.useEffect(() => {
    if (activeClub) {
      getSportFields().then(sportFields => {
        setSportFields(sportFields);
      });
    }
  }, [activeClub]);

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
        {clubs ? (
          clubs.map(club => {
            return (
              <OwnerClubCircle
                key={club.id}
                id={club.id}
                name={club.name}
                activeClub={activeClub}
                setActiveClub={setActiveClub}
              />
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Title>Sport Fields</Title>
      <div css={styleSportFieldsContainer}>
        {sportFields.length ? (
          sportFields
            .filter(sportField => sportField.club_id === activeClub)
            .map(sportField => {
              const progress = `${Math.floor(Math.random() * 100) + 1}%`;
              return (
                <OwnerSportFieldCard
                  key={sportField.id}
                  name={sportField.name}
                  progressStatus={progress}
                  id={sportField.id}
                />
              );
            })
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <OwnerCreateButton />
    </div>
  );
}

export default OwnerHome;
