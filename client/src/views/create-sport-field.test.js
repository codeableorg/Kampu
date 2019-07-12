import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CreateSportField from "./create-sport-field";

test("CreateSportField View", () => {
  const { asFragment, getByLabelText } = render(<CreateSportField />);

  expect(asFragment()).toMatchSnapshot();

  const inputName = getByLabelText("enter name");
  fireEvent.change(inputName, {
    target: { value: "Sport field green" }
  });

  const inputDescription = getByLabelText("enter description");
  fireEvent.change(inputDescription, {
    target: { value: "Sport field awesome" }
  });

  const file = new File(["(⌐□_□)"], "shinji-ikari.png", { type: "image/png" });
  const imageInput = getByLabelText("choose image");
  fireEvent.change(imageInput, { target: { files: [file] } });

  const inputPriceDay = getByLabelText("enter price-day");
  fireEvent.change(inputPriceDay, {
    target: { value: 70 }
  });

  const inputPriceNight = getByLabelText("enter price-night");
  fireEvent.change(inputPriceNight, {
    target: { value: 120 }
  });

  // fireEvent.submit(inputName);
});
