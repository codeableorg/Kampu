/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Global } from "@emotion/core";
import { Router, Redirect } from "@reach/router";

import store from "./store";
import Home from "./views/home";
import Login from "./views/login";
import Signup from "./views/signup";
import OwnerHome from "./views/owner-home";
import CreateClub from "./views/create-club";
import CreateSportField from "./views/create-sport-field";
import OwnerSportField from "./views/owner-sport-field";
import Clubs from "./views/clubs";
import Favorites from "./views/favorites";
import Report from "./views/report";
import SportField from "./views/sport-field";
import Checkout from "./views/checkout";
import Profile from "./views/profile";
import Navbar from "./components/navbar";
import Notify from "./components/notify";
import { register } from "./service-worker";
import { getUser } from "./services/user";
import { useUser } from "./selectors/selectors";
import { setUser, setNotify } from "./actions/actions";

function App() {
  const user = useUser();

  return (
    <>
      <Notify />
      <Navbar />
      <main
        css={{
          maxWidth: "900px",
          margin: "0 auto",
          boxSizing: "border-box",
          marginBottom: "80px",
          "@media (max-width: 720px)": {
            padding: "0px 15px"
          }
        }}
      >
        <Global
          styles={{
            body: {
              background: "#fdfdfd",
              fontFamily: "'Rubik', sans-serif",
              margin: 0,
              color: "#333"
            },
            "button, input": {
              fontFamily: "inherit"
            }
          }}
        />
        <Router>
          {user.name ? (
            <Redirect
              from="/login"
              to={user.role === "regular" ? "/" : "/owner"}
              noThrow
            />
          ) : (
            window.location.pathname !== "/login" && (
              <Redirect from={window.location.pathname} to="/login" noThrow />
            )
          )}
          <Home path="/" />
          <Login path="/login" />
          <Signup path="/signup" />
          <OwnerHome path="/owner" />
          <CreateClub path="/create-club" />
          <CreateSportField path="/create-sport-field" />
          <OwnerSportField path="/owner-sport-field/:id" />
          <Report path="/report/:id" />
          <Favorites path="/favorites" />
          <Clubs path="/clubs/:id" />
          <Checkout path="/checkout" />
          <SportField path="/sport-field/:id" />
          <Profile path="/profile" />
        </Router>
      </main>
    </>
  );
}

const $root = document.getElementById("root");

async function main() {
  try {
    const user = await getUser();
    store.dispatch(setUser(user));
  } catch (error) {
    if (window.location.pathname !== "/login") {
      store.dispatch(setNotify("The user must login"));
    }
  } finally {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      $root
    );
  }
}

main().then(register());
