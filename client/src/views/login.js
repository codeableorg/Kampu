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
        margin: "100px 200px 0px 200px",
        minWidth: "400px"
      }}
    >
      <Card>
        <form onSubmit={handleSubmit}>
          <div>
            <Input
              type="text"
              name="firstName"
              onChange={handleInputChange}
              value={inputs.firstName}
              placeholder="First Name"
              required
            />
            <Input
              type="text"
              name="lastName"
              onChange={handleInputChange}
              value={inputs.lastName}
              placeholder="Last Name"
              required
              css={{ marginTop: "1em" }}
            />
          </div>
          <div css={{ marginTop: "1em" }}>
            <Input
              type="email"
              name="email"
              onChange={handleInputChange}
              value={inputs.email}
              placeholder="Email"
              required
            />
          </div>
          <div css={{ marginTop: "1em" }}>
            <Input
              type="password"
              name="userPassword"
              onChange={handleInputChange}
              value={inputs.userPassword}
              placeholder="Enter your password"
            />
          </div>

          <Button type="submit" css={{ marginTop: "2em" }}>
            Sign Up
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
