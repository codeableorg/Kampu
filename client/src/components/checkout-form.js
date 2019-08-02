/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { postCharge } from "../services/charge";
import { useSetNotify } from "../actions/action-hooks";
import { Button } from "../components/ui";
import { navigate } from "@reach/router";

function CheckoutForm({ stripe, data }) {
  const setNotify = useSetNotify();

  async function handleSubmit() {
    const { token } = await stripe.createToken({ name: "Name" });
    const response = await postCharge({ ...data, token: token.id });
    if (response) {
      setNotify("Payment successfull");
      navigate("/");
    }
  }

  return (
    <div className="checkout">
      <p>Would you like to complete the purchase?</p>
      <CardElement />
      <div css={{ textAlign: "center" }}>
        <Button
          css={{ marginTop: "2em", maxWidth: "150px" }}
          onClick={handleSubmit}
        >
          Pay
        </Button>
      </div>
    </div>
  );
}

export default injectStripe(CheckoutForm);
