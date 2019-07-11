import fetch from "isomorphic-fetch";
import { apiUrl } from "../utils";

async function postClub(club) {
  const response = await fetch(`${apiUrl}/clubs`, {
    method: "POST",
    credentials: "include",
    body: club,
    contentType: "application/json"
  });

  if (!response.ok) {
    const errors = await response.json();
    console.log(errors);
    throw new Error(errors);
  }

  return response.json();
}

export { postClub };
