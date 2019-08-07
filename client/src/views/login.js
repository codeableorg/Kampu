/** @jsx jsx */
import React, { useState } from "react";
import { jsx } from "@emotion/core";
import { Link, navigate } from "@reach/router";
import { login } from "../services/user";
import { useSetUser, useSetNotify } from "../actions/action-hooks";
import { Card, Button, MaterialInput, styleFormUser } from "../components/ui";
import Soccer from "../assets/soccer.svg";

function Login({ user }) {
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
    if (user.name) {
      navigate(user.role === "regular" ? "/" : "/owner");
    }
  }, [user]);

  React.useEffect(() => {
    setError(null);
  }, [inputs]);

  if (user.name) return null;

  return (
    <div css={styleFormUser}>
      <Card
        css={{
          width: "50%",
          maxWidth: "450px",
          "@media screen and (max-width: 740px)": {
            width: "100%",
            minWidth: "initial"
          },
          "@media screen and (max-width: 480px)": {
            margin: "1em"
          }
        }}
      >
        <form onSubmit={handleSubmit}>
          <h2
            css={{
              fontSize: "30px",
              color: "#07bcc1",
              margin: "0px"
            }}
          >
            Kampu
          </h2>
          <p css={{ fontSize: "14px", color: "#718096" }}>
            Reserve the sports field for your next game
          </p>
          <img
            src={Soccer}
            css={{
              width: "100%",
              textAlign: "center",
              margin: "auto",
              display: "block",
              maxWidth: "300px"
            }}
            alt="soccer"
          />
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
          css={{
            color: "#718096",
            fontSize: "14px",
            textDecoration: "none",
            display: "flex",
            justifyContent: "flex-end",
            ":hover": {
              color: "#1a202c"
            }
          }}
        >
          Go to Signup
        </Link>
      </Card>
    </div>
  );
}

export default Login;
