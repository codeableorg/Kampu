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

async function getClubs() {
  const response = await fetch(`${apiUrl}/clubs`, {
    credentials: "include"
  });

  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

async function getFavoriteClubs() {
  const response = await fetch(`${apiUrl}/clubs?favorites=true`, {
    credentials: "include"
  });

  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

async function favorite(clubId) {
  const response = await fetch(`${apiUrl}/clubs/${clubId}/favorites`, {
    credentials: "include",
    method: "POST",
    contentType: "application/json"
  });

  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

async function unfavorite(clubId) {
  const response = await fetch(`${apiUrl}/clubs/${clubId}/favorites`, {
    credentials: "include",
    method: "DELETE",
    contentType: "application/json"
  });

  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

async function getClub(id) {
  const response = await fetch(`${apiUrl}/clubs/${id}`, {
    credentials: "include"
  });

  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

async function clubReport(id, filterDate) {
  const response = await fetch(
    `${apiUrl}/report/${id}?filterDate=${filterDate}`,
    {
      credentials: "include"
    }
  );

  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

export {
  getClubs,
  postClub,
  favorite,
  unfavorite,
  getFavoriteClubs,
  getClub,
  clubReport
};
