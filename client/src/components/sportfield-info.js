/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { Text, Card } from "../components/ui";
import { Sun, Moon, Ball } from "./icons";

function SportfieldInfo({ sportField }) {
  return (
    <Card
      css={{
        flex: "1",
        margin: "1em",
        "@media screen and (max-width: 760px)": {
          margin: "1em 0"
        }
      }}
    >
      <Text css={{ textAlign: "center" }}> {sportField.name}</Text>

      <Text css={{ display: "flex", justifyContent: "center" }}>
        <Text>
          <Ball css={{ width: "20px", height: "20px" }} />
        </Text>
        <Text>{sportField.description}</Text>
      </Text>

      <Text>Price</Text>

      <Text css={{ display: "flex", justifyContent: "space-between" }}>
        <Text css={{ display: "flex" }}>
          <Text>
            <Sun />
          </Text>
          <Text>${sportField.price_day}</Text>
        </Text>
        <Text css={{ display: "flex" }}>
          <Text>
            <Moon />
          </Text>
          <Text>${sportField.price_night}</Text>
        </Text>
      </Text>
    </Card>
  );
}

export default SportfieldInfo;
