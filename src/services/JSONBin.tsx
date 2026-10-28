import type {AnimalReport} from "@models/Models";

const BIN_ID = import.meta.env.VITE_JSONBIN_BIN_ID;
const API_KEY = import.meta.env.VITE_JSONBIN_API_KEY;
const BASE_URL = "https://api.jsonbin.io/v3/b";

export async function getReports(): Promise<AnimalReport[]> {
  if (!BIN_ID)
    throw new Error("BIN_ID is required");
  if (!API_KEY)
    throw new Error("API_KEY is required");

  const res = await fetch(`${BASE_URL}/${BIN_ID}`, {
    method: "GET",
    headers: {
      "X-Master-Key": API_KEY,
    },
  });
  if (!res.ok)
    throw new Error(`HTTP ERROR: ${res.status}`);

  const data = await res.json();
  return data.record.reports;
}

export async function saveReports(reports: AnimalReport[]) {
  if (!BIN_ID)
    throw new Error("BIN_ID is required");
  if (!API_KEY)
    throw new Error("API_KEY is required");

  const res = await fetch(`${BASE_URL}/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY,
    },
    body: JSON.stringify({reports: reports}),
  });

  if (!res.ok)
    throw new Error(`HTTP ERROR: ${res.status}`);
}