/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Title } from "../components/ui";

function OwnerClubCircle({ id, active, name, activeClub, setActiveClub }) {
  const styleCircle = {
    backgroundColor: "#bababa",
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    margin: "0 1em",
    display: "flex",
    cursor: "pointer",
    border: "solid #ffffff00 0.5em",
    flex: "0 0 80px",
    textAlign: "center"
  };

  const styleActive = {
    ...styleCircle,
    border: "solid #272727 0.5em"
  };

  const styleName = {
    fontWeight: "normal",
    margin: "auto",
    alignSelf: "center"
  };

  function handleClick() {
    setActiveClub(id);
  }

  return (
    <div
      css={activeClub === id ? styleActive : styleCircle}
      onClick={handleClick}
    >
      <Title css={styleName}>{name}</Title>
    </div>
  );
}

export default OwnerClubCircle;
