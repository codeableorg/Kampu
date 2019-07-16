/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { getFavoriteClubs } from "../services/club";
import { useClubs } from "../selectors/selectors";
import { useSetClubs } from "../actions/action-hooks";
import Club from "../components/club";

function Home() {
  const [loading, setLoading] = React.useState(false);
  const [clubs, setClubs] = React.useState([]);
  // const setClubs = useSetClubs();

  React.useEffect(() => {
    setLoading(true);
    getFavoriteClubs().then(clubs => {
      console.log(clubs);
      setClubs(clubs);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h2>Favorites Clubs</h2>
      {loading && <div>Loading</div>}
      {clubs.map(club => (
        <Club club={club} key={club.id} />
      ))}
    </div>
  );
}

export default Home;
