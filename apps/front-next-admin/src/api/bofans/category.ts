import { Category } from "@mono/prisma-client";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://yuanbo.online/rpg/bofans"
    : "http://localhost:3001/api";

function _fetch(url: string, options?: RequestInit) {
  return fetch(`${API_BASE_URL}${url}`, options);
}

export async function getCategories(): Promise<Category[]> {
  return await _fetch("/category/list?all=true").then((res) => res.json());
}

export async function createCategory(data: {
  system: string;
  name: string;
  secondCategory: string;
}): Promise<boolean> {
  return await _fetch("/category/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}
