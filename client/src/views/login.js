/** @jsx jsx */
import React, { useState } from "react";
import { jsx } from "@emotion/core";
import { Link } from "@reach/router";

import { Input, Card, Button } from "../components/ui";

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

const Login = () => {
  const alarm = () => {
    alert(`
    User Login successful! 
    Name: ${inputs.firstName} ${inputs.lastName} 
    Email: ${inputs.email}
    `);
  };
  const { inputs, handleInputChange, handleSubmit } = useSignUpForm(
    { firstName: "", lastName: "", email: "", userPassword: "" },
    alarm
  );
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
            onChange={handleInputChange}
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
            name="userPassword"
            onChange={handleInputChange}
            value={inputs.userPassword}
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
};

export default Login;
