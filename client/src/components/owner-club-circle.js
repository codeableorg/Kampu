/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Title } from "../components/ui";

function OwnerClubCircle({
  id,
  active,
  name,
  activeClub,
  setActiveClub,
  image
}) {
  const styleCircle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    margin: "0 1em",
    cursor: "pointer",
    boxSizing: "border-box",
    background: `url(${image}) no-repeat center center`,
    backgroundSize: "cover",
    transition: "all 0.3s"
  };

  const styleActive = {
    ...styleCircle,
    border: "solid #9adda8e0 0.5em"
  };

  const styleName = {
    fontWeight: "normal",
    textAlign: "center",
    width: "100px",
    margin: "1em auto",
    alignSelf: "center",
    cursor: "pointer",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  };

  function handleClick() {
    setActiveClub(id);
  }

  return (
    <div onClick={handleClick}>
      <div css={activeClub === id ? styleActive : styleCircle} />
      <Title css={styleName}>{name}</Title>
    </div>
  );
}

export default OwnerClubCircle;
