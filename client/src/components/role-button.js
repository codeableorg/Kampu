/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";

function RoleButton({ name, type, userType, setUserType, icon }) {
  const styleCircle = {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    cursor: "pointer",
    border: "5px solid transparent",
    transition: "all .5s",
    marginRight: "10px"
  };

  const styleActive = {
    ...styleCircle,
    borderColor: "#9adda8e0"
  };

  function handleClick() {
    setUserType(type);
  }

  return (
    <div css={{ textAlign: "center" }} onClick={handleClick}>
      <div css={userType === type ? styleActive : styleCircle}>
        <img
          src={icon}
          alt="ss"
          css={{ display: "block", height: "85px", width: "85px" }}
        />
      </div>
      <div
        css={{
          fontSize: "14px",
          margin: "5px 0",
          transition: "all 0.3s",
          fontWeight: userType === type ? "bold" : "regular"
        }}
      >
        {name}
      </div>
    </div>
  );
}

export default RoleButton;
