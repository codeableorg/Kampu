import React from "react";

const signUp = () => {
  return (
    <fom>
      <div>
        <label>First Name</label>
        <input type="text" name="firstName" required />
        <label>Last Name</label>
        <input type="text" name="lastName" required />
      </div>
      <div>
        <label>Email Address</label>
        <input type="email" name="email" required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password1" />
      </div>
      <div>
        <label>Re-enter Password</label>
        <input type="password" name="password2" />
      </div>
      <button type="submit">Sign Up</button>
    </fom>
  );
};

export default signUp;
