/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { postCharge } from "../services/charge";
import { Button } from "../components/ui";

function CheckoutForm({ stripe }) {
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit() {
    setLoading(true);
    const { token } = await stripe.createToken({ name: "Name" });
    const response = await postCharge(token.id);
    if (response.ok) {
      setLoading(false);
    }
  }

  return (
    <div className="checkout">
      <p>Would you like to complete the purchase?</p>
      <CardElement />
      <div onClick={handleSubmit} css={{ textAlign: "center" }}>
        <Button css={{ marginTop: "2em", maxWidth: "150px" }}>Pay</Button>
      </div>
    </div>
  );
}

export default injectStripe(CheckoutForm);
