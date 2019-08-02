import { apiUrl } from "../utils";

async function postCharge(data) {
  const response = await fetch(`${apiUrl}/charge`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    const errors = await response.json();
    console.log(errors);
    throw new Error(errors);
  }
  return response.json();
}

export { postCharge };
