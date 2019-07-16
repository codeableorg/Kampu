/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { getClubs } from "../services/club";
import { useClubs } from "../selectors/selectors";
import { useSetClubs } from "../actions/action-hooks";
import Club from "../components/club";

function Home() {
  const [loading, setLoading] = React.useState(false);
  const clubs = useClubs();
  const setClubs = useSetClubs();

  React.useEffect(() => {
    setLoading(true);
    getClubs().then(clubs => {
      setClubs(clubs);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h2>Filters</h2>
      {loading && <div>Loading</div>}
      {clubs.map(club => (
        <Club club={club} key={club.id} />
      ))}
    </div>
  );
}

export default Home;
