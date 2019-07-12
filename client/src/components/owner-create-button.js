/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Link } from "@reach/router";

function OwnerCreateButton() {
  const [active, setActive] = React.useState(false);

  const styleButtonContainer = {
    position: "fixed",
    bottom: "2em",
    right: "1em",
    background: "#C3C4C3",
    width: "3em",
    height: "3em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",

    transition: "all 0.2s ease"
  };

  const styleIcon = {
    background: "none",
    color: "inherit",
    border: "none",
    padding: "0",
    font: "inherit",
    cursor: "pointer",
    outline: "inherit",
    fontSize: "2em",
    margin: 0,
    transition: "all 0.2s ease"
  };

  const styleIconActive = {
    ...styleIcon,
    transform: "rotate(45deg)",
    position: "absolute",
    bottom: "0.5em",
    right: "0.5em"
  };

  const styleListContainer = {
    ...styleButtonContainer,
    width: "12em",
    height: "10em",
    borderRadius: "15px"
  };

  const styleButtonsContainer = {
    display: "none"
  };

  const styleButtonsContainerActive = {
    ...styleButtonsContainer,
    display: "block"
  };

  const styleButton = {
    background: "none",
    display: "block",
    textDecoration: "none",
    color: "inherit",
    border: "none",
    padding: "0",
    font: "inherit",
    cursor: "pointer",
    outline: "inherit",
    fontSize: "1.3em",
    margin: 0,
    width: "100%",
    "&:hover": {
      background: "#a6a6a6"
    }
  };

  function handleClick() {
    setActive(!active);
  }

  return (
    <div css={active ? styleListContainer : styleButtonContainer}>
      <div css={active ? styleButtonsContainerActive : styleButtonsContainer}>
        <Link to="/create-club" css={styleButton}>
          Create Club
        </Link>
        <Link to="/create-sport-field" css={styleButton}>
          Create Sport Field
        </Link>
      </div>
      <button css={active ? styleIconActive : styleIcon} onClick={handleClick}>
        +
      </button>
    </div>
  );
}

export default OwnerCreateButton;
