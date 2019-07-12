import { apiUrl } from "../utils";

async function postSportField(sportField) {
  const response = await fetch(`${apiUrl}/sport_fields`, {
    method: "POST",
    credentials: "include",
    body: sportField,
    contentType: "application/json"
  });

  if (!response.ok) {
    const errors = await response.json();
    throw new Error(errors);
  }

  return response.json();
}

export { postSportField };
