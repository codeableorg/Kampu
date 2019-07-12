import { apiUrl } from "../utils";

async function getClubs() {
  const response = await fetch(`${apiUrl}/clubs`, {
    credentials: "include"
  });

  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

export { getClubs };
