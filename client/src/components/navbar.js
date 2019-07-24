/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Link } from "@reach/router";
import { useUser, useSelectedClub } from "../selectors/selectors";

function Navbar() {
  const user = useUser();
  const selectedClub = useSelectedClub();
  const styleMenu = {
    textDecoration: "none",
    color: "inherit",
    padding: "15px",
    borderRight: "1px solid #ddd",
    flex: "auto",
    ":last-child": {
      border: "none"
    }
  };

  return (
    <>
      <nav
        css={{
          background: "#fff",
          borderBottom: "1px solid #e5edef",
          padding: "15px",
          marginBottom: "2em",
          flex: 1
        }}
      >
        <div
          css={{
            maxWidth: "900px",
            margin: "auto"
          }}
        >
          <Link to="/" css={{ textDecoration: "none" }}>
            <h2
              css={{
                textDecoration: "none",
                margin: "0",
                fontSize: "35px",
                fontWeight: "500",
                backgroundImage:
                  "-webkit-gradient(linear, 0% 0%, 25% 100%,from(#c5e9a1), to(#00b7c6))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Kampu
            </h2>
          </Link>
        </div>
        <div
          css={{
            position: "fixed",
            display: "flex",
            bottom: "1px",
            background: "#fff",
            border: "1px solid #ddd",
            right: "0",
            left: "0",
            alignItems: "center",
            justifyContent: "space-around",
            textAlign: "center"
          }}
        >
          {user.role === "regular" && (
            <>
              <Link to="/" css={styleMenu}>
                Home
              </Link>
              <Link to="/favorites" css={styleMenu}>
                Heart
              </Link>
              <Link to="/" css={styleMenu}>
                Profile
              </Link>
            </>
          )}
          {user.role === "owner" && (
            <>
              <Link to="/owner" css={styleMenu}>
                Home
              </Link>
              <Link to={`/report/${selectedClub}`} css={styleMenu}>
                Report
              </Link>
              <Link to="/profile" css={styleMenu}>
                Profile
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
