import { apiUrl } from "../utils";

async function postCharge(token) {
  const response = await fetch(`${apiUrl}/charge`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ token }),
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
