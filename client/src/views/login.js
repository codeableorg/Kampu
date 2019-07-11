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
      navigate("/");
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
        justifyContent: "center"
      }}
    >
      <Card
        css={{
          minWidth: "400px",
          width: "50%",
          "@media screen and (max-width: 480px)": {
            width: "100%",
            minWidth: "initial"
          }
        }}
      >
        <form onSubmit={handleSubmit}>
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
            <div css={{ color: "red", marginTop: "1rem" }}>Error: {error}</div>
          )}
        </form>
        <br />

        <Link
          to="/signup"
          style={{
            color: "Black",
            fontSize: "10px",
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
