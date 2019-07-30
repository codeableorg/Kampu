import { apiUrl } from "../utils";

async function login({ email, password }) {
  const response = await fetch(`${apiUrl}/login`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    const { errors } = await response.json();
    throw new Error(errors);
  }

  return response.json();
}

async function register({ name, role, email, password }) {
  const response = await fetch(`${apiUrl}/register`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ name, role, email, password }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    const { errors } = await response.json();
    throw new Error(errors);
  }

  return response.json();
}

async function logout() {
  const response = await fetch(`${apiUrl}/logout`, {
    method: "DELETE",
    credentials: "include"
  });
  if (!response.ok) {
    const { errors } = await response.json();
    throw new Error(errors);
  }
}

async function getUser() {
  const response = await fetch(`${apiUrl}/me`, {
    credentials: "include"
  });

  if (!response.ok) {
    const { errors } = await response.json();
    throw new Error(errors);
  }

  const { name, email, role } = await response.json();
  return { name, email, role };
}

export { login, logout, register, getUser };
