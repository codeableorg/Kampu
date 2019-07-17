import React from "react";
import { render, wait } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store";
import Home from "./home";

const clubsResponse = [
  {
    id: 1,
    address: "Jr cayumba 440",
    favorited: false,
    favorited_count: 2,
    image: "some_picture.jpg",
    name: "Club #1"
  }
];

test("Home View", async () => {
  fetch.mockResponseOnce(JSON.stringify(clubsResponse));

  const { asFragment, getAllByRole } = render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();

  let clubs;

  await wait(() => {
    clubs = getAllByRole("listitem");
  });

  expect(clubs.length).toEqual(1);

  expect(asFragment()).toMatchSnapshot();
});
