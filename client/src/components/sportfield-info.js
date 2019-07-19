/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { Label, Card } from "../components/ui";

function SportfieldInfo({ sportField }) {
  return (
    <Card>
      <Label css={{ textAlign: "center" }}> {sportField.name}</Label>

      <Label css={{ display: "flex", justifyContent: "space-between" }}>
        <Label>O</Label>
        <Label>{sportField.description}</Label>
      </Label>

      <Label>Price</Label>

      <Label css={{ display: "flex", justifyContent: "space-between" }}>
        <Label css={{ display: "flex" }}>
          <Label>0</Label>
          <Label>{sportField.price_day}</Label>
        </Label>
        <Label css={{ display: "flex" }}>
          <Label>0</Label>
          <Label>{sportField.price_night}</Label>
        </Label>
      </Label>
    </Card>
  );
}

export default SportfieldInfo;
