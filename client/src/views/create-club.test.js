import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CreateClubfrom from "./create-club";

test("CreateClub View", () => {
  const { asFragment, getByLabelText } = render(<CreateClubfrom />);

  expect(asFragment()).toMatchSnapshot();

  const inputName = getByLabelText("enter name");
  fireEvent.change(inputName, {
    target: { value: "Club green" }
  });

  const inputAddress = getByLabelText("enter address");
  fireEvent.change(inputAddress, {
    target: { value: "Jr narnia 404" }
  });

  const file = new File(["(⌐□_□)"], "shinji-ikari.png", { type: "image/png" });
  const imageInput = getByLabelText("choose image");
  fireEvent.change(imageInput, { target: { files: [file] } });

  fireEvent.submit(inputName);
});
