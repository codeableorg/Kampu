/** @jsx jsx */
import React, { useState } from "react";
import { jsx } from "@emotion/core";
import { Link } from "@reach/router";

import { Input, Card, Button } from "../components/ui";
import RoleButton from "../components/role-button";

// Custom hook that handle all inputs from form:
const useSignUpForm = (initialValues, callback) => {
  const [inputs, setInputs] = useState(initialValues);

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };

  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs
  };
};

const SignUp = () => {
  const alarm = () => {
    alert(`
    User Created! 
    Name: ${inputs.userName}
    Email: ${inputs.email}
    `);
  };
  const { inputs, handleInputChange, handleSubmit } = useSignUpForm(
    { userName: "", email: "", password1: "", password2: "" },
    alarm
  );
  const [userType, setUserType] = React.useState("regular");

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
            userType={userType}
          />
          <RoleButton
            name="Owner"
            type="owner"
            setUserType={setUserType}
            userType={userType}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="userName"
            onChange={handleInputChange}
            value={inputs.userName}
            placeholder="Enter your name*"
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
            onChange={handleInputChange}
            value={inputs.email}
            placeholder="Email*"
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
            name="password1"
            onChange={handleInputChange}
            value={inputs.password1}
            placeholder="Enter a password*"
            css={{
              marginTop: "1em",
              "@media screen and (max-width: 480px)": {
                fontSize: ".8rem"
              }
            }}
          />
          <Input
            type="password"
            name="password2"
            onChange={handleInputChange}
            value={inputs.password2}
            placeholder="Re-enter your password*"
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
        </form>
        <br />
        <Link
          to="/login"
          style={{
            color: "Black",
            fontSize: "10px",
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
};

export default SignUp;
