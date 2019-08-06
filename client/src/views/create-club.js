/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { navigate } from "@reach/router";
import { Input, Label, Card, Button, MaterialInput } from "../components/ui";
import { postClub } from "../services/club";
import { getCoords } from "../services/geocode";
import { useSetNotify } from "../actions/action-hooks";

function CreateClub() {
  const [fields, setFields] = React.useState({
    name: "",
    address: "",
    district: "",
    image: []
  });
  const [schedule, setSchedule] = React.useState({
    "monday-friday": {
      init: 0,
      end: 0
    },
    saturday: {
      init: 0,
      end: 0
    },
    sunday: {
      init: 0,
      end: 0
    }
  });
  const [error, setError] = React.useState(null);
  const setNotify = useSetNotify();

  function handleChange(e) {
    if (e.target.name === "image") {
      setFields({ ...fields, image: [...fields.image, ...e.target.files] });
    } else {
      setFields({ ...fields, [e.target.name]: e.target.value });
    }
  }

  function handleChangeSchedule(e) {
    const [day, time] = e.target.name.split(".");
    setSchedule({
      ...schedule,
      [day]: { ...schedule[day], [time]: e.target.value }
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(fields).forEach(key => {
      if (key === "image") {
        fields[key].forEach(file => {
          formData.append("image[]", file);
        });
      } else {
        formData.append(key, fields[key]);
      }
    });
    const { results } = await getCoords(
      `${fields.address}, ${fields.district}`
    );
    formData.append(
      "latitude",
      results.length ? results[0].geometry.lat : null
    );
    formData.append(
      "longitude",
      results.length ? results[0].geometry.lng : null
    );
    formData.append("schedule", JSON.stringify(schedule));
    try {
      await postClub(formData);
      setNotify("Club created");
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
        <div>
          <MaterialInput
            aria-label="enter name"
            required
            autoComplete="off"
            type="text"
            id="name"
            name="Name"
            placeholder=" "
            value={fields.name}
            onChange={handleChange}
          />
        </div>
        <div css={{ marginTop: "2em" }}>
          <MaterialInput
            aria-label="enter address"
            required
            autoComplete="off"
            type="text"
            id="address"
            name="Address"
            placeholder=" "
            value={fields.address}
            onChange={handleChange}
          />
        </div>
        <div css={{ marginTop: "2em" }}>
          <MaterialInput
            aria-label="enter district"
            required
            autoComplete="off"
            type="text"
            id="district"
            name="District"
            placeholder=" "
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
            multiple
            onChange={handleChange}
          />
        </div>
        <div css={{ marginTop: "2em" }}>
          <Label>Schedule</Label>

          <div css={{ display: "flex", justifyContent: "space-between" }}>
            <Label htmlFor="monday-friday.init" css={{ fontSize: "12px" }}>
              Monday - Friday
            </Label>
            <div>
              <input
                id="monday-friday.init"
                name="monday-friday.init"
                type="time"
                step="3600"
                onChange={handleChangeSchedule}
              />
              <input
                id="monday-friday.end"
                name="monday-friday.end"
                type="time"
                step="3600"
                onChange={handleChangeSchedule}
              />
            </div>
          </div>

          <div css={{ display: "flex", justifyContent: "space-between" }}>
            <Label
              htmlFor="schedule-saturdays-start"
              css={{ fontSize: "12px" }}
            >
              Saturday
            </Label>
            <div>
              <input
                id="saturday.init"
                name="saturday.init"
                type="time"
                step="3600"
                onChange={handleChangeSchedule}
              />
              <input
                id="saturday.end"
                name="saturday.end"
                type="time"
                step="3600"
                onChange={handleChangeSchedule}
              />
            </div>
          </div>

          <div css={{ display: "flex", justifyContent: "space-between" }}>
            <Label htmlFor="schedule-sundays-start" css={{ fontSize: "12px" }}>
              Sunday
            </Label>
            <div>
              <input
                id="sunday.init"
                name="sunday.init"
                type="time"
                step="3600"
                onChange={handleChangeSchedule}
              />
              <input
                id="sunday.end"
                name="sunday.end"
                type="time"
                step="3600"
                onChange={handleChangeSchedule}
              />
            </div>
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

export default CreateClub;
