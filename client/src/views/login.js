/** @jsx jsx */
import React, { useState } from "react";
import { jsx } from "@emotion/core";
import { Link, navigate } from "@reach/router";
import { login } from "../services/user";

import { Input, Card, Button } from "../components/ui";

function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = React.useState(null);

  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await login(inputs);
      navigate("/owner");
      // userUpdater({ type: "LOGIN", payload: { name, email } });
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
        backgroundColor: "#0d0d0d8a",
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
          <h2 css={{ textAlign: "center", fontWeight: "400" }}>
            Welcome to Kampu
          </h2>
          <Input
            type="email"
            name="email"
            onChange={handleChange}
            value={inputs.email}
            placeholder="Email"
            required
            css={{
              "@media screen and (max-width: 480px)": {
                fontSize: ".8rem"
              }
            }}
          />
          <Input
            type="password"
            name="password"
            onChange={handleChange}
            value={inputs.password}
            placeholder="Enter your password"
            css={{
              marginTop: "1em",
              "@media screen and (max-width: 480px)": {
                fontSize: ".8rem"
              }
            }}
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
  