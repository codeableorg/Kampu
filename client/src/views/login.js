/** @jsx jsx */
import React, { useState } from "react";
import { jsx } from "@emotion/core";
import { Link, navigate } from "@reach/router";
import { login } from "../services/user";
import { useSetUser, useSetNotify } from "../actions/action-hooks";
import { Card, Button, MaterialInput } from "../components/ui";
import Soccer from "../assets/soccer.svg";

function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = React.useState(null);
  const setUser = useSetUser();
  const setNotify = useSetNotify();

  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await login(inputs);
      setUser({ name: user.name, email: user.email, role: user.role });
      setNotify("Successful login");
      user.role === "owner" ? navigate("/owner") : navigate("/");
    } catch (error) {
      setError(error.message);
    }
  }

  React.useEffect(() => {
    setError(null);
  }, [inputs]);

  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        position: "fixed",
        top: "0",
        width: "100%",
        zIndex: "1000",
        backgroundColor: "rgba(13, 13, 13, 0.85)",
        backgroundImage: "url(https://i.imgur.com/3hVK2yO.jpg)",
        backgroundBlendMode: "overlay",
        backgroundPosition: "center",
        left: "0",
        alignItems: "center"
      }}
    >
      <Card
        css={{
          width: "50%",
          maxWidth: "450px",
          "@media screen and (max-width: 480px)": {
            width: "100%",
            minWidth: "initial"
          }
        }}
      >
        <form onSubmit={handleSubmit}>
          <img src={Soccer} css={{ width: "100%" }} alt="" />
          <h2 css={{ textAlign: "center", fontWeight: "400" }}>
            Welcome to Kampu
          </h2>
          <MaterialInput
            type="email"
            name="Email"
            onChange={handleChange}
            placeholder=" "
            value={inputs.email}
            required
          />
          <MaterialInput
            type="password"
            name="Password"
            onChange={handleChange}
            value={inputs.password}
            placeholder=" "
          />
          <Button
            type="submit"
            css={{
              marginTop: "1.5em"
            }}
          >
            Login
          </Button>
          {error && (
            <div css={{ color: "tomato", marginTop: "1rem" }}>
              Error: {error}
            </div>
          )}
        </form>
        <br />

        <Link
          to="/signup"
          style={{
            color: "#000",
            fontSize: "14px",
            textDecoration: "none",
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          Go to Signup
        </Link>
      </Card>
    </div>
  );
}

export default Login;
