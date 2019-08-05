/** @jsx jsx */
import React, { useState } from "react";
import { jsx } from "@emotion/core";
import { Link, navigate } from "@reach/router";
import { register } from "../services/user";
import { useSetUser } from "../actions/action-hooks";

import { Input, Card, Button, MaterialInput } from "../components/ui";
import RoleButton from "../components/role-button";

function Signup() {
  const [inputs, setInputs] = useState({
    name: "",
    role: "regular",
    email: "",
    password: ""
  });
  const setUser = useSetUser();

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
      setUser(user);
      navigate(user.role === "regular" ? "/" : "/owner");
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
        <div
          css={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1em"
          }}
        >
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
          <MaterialInput
            type="text"
            name="Name"
            onChange={handleChange}
            placeholder=" "
            value={inputs.userName}
            required
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
