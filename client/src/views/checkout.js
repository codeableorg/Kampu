/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { navigate } from "@reach/router";
import { useCart } from "../selectors/selectors";
import { Card, Button } from "../components/ui";
import Spinner from "../components/spinner";
import { getSportField } from "../services/sport-field";

function Checkout() {
  const [loading, setLoading] = React.useState(true);
  const [sportField, setSportField] = React.useState(null);
  const cart = useCart();

  React.useEffect(() => {
    if (Object.keys(cart).length) {
      navigate("/");
    }
  }, []);

  React.useEffect(() => {
    getSportField(cart.SportField).then(data => {
      console.log(data);
      setSportField(data);
      setLoading(false);
    });
  }, []);

  function format(hour) {
    return ("0" + hour.toString() + ":00").slice(-5);
  }

  function getPrice(hour) {
    return "$" + (hour > 18 ? sportField.price_day : sportField.price_night);
  }

  const row = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1em"
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Card
      css={{
        maxWidth: "500px",
        margin: "auto"
      }}
    >
      <h2 css={{ textAlign: "center" }}>Checkout</h2>
      <div css={row}>
        <div>Sport Field {cart.SportField}</div>
        <div>
          {format(cart.selected[0].hour)} -{" "}
          {format(cart.selected[0].hour + cart.selected.length)}
        </div>
        <div>{getPrice(cart.selected[0].hour)}</div>
      </div>
      <div css={row}>
        <div>Total</div>
        <div>{getPrice(cart.selected[0].hour)}</div>
      </div>
      <div css={{ textAlign: "center" }}>
        <Button css={{ marginTop: "1em", maxWidth: "150px" }}>Pay</Button>
      </div>
    </Card>
  );
}

export default Checkout;
