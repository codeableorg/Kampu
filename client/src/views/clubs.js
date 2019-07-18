/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { navigate } from "@reach/router";
import { Input, Label, Card, Button } from "../components/ui";

function InformationClub() {
  return (
    <div>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          "@media screen and (min-width: 768px)": {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }
        }}
      >
        <div>
          <Label>Address</Label>
          <Label css={{ fontSize: "14px" }}>Av. Pardo 123 - Miraflores</Label>
        </div>
        <br />
        <div>
          <Label>Schedule</Label>

          <div css={{ display: "flex", justifyContent: "space-between" }}>
            <Label htmlFor="monday-friday.init" css={{ fontSize: "12px" }}>
              Monday - Friday
            </Label>
            <Label css={{ fontSize: "12px" }}>08:00-22:00</Label>
          </div>

          <div css={{ display: "flex", justifyContent: "space-between" }}>
            <Label
              htmlFor="schedule-saturdays-start"
              css={{ fontSize: "12px" }}
            >
              Saturday
            </Label>
            <Label css={{ fontSize: "12px" }}>08:00-22:00</Label>
          </div>

          <div css={{ display: "flex", justifyContent: "space-between" }}>
            <Label htmlFor="schedule-sundays-start" css={{ fontSize: "12px" }}>
              Sunday
            </Label>
            <Label css={{ fontSize: "12px" }}>08:00-22:00</Label>
          </div>
        </div>
      </div>

      <div css={{ display: "flex", fontSize: "12px" }}>
        <div>
          <Card>
            <div css={{ textAlign: "center" }}>Sport Field #1</div>
            <div css={{ display: "flex", justifyContent: "space-between" }}>
              <div>O</div>
              <div>
                <div>Syntetic Grass</div>
                <div>6 vs. 6</div>
              </div>
            </div>
            <div>Price</div>
            <div css={{ display: "flex", justifyContent: "space-between" }}>
              <div css={{ display: "flex" }}>
                <div>0</div>
                <div>s</div>
              </div>
              <div css={{ display: "flex" }}>
                <div>0</div>
                <div>9</div>
              </div>
            </div>
          </Card>
          <Card>hola</Card>
        </div>
        <div>
          <Card>hola</Card>
          <Card>hola</Card>
        </div>
      </div>
    </div>
  );
}

export default InformationClub;
