/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Input, Label, Card, Button } from "../components/ui";
import { postSportField } from "../services/sport-field";

function CreateSportField() {
  const [fields, setFields] = React.useState({
    name: "",
    description: "",
    image: null,
    price_day: "",
    price_night: ""
  });
  const [error, setError] = React.useState(null);

  function handleChange(e) {
    if (e.target.name === "image") {
      setFields({ ...fields, image: e.target.files[0] });
    } else {
      setFields({ ...fields, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(fields);
    const formData = new FormData();
    Object.keys(fields).forEach(key => {
      formData.append(key, fields[key]);
    });
    try {
      const club = await postSportField(formData);
      console.log(club);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Card
      css={{
        maxWidth: "500px",
        margin: "auto"
      }}
    >
      {/* <h1 css={{ letterSpacing: "-.066875rem", lineHeight: "1.5" }}>
        New Club
      </h1> */}
      <form onSubmit={handleSubmit}>
        <div css={{ marginTop: "2em" }}>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Sports field's name"
            value={fields.name}
            onChange={handleChange}
          />
        </div>
        <div css={{ marginTop: "2em" }}>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            placeholder="Sports field's description"
            name="description"
            type="text"
            value={fields.description}
            onChange={handleChange}
          />
        </div>
        <div css={{ marginTop: "2em" }}>
          <Label htmlFor="image">Image(s)</Label>
          <Input id="image" name="image" type="file" onChange={handleChange} />
        </div>
        <div css={{ marginTop: "2em" }}>
          <Label htmlFor="schedule">Prices</Label>
          <div
            css={{ marginTop: "0.75em", display: "flex", alignItems: "center" }}
          >
            <label
              htmlFor="price_day"
              css={{
                minWidth: "100px",
                marginRight: "1em"
              }}
            >
              Day:{" "}
            </label>
            <Input
              id="price_day"
              name="price_day"
              type="number"
              css={{ maxWidth: "80px" }}
              value={fields.price_day}
              onChange={handleChange}
            />
          </div>
          <div
            css={{ marginTop: "0.75em", display: "flex", alignItems: "center" }}
          >
            <label
              htmlFor="price_night"
              css={{
                minWidth: "100px",
                marginRight: "1em"
              }}
            >
              Night:
            </label>
            <Input
              id="price_night"
              name="price_night"
              type="number"
              css={{ maxWidth: "80px" }}
              value={fields.price_night}
              onChange={handleChange}
            />
          </div>
        </div>
        <div css={{ marginTop: "2em" }}>
          <Button>Create</Button>
        </div>
        {error && (
          <div css={{ color: "red", marginTop: "1rem" }}>Error: {error}</div>
        )}
      </form>
    </Card>
  );
}

export default CreateSportField;
