/** @jsx jsx */
import React, { useState } from "react";
import { jsx } from "@emotion/core";
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

const SignUp = () => {
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
          width: "50%",
          "@media screen and (max-width: 720px)": {
            width: "100%"
          }
        }}
      >
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            onChange={handleInputChange}
            value={inputs.email}
            placeholder="Email*"
            required
            css={{ marginTop: "1em" }}
          />
          <Input
            type="password"
            name="userPassword"
            onChange={handleInputChange}
            value={inputs.userPassword}
            placeholder="Enter your password*"
            css={{ marginTop: "1em" }}
          />
          <Button type="submit" css={{ marginTop: "2em" }}>
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
