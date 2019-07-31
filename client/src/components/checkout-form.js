import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { postCharge } from "../services/charge";

function CheckoutForm() {
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit() {
    setLoading(true);
    const { token } = await this.props.stripe.createToken({ name: "Name" });
    const response = await postCharge(token.id);
    if (response.ok) {
      setLoading(false);
    }
  }

  return (
    <div className="checkout">
      <p>Would you like to complete the purchase?</p>
      <CardElement />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
}

export default injectStripe(CheckoutForm);
