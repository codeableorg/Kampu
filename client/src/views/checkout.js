/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { navigate } from "@reach/router";
import { useCart, useUser } from "../selectors/selectors";
import { Card, Button } from "../components/ui";
import Spinner from "../components/spinner";
import { getSportField } from "../services/sport-field";
import { postBooking } from "../services/booking";
import { useSetNotify } from "../actions/action-hooks";

function Checkout() {
  const [loading, setLoading] = React.useState(true);
  const [sportField, setSportField] = React.useState(null);
  const cart = useCart();
  const user = useUser();
  const setNotify = useSetNotify();

  React.useEffect(() => {
    if (!Object.keys(cart).length) {
      navigate("/");
    }
  }, []);

  React.useEffect(() => {
    getSportField(cart.SportField).then(data => {
      setSportField(data);
      setLoading(false);
    });
  }, []);

  function format(hour) {
    return ("0" + hour.toString() + ":00").slice(-5);
  }

  function getPrice(hour) {
    return hour > 18 ? sportField.price_day : sportField.price_night;
  }

  const row = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1em"
  };

  if (loading) {
    return <Spinner />;
  }

  async function handleBooking() {
    const date = cart.selected[0].date;
    const start_hour = cart.selected[0].hour;
    const end_hour = cart.selected[cart.selected.length - 1].hour + 1;
    const amount = cart.selected.reduce(
      (acc, element) => acc + getPrice(element.hour),
      0
    );
    let sport_field_id = parseInt(cart.SportField);

    const booking = {
      date,
      start_hour,
      end_hour,
      amount,
      sport_field_id
    };
    console.log(booking);
    try {
      await postBooking(booking);
      setNotify("Booking created");
      user.role === "owner" ? navigate("/owner") : navigate("/");
    } catch (error) {
      console.error(error);
    }
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
        <div>Sport Field: {sportField.name}</div>
        <div>
          {format(cart.selected[0].hour)} -{" "}
          {format(cart.selected[0].hour + cart.selected.length)}
        </div>
        <div>${getPrice(cart.selected[0].hour)}</div>
      </div>
      <div css={row}>
        <div>Total</div>
        <div>
          $
          {cart.selected.reduce(
            (acc, element) => acc + getPrice(element.hour),
            0
          )}
        </div>
      </div>
      {user.role === "owner" && (
        <div css={{ textAlign: "center" }}>
          <Button
            css={{ marginTop: "1em", maxWidth: "150px" }}
            onClick={handleBooking}
          >
            Confirm
          </Button>
        </div>
      )}
    </Card>
  );
}

export default Checkout;
