import { apiUrl } from "../utils";

async function getSportFields() {
  const response = await fetch(`${apiUrl}/sport_fields`, {
    credentials: "include"
  });

  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

export { getSportFields };
