/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { getFavoriteClubs } from "../services/club";
import { useClubsFavorites } from "../selectors/selectors";
import { useSetClubsFavorites } from "../actions/action-hooks";
import Club from "../components/club";

function Home() {
  const [loading, setLoading] = React.useState(false);
  const clubs = useClubsFavorites();
  const setClubs = useSetClubsFavorites();

  React.useEffect(() => {
    setLoading(true);
    getFavoriteClubs().then(clubs => {
      setClubs(clubs);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h2>Favorites Clubs</h2>
      {loading && <div>Loading</div>}
      <div
        css={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between"
        }}
      >
        {clubs.map(club => (
          <Club club={club} key={club.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
