/** @jsx jsx */

import { jsx } from "@emotion/core";

function RoleButton({ name, type, userType, setUserType }) {
  const styleCircle = {
    backgroundColor: "#bababa",
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    margin: "0 1em",
    display: "flex",
    cursor: "pointer",
    border: "solid #ffffff00 0.1em",
    boxSizing: "border-box",
    transition: "all 0.3s"
  };

  const styleActive = {
    ...styleCircle,
    border: "solid #9adda8e0 0.5em"
  };

  const styleName = {
    fontWeight: "bold",
    fontSize: "12px",
    margin: "auto",
    alignSelf: "center"
  };

  function handleClick() {
    setUserType(type);
  }

  return (
    <div
      onClick={handleClick}
      css={userType === type ? styleActive : styleCircle}
    >
      <p css={styleName}>{name}</p>
    </div>
  );
}

export default RoleButton;
