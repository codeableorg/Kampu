/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { navigate } from "@reach/router";
import { Input, Label, Card, Button } from "../components/ui";
import { postClub } from "../services/club";
import { getCoords } from "../services/geocode";

function CreateClub() {
  const [fields, setFields] = React.useState({
    name: "",
    address: "",
    district: "",
    image: null,
    schedule: JSON.stringify({
      "monday-friday": {
        init: "8",
        end: "22"
      },
      saturday: {
        init: "8",
        end: "22"
      },
      sunday: {
        init: "8",
        end: "22"
      }
    })
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
    const formData = new FormData();
    Object.keys(fields).forEach(key => {
      formData.append(key, fields[key]);
    });
    const { results } = await getCoords(
      `${fields.address}, ${fields.district}`
    );
    formData.append("latitude", results[0].geometry.lat);
    formData.append("longitude", results[0].geometry.lng);

    try {
      await postClub(formData);
      navigate("/owner");
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
      <form onSubmit={handleSubmit}>
        <div css={{ marginTop: "2em" }}>
          <Label htmlFor="name">Name</Label>
          <Input
            aria-label="enter name"
            required="required"
            autoComplete="off"
            id="name"
            name="name"
            type="text"
            placeholder="Club's name"
            value={fields.name}
            onChange={handleChange}
          />
        </div>
        <div css={{ marginTop: "2em" }}>
          <Label htmlFor="address">Address</Label>
          <Input
            aria-label="enter address"
            required="required"
            autoComplete="off"
            id="address"
            name="address"
            type="text"
            placeholder="Club's address"
            value={fields.address}
            onChange={handleChange}
          />
        </div>
        <div css={{ marginTop: "2em" }}>
          <Label htmlFor="district">District</Label>
          <Input
            aria-label="enter district"
            required="required"
            autoComplete="off"
            id="district"
            name="district"
            type="text"
            placeholder="Club's district"
            value={fields.district}
            onChange={handleChange}
          />
        </div>
        <div css={{ marginTop: "2em" }}>
          <Label htmlFor="image">Image(s)</Label>
          <Input
            aria-label="choose image"
            required="required"
            id="image"
            name="image"
            type="file"
            onChange={handleChange}
          />
        </div>
        <div css={{ marginTop: "2em" }}>
          <Label htmlFor="schedule">Schedule</Label>
          <Input
            id="schedule"
            name="schedule"
            type="text"
            value={fields.schedule}
            onChange={handleChange}
          />
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

export default CreateClub;
