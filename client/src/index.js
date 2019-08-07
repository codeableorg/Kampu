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

const PrivateRoute = ({ component: Component, user, path, ...props }) => {
  if (!user.name) return <Redirect from="*" to="/login" noThrow />;
  return <Component path={path} {...props} />;
};

function App() {
  const user = useUser();

  return (
    <>
      <Notify />
      <Navbar />
      <main
        css={{
          maxWidth: "1000px",
          margin: "0 auto",
          boxSizing: "border-box",
          marginBottom: "80px",
          "@media (max-width: 1030px)": {
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
        <Router primary={false}>
          <Login path="/login" user={user} />
          <Signup path="/signup" user={user} />
          <PrivateRoute component={Home} path="/" user={user} />
          <PrivateRoute component={OwnerHome} path="/owner" user={user} />
          <PrivateRoute component={CreateClub} path="/create-club" user={user} />
          <PrivateRoute
            component={CreateSportField}
            path="/create-sport-field"
            user={user}
          />
          <PrivateRoute
            component={OwnerSportField}
            path="/owner-sport-field/:id"
            user={user}
          />
          <PrivateRoute component={Report} path="/report/:id" user={user} />
          <PrivateRoute component={Favorites} path="/favorites" user={user} />
          <PrivateRoute component={Clubs} path="/clubs/:id" user={user} />
          <PrivateRoute component={Checkout} path="/checkout" user={user} />
          <PrivateRoute
            component={SportField}
            path="/sport-field/:id"
            user={user}
          />
          <PrivateRoute component={Profile} path="/profile" user={user} />
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
    if (!["/login", "/signup"].includes(window.location.pathname)) {
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
