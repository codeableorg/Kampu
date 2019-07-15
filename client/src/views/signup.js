/** @jsx jsx */
import React, { useState } from "react";
import { jsx } from "@emotion/core";
import { Link, navigate } from "@reach/router";
import { register } from "../services/user";

import { Input, Card, Button } from "../components/ui";
import RoleButton from "../components/role-button";

function Signup() {
  const [inputs, setInputs] = useState({
    name: "",
    role: "regular",
    email: "",
    password: ""
  });

  const [error, setError] = React.useState(null);

  function setUserType(role) {
    setInputs({ ...inputs, role });
  }

  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await register(inputs);
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
        <div css={{ display: "flex", justifyContent: "center" }}>
          <RoleButton
            name="Regular"
            type="regular"
            setUserType={setUserType}
            userType={inputs.role}
          />
          <RoleButton
            name="Owner"
            type="owner"
            setUserType={setUserType}
            userType={inputs.role}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            onChange={handleChange}
            value={inputs.userName}
            placeholder="Enter your name *"
            required
            css={{
              marginTop: "2em",
              "@media screen and (max-width: 480px)": {
                fontSize: ".8rem"
              }
            }}
          />

          <Input
            type="email"
            name="email"
            onChange={handleChange}
            value={inputs.email}
            placeholder="Email *"
            required
            css={{
              marginTop: "1em",
              "@media screen and (max-width: 480px)": {
                fontSize: ".8rem"
              }
            }}
          />
          <Input
            type="password"
            name="password"
            onChange={handleChange}
            value={inputs.password1}
            placeholder="Enter a password *"
            css={{
              marginTop: "1em",
              "@media screen and (max-width: 480px)": {
                fontSize: ".8rem"
              }
            }}
          />

          <Button type="submit" css={{ marginTop: "2em" }}>
            Sign Up
          </Button>
          {error && (
            <div css={{ color: "tomato", marginTop: "1rem" }}>
              Error: {error}
            </div>
          )}
        </form>
        <br />
        <Link
          to="/login"
          style={{
            color: "#000",
            fontSize: "14px",
            textDecoration: "none",
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          Go to Login
        </Link>
      </Card>
    </div>
  );
}

export default Signup;
