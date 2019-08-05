import { apiUrl } from "../utils";

async function postBooking(booking) {
  const response = await fetch(`${apiUrl}/booking`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(booking),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    const errors = await response.json();
    throw new Error(errors);
  }

  return response.json();
}

export { postBooking };
