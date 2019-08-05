/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { useSetClubs } from "../actions/action-hooks";
import { useClubs } from "../selectors/selectors";
import { getClubs } from "../services/club";
import Club from "../components/club";
import { getDistance } from "geolib";
import { Select } from "../components/ui";
import Spinner from "../components/spinner";

function Home() {
  const clubs = useClubs();
  const setClubs = useSetClubs();
  const [loading, setLoading] = React.useState(false);
  const [position, setPosition] = React.useState([0, 0]);
  const [selectedLocation, setSelectedLocation] = React.useState("");
  const [sortType, setSortType] = React.useState("location");

  React.useEffect(() => {
    setLoading(true);
    getClubs().then(clubs => {
      setClubs(clubs);
      setLoading(false);
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
    setSelectedLocation(e.target.value);
  }

  function handleChangeSortType(e) {
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

  function filterBy(club) {
    if (selectedLocation !== "") {
      return selectedLocation === club.district;
    } else {
      return true;
    }
  }

  const styleSelectsContainer = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1em"
  };

  return (
    <>
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
      <div
        css={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between"
        }}
      >
        {loading && <Spinner />}
        {!loading &&
          clubs
            .map(club => {
              let distance = null;
              if (
                club.latitude == null ||
                club.longitude == null ||
                club.latitude === "null" ||
                club.longitude === "null"
              ) {
                distance = null;
              } else if (position[0] !== 0) {
                distance = setDistance(club, position);
              }
              club.distance = distance;
              return club;
            })
            .filter(filterBy)
            .sort(sortBy)
            .map(club => {
              return <Club key={club.id} club={club} />;
            })}
      </div>
    </>
  );
}

export default Home;
