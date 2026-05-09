const API_URL = "http://localhost:5265/api/auth";

export async function register(data) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(text);
  }

  return text;
}

export async function login(data) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(text);
  }

  return text;
}