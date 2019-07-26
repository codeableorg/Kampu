/** @jsx jsx */
import React from "react";
import { jsx, css, keyframes } from "@emotion/core";

function Spinner() {
  const bounce = keyframes`
    0%, 80%, 100% { 
      transform: scale(0);
    } 40% { 
      transform: scale(1.0);
    }
  `;

  const common = css`
    width: 16px;
    height: 16px;
    margin-right: 2px;
    background-color: rgba(106, 106, 106, 0.5);
    border-radius: 100%;
    display: inline-block;
    animation: ${bounce} 1.4s infinite ease-in-out both;
  `;

  return (
    <div
      css={{
        margin: "50px auto",
        width: "70px",
        textAlign: "center"
      }}
    >
      <div
        css={css`
          ${common}
          animation-delay: -0.32s;
        `}
      />
      <div
        css={css`
          ${common}
          animation-delay: -0.16s;
        `}
      />
      <div
        css={css`
          ${common}
        `}
      />
    </div>
  );
}

export default Spinner;
