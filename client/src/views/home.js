/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { useSetClubs } from "../actions/action-hooks";
import { useClubs } from "../selectors/selectors";
import { getClubs } from "../services/club";
import ClubCard from "../components/club-card";
import Club from "../components/club";
import { getDistance } from "geolib";
import { Select } from "../components/ui";

function Home() {
  const clubs = useClubs();
  const setClubs = useSetClubs();
  const [position, setPosition] = React.useState([0, 0]);
  const [selectedLocation, setSelectedLocation] = React.useState();
  const [sortType, setSortType] = React.useState("location");

  React.useEffect(() => {
    getClubs().then(clubs => {
      setClubs(clubs);
    });
  }, [setClubs]);

  function setDistance(clubPosition, position) {
    return getDistance(
      { latitude: position[0], longitude: position[1] },
      {
        latitude: parseFloat(clubPosition.latitude),
        longitude: parseFloat(clubPosition.longitude)
      }
    );
  }

  React.useEffect(() => {
    const watchID = navigator.geolocation.watchPosition(pos => {
      setPosition([pos.coords.latitude, pos.coords.longitude]);
    });
    return () => {
      navigator.geolocation.clearWatch(watchID);
    };
  }, [setPosition]);

  function handleChangeLocation(e) {
    console.log(e.target.value);
    setSelectedLocation(e.target.value);
  }

  function handleChangeSortType(e) {
    console.log(e.target.value);
    setSortType(e.target.value);
  }

  function sortBy(a, b) {
    switch (sortType) {
      case "location":
        return a.distance - b.distance;

      case "favorites":
        return b.favorited_count - a.favorited_count;

      case "name":
        return a.name - b.name;

      default:
        break;
    }
  }

  const styleSelectsContainer = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1em"
  };

  return (
    <div>
      <div css={styleSelectsContainer}>
        <Select
          onChange={handleChangeLocation}
          defaultValue=""
          styles={{ container: { width: "50%" } }}
        >
          <option value="" disabled hidden>
            Choose a district
          </option>
          <option value="">None</option>
          {[
            ...clubs.reduce((districts, club) => {
              districts.add(club.district);
              return districts;
            }, new Set())
          ].map(dist => {
            return (
              <option key={dist} value={dist}>
                {dist}
              </option>
            );
          })}
        </Select>
        <Select onChange={handleChangeSortType} defaultValue="location">
          <option value="location">Location</option>
          <option value="favorites">Favorites</option>
          <option value="name">Name</option>
        </Select>
      </div>

      {clubs ? (
        clubs
          .map(club => {
            let distance = 0;
            if (position[0] !== 0) {
              distance = setDistance(club, position);
            }
            club.distance = distance;
            return club;
          })
          .sort(sortBy)
          .map(club => {
            return <Club key={club.id} club={club} />;
          })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Home;
