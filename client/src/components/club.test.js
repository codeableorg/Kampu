import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store";
import Club from "./club";

const club = {
  id: 1,
  address: "Jr cayumba 440",
  favorited: false,
  favorited_count: 2,
  image: "some_picture.jpg",
  name: "Club #1"
};

test("Club component", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <Club club={club} />
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();
});
