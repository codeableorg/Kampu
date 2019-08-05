/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Link } from "@reach/router";
import { useUser, useSelectedClub } from "../selectors/selectors";
import { logout } from "../services/user";
import { useLogout, useSetNotify } from "../actions/action-hooks";
import { HomeIcon, Profile, BarChartIcon, Heart } from "./icons";

function Navbar() {
  const user = useUser();
  const selectedClub = useSelectedClub();
  const setLogout = useLogout();
  const setNotify = useSetNotify();

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

  const styleMenuTop = {
    textDecoration: "none",
    color: "inherit",
    padding: "1em",
    borderRight: "1px solid #ddd",
    flex: "auto"
  };

  const styleLogout = {
    background: "none",
    color: "inherit",
    border: "none",
    padding: "0 1em",
    flex: "auto",
    font: "inherit",
    cursor: "pointer",
    outline: "inherit"
  };

  async function handleLogoutButton() {
    logout().then(() => {
      setNotify("User logout");
      setLogout();
    });
  }

  return (
    <>
      <nav
        css={{
          background: "#fff",
          padding: "15px",
          marginBottom: "2em",
          flex: 1,
          boxShadow: "0 5px 10px 0 rgba(0,64,128,.05)",
          top: "0",
          position: "sticky",
          zIndex: 100
        }}
      >
        <div
          css={{
            maxWidth: "900px",
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Link to="/" css={{ textDecoration: "none" }}>
            <h2
              css={{
                textDecoration: "none",
                margin: "0",
                fontSize: "30px",
                letterSpacing: "1px",
                display: "inline-block",
                backgroundImage:
                  "-webkit-gradient(linear, 0% 0%, 25% 150%,from(#c5e9a1), to(#00b7c6))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Kampu
            </h2>
          </Link>
          <div
            css={{
              display: "flex",
              "@media screen and (max-width: 760px)": {
                display: "none"
              }
            }}
          >
            {user.role === "regular" && (
              <div>
                <Link to="/" css={styleMenuTop}>
                  Home
                </Link>
                <Link to="/favorites" css={styleMenuTop}>
                  Favorites
                </Link>
                <Link to="/profile" css={styleMenuTop}>
                  Profile
                </Link>
              </div>
            )}
            {user.role === "owner" && (
              <div>
                <Link to="/owner" css={styleMenuTop}>
                  Home
                </Link>
                <Link to={`/report/${selectedClub}`} css={styleMenuTop}>
                  Reports
                </Link>
                <Link to="/profile" css={styleMenuTop}>
                  Profile
                </Link>
              </div>
            )}
            {user.email && (
              <button css={styleLogout} onClick={handleLogoutButton}>
                Logout
              </button>
            )}
          </div>
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
            textAlign: "center",
            "@media screen and (min-width: 760px)": {
              display: "none"
            }
          }}
        >
          {user.role === "regular" && (
            <>
              <Link to="/" css={styleMenu}>
                <HomeIcon />
              </Link>
              <Link to="/favorites" css={styleMenu}>
                <Heart />
              </Link>
              <Link to="/profile" css={styleMenu}>
                <Profile />
              </Link>
            </>
          )}
          {user.role === "owner" && (
            <>
              <Link to="/owner" css={styleMenu}>
                <HomeIcon />
              </Link>
              <Link to={`/report/${selectedClub}`} css={styleMenu}>
                <BarChartIcon />
              </Link>
              <Link to="/profile" css={styleMenu}>
                <Profile />
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
