/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Global } from "@emotion/core";
import { Router } from "@reach/router";

import store from "./store";
import Home from "./views/home";
import Login from "./views/login";
import Signup from "./views/signup";
import OwnerHome from "./views/owner-home";
import CreateClub from "./views/create-club";
import CreateSportField from "./views/create-sport-field";
import OwnerSportField from "./views/owner-sport-field";
import Navbar from "./components/navbar";
import { register } from "./service-worker";

function App() {
  return (
    <>
      <Navbar />
      <main
        css={{
          maxWidth: "900px",
          margin: "0 auto",
          boxSizing: "border-box",
          "@media (max-width: 720px)": {
            padding: "0px 15px"
          }
        }}
      >
        <Global
          styles={{
            body: {
              background: "#f7f7f7",
              fontFamily: "sans-serif",
              margin: 0,
              color: "#333"
            }
          }}
        />
        <Router>
          <Home path="/" />
          <Login path="/login" />
          <Signup path="/signup" />
          <OwnerHome path="/owner" />
          <CreateClub path="/create-club" />
          <CreateSportField path="/create-sport-field" />
          <OwnerSportField path="/owner-sport-field/:id" />
        </Router>
      </main>
    </>
  );
}

const $root = document.getElementById("root");

render(
  <Provider store={store}>
    <App />
  </Provider>,
  $root
);

register();
